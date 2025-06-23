'use client'

import React, {useEffect} from 'react';
import TextInput from "@/components/TextInput/TextInput";
import styles from '../styles.module.css'
import Button from "@/components/Button/Button";
import Link from "next/link";
import {UserDto} from "@/shared/types/types";
import {useUnit} from "effector-react/effector-react.umd";
import {$loginPending, loginEvent} from "@/features/login/model";
import {$user} from "@/features/shared/model";
import {useRouter} from "next/navigation";

const Page = () => {

    const login = useUnit(loginEvent)
    const loginPending = useUnit($loginPending)
    const user = useUnit($user);

    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [router, user]);

    const handler = (event: React.FormEvent) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement);

        const formValues: UserDto = {
            login: formData.get('login') as string,
            password: formData.get('password') as string,
        };
        login(formValues)
    }

    return (
        <>
            <form className={styles.userForm} onSubmit={handler}>
                <TextInput name={'login'} fieldName={'Логин'}/>
                <TextInput name={'password'} fieldName={'Пароль'} password/>
                <Button type="submit" disabled={loginPending}>Войти</Button>
            </form>
            <div>
                <Link href="/auth/register">Sign up</Link>
            </div>
        </>
    );
};

export default Page;