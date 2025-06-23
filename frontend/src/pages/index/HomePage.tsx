'use client'

import React, {useCallback, useEffect, useRef} from 'react';
import {useUnit} from "effector-react";
import {$cats, getRandomCatsEvent, getRandomCatsPending} from "@/features/index/model";
import styles from "@/app/page.module.css";
import Card from "@/components/Card/Card";
import Loader from "@/components/Loader/Loader";

const HomePage = () => {

    const getCats = useUnit(getRandomCatsEvent);
    const catsLoading = useUnit(getRandomCatsPending);
    const cats = useUnit($cats);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const loaderRef = useRef<HTMLDivElement | null>(null);


    const observeLoader = useCallback(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !catsLoading) {
                getCats();
            }
        });

        if (loaderRef.current) {
            observerRef.current.observe(loaderRef.current);
        }
    }, [getCats, catsLoading]);

    useEffect(() => {
        observeLoader();
        return () => observerRef.current?.disconnect();
    }, [observeLoader]);

    return (
        <div className={styles.content}>
            {cats.map((item, num) => (
                <Card key={num} url={item.url} catId={item.id} favourite={item.favourite}/>
            ))}
            <div ref={loaderRef} style={{height: 1}}/>
            {catsLoading && (
                <div className={styles.loaderWrapper}>
                    <Loader/>
                </div>
            )}
        </div>
    );
};

export default HomePage;