'use client'

import React, {useCallback, useState} from 'react';
import styles from './styles.module.css'
import {useUnit} from "effector-react";
import {createUserLikeEvent, removeUserLikeEvent} from "@/features/likes/model";
import {ClickedLikeIcon, HoveredCardIcon, HoveredLikeIcon} from "@/components/Icons";

interface LikeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isHoveredCard: boolean;
    catId: string;
    favourite: boolean;
}

const LikeButton = ({isHoveredCard, catId, favourite, ...props}: LikeButtonProps) => {

    const createLike = useUnit(createUserLikeEvent)
    const removeLike = useUnit(removeUserLikeEvent)
    const [isLikeHovered, setIsLikeHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(favourite);


    const likeHandler = useCallback(() => {
        if (isLiked) {
            removeLike(catId)
        } else {
            createLike(catId)
        }
        setIsLiked(!isLiked)
    }, [catId, createLike, isLiked, removeLike])


    if (!isHoveredCard)
        return null;


    return (
        <button
            className={styles.likeButton}
            onMouseEnter={() => setIsLikeHovered(true)}
            onMouseLeave={() => setIsLikeHovered(false)}
            onClick={likeHandler}
            {...props}
        >
            {isLiked
                ? <ClickedLikeIcon/>
                : isLikeHovered
                    ? <HoveredLikeIcon/>
                    : <HoveredCardIcon/>
            }
        </button>
    );
};

export default LikeButton;