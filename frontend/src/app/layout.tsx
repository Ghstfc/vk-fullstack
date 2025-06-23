import type {Metadata} from "next";
import "./globals.css";
import HeaderNavigation from "@/components/HeaderNavigation/HeaderNavigation";
import styles from "@/app/page.module.css";
import {EffectorNext} from "@effector/next";
import LoadUser from "@/components/LoadUser/LoadUser";
import {ToastContainer} from "react-toastify";


export const metadata: Metadata = {
    title: "CatPinterest",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <html lang="en">
        <body>
        <EffectorNext>
            <LoadUser/>
            <HeaderNavigation>
                <main className={styles.main}>
                    {children}
                </main>
            </HeaderNavigation>
            <ToastContainer/>
        </EffectorNext>
        </body>
        </html>
    );
}
