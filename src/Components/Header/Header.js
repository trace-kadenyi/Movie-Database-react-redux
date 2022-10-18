import React from "react";
import { NavLink } from "react-router-dom";
import logo1 from "../../assets/1.png";
import logo2 from "../../assets/8.png";
import "./header.css";

const Header = () => (
  <header>
    <h1 className="header text-muted">Animations</h1>
    <div className="logo_div">
      <img src={logo1} alt="logo" />
      <img src={logo2} alt="logo" className="hide" />
    </div>
  </header>
);

export default Header;
