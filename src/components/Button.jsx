import React from 'react';
import s from "../styles/Button.module.scss"
const Button = ({children,type,onClick}) => {
    return (
        <button onClick={onClick} className={`${s.btn} ${s[type]}`}>
     {children}
        </button>
    );
};

export default Button;