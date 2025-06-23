import React, {memo} from 'react';
import Image from "next/image";
import hoveredBlock from "../../../public/HoveredBlock.svg";


export const HoveredCardIcon = memo(function HoveredCardIcon() {
    return (
        <Image src={hoveredBlock} alt={'Кнопка лайка'}/>
    );
});
