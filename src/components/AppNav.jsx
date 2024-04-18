import React from 'react';
import s from "../styles/AppNav.module.scss"
import { NavLink } from 'react-router-dom';

const AppNav = () => {
    return (
       <nav className={s.nav}>
      <ul>
        <li>
            <NavLink to='cities'>Cities</NavLink>
        </li>
        <li>
            <NavLink to='countries'>Countries</NavLink>
        </li>
      </ul>
       </nav>
    );
};

export default AppNav;