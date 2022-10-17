import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1 className='header'>Animation Movies</h1>
    <nav>
      <ul>
        <li key={1}><NavLink to="/">Movies</NavLink></li>
      </ul>
    </nav>
  </header>
);

export default Header;
