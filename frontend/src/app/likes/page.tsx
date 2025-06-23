'use client'

import React, {useEffect} from 'react';
import {useUnit} from "effector-react";
import styles from "@/app/page.module.css";
import Card from "@/components/Card/Card";
import {$favouriteCats, getLikedCatsEvent, getLikedCatsPending} from "@/features/likes/model";
import Loader from "@/components/Loader/Loader";

const Page = () => {

    const getCats = useUnit(getLikedCatsEvent)
    const cats = useUnit($favouriteCats)
    const getCatsPending = useUnit(getLikedCatsPending)

    useEffect(() => {
        getCats();
    }, [getCats])

    return (
        <div className={styles.content}>
            {getCatsPending
                ? <div className={styles.loaderWrapper}><Loader/></div>
                : cats.map((item) => (
                    <Card key={item.id} url={item.url} catId={item.id} favourite={item.favourite}/>
                ))
            }

        </div>
    );
};

export default Page;