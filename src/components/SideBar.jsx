import React from 'react';
import s from "../styles/SideBar.module.scss"
import Logo from "./Logo"
import AppNav from "./AppNav"
import { Outlet } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className={s.sidebar}>
            <Logo/>
            <AppNav/>

            <Outlet/>
            
            
            <footer className={s.footer}>
                <p className={s.copyright}>
                    &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
                </p>
            </footer>
        </div>
    );
};

export default SideBar;