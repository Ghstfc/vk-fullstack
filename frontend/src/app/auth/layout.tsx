import React from 'react';
import styles from "@/app/auth/styles.module.css";


const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className={styles.loginPage}>
            {children}
        </div>
    );
};

export default Layout;