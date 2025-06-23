'use client'

import React, {useEffect} from 'react';
import styles from "../styles.module.css";
import TextInput from "@/components/TextInput/TextInput";
import Button from "@/components/Button/Button";
import Link from "next/link";
import {useUnit} from "effector-react";
import {$registerError, $registerPending, registerEvent} from "@/features/register/model";
import {UserDto} from "@/shared/types/types";
import {useRouter} from "next/navigation";

const Page = () => {

    const register = useUnit(registerEvent)
    const registerPending = useUnit($registerPending)
    const registerError = useUnit($registerError)
    const router = useRouter();


    useEffect(() => {
        if (!registerError) {
            router.push('/auth/login');
        }
    }, [registerError, router])

    const handler = (event: React.FormEvent) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement);

        const formValues: UserDto = {
            login: formData.get('login') as string,
            password: formData.get('password') as string,
        };
        register(formValues)
    }


    return (
        <>
            <form className={styles.userForm} onSubmit={handler}>
                <TextInput name={'login'} fieldName={'Логин'}/>
                <TextInput name={'password'} fieldName={'Пароль'} password/>
                <Button type="submit" disabled={registerPending}>Зарегистрироваться</Button>
            </form>
            <div>
                <Link href="/auth/login">Log in</Link>
            </div>
        </>
    );
};

export default Page;