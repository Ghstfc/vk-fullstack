'use client'

import {useEffect} from 'react';
import {refreshUserEvent} from "@/features/shared/model";
import {useUnit} from "effector-react";
import {usePathname} from "next/navigation";
import {publicRoutes} from "@/shared/utils/constants";

const LoadUser = () => {

    const pathname = usePathname();
    const loadUser = useUnit(refreshUserEvent);

    useEffect(() => {
        if (!publicRoutes.includes(pathname || '/')) {
            loadUser();
        }
    }, [loadUser, pathname]);

    return null;
};

export default LoadUser;