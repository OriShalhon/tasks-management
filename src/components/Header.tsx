import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import "./Header.css";

interface HeaderProps {
  onToggleSideBar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSideBar }) => {
  return (
    <header>
      <div className="header menu-padding">
        <a className="menu-bars" onClick={onToggleSideBar}>
          <FaIcons.FaBars />
        </a>
        <div className="header-buttons">
          <button className="login-button">Login</button>
          <button className="logout-button">Logout</button>
          <div className="user-info">User Info</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
