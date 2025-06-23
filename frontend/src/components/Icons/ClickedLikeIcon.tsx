import React, {memo} from 'react';
import clickedLike from "../../../public/ClickedLike.svg";
import Image from "next/image";


export const ClickedLikeIcon = memo(function ClickedLikeIcon() {
    return (
        <Image src={clickedLike} alt={'Кнопка лайка'}/>
    );
});
