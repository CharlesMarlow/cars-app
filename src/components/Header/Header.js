import React from 'react';
import logo from '../../logo.png';
import './header.css';

const Header = () => {
  return (
    <div className='header'>
      <img src={logo} className='logo' alt='logo' />
      <h1 className="header-text">Car Selection Experience!</h1>
    </div>
  );
};

export default Header;
