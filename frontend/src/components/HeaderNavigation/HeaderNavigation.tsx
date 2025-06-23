import React from 'react';
import Link from "next/link";
import styles from './styles.module.css'


interface HeaderNavigationProps {
    children: React.ReactNode;
}


const HeaderNavigation = ({children}: HeaderNavigationProps) => {

    return (
        <>
            <header className={styles.navigation}>
                <div className={styles.navigationLeft}>
                    <Link href="/" className={styles.navigationItem}>Все котики</Link>
                    <Link href="/likes" className={styles.navigationItem}>Любимые котики</Link>
                </div>
            </header>
            {children}
        </>
    );
};

export default HeaderNavigation;