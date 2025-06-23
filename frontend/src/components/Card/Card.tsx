'use client'

import React, {useState} from 'react';
import styles from './styles.module.css'
import Image from "next/image";
import LikeButton from "@/components/LikeButton/LikeButton";

interface CardProps {
    url: string;
    catId: string;
    favourite: boolean;
}

const Card = ({url, catId, favourite}: CardProps) => {

    const [isCardHovered, setIsCardHovered] = useState(false);

    return (
        <div
            className={styles.card}
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
        >
            {/*из-за особенностей событий и особеннсотей css приходиться делать так*/}
            <Image
                className={styles.image}
                src={url}
                alt="котик"
                width={225}
                height={225}
                style={isCardHovered
                    ? {
                        transform: 'scale(1.07)',
                        boxShadow: '0 9px 18px rgba(0, 0, 0, 0.5)'
                    }
                    : {}
                }
            />
            <LikeButton isHoveredCard={isCardHovered} catId={catId} favourite={favourite}/>
        </div>
    );
};

export default Card;