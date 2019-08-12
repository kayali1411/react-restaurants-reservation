import React from 'react';
import logo from '../logo.svg';
import style from '../style/Header.module.css';

const Header = () => (
  <header className={style.header}>
      <img className={style.logo} width={100} src={logo} alt="logo" />
      <h1>React Restaurants Reservation</h1>
  </header>
);

export default Header;