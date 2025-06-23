import React from 'react';
import styles from './styles.module.css'

interface TextInputProps {
    name: string;
    placeholder?: string;
    password?: boolean;
    fieldName?: string;
}

const TextInput = ({fieldName, name, placeholder, password}: TextInputProps) => {

    return (
        <div className={styles.textInput}>
            <span className={styles.inputName}>{fieldName}</span>
            <input
                name={name}
                className={styles.input}
                placeholder={placeholder}
                type={password ? 'password' : 'text'}
            />
        </div>
    );
};

export default TextInput;