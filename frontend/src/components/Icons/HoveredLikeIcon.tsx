import React, {memo} from 'react';
import Image from "next/image";
import hoveredLike from "../../../public/HoveredLike.svg";


export const HoveredLikeIcon = memo(function HoveredLikeIcon() {
    return (
        <Image src={hoveredLike} alt={'Кнопка лайка'}/>
    );
});
