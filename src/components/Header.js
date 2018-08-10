import React from 'react';
import logo from './images/logo.svg';
import './css/style.css';

export const Header = ({ title = 'Deipi' }) => (
  <div className="header">
    <header className="Logo">
      <img src={logo} alt="logo" />
      <h2>{title}</h2>
    </header>
  </div>
);
