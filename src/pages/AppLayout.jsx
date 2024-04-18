import React from 'react';
import SideBar from '../components/SideBar';
import s from '../styles/AppLayout.module.scss'
import Map from '../components/Map';
import User from '../components/User';

const AppLayout = () => {
    return (
        <div className={s.app}>
            
            <SideBar/>
            <Map/>
            <User/>
        </div>
    );
};

export default AppLayout;