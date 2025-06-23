import React from 'react';
import styles from './styles.module.css'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({children, ...props}: ButtonProps) => {
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    );
};

export default Button;