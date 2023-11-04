import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import "./Header.css";

interface HeaderProps {
  onToggleSideBar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSideBar }) => {
  return (
    <header>
      <div className="header">
        <a className="menu-bars" onClick={onToggleSideBar}>
          <FaIcons.FaBars />
        </a>
        <div className="header-right">
          <a className="login-button">Login</a>
          <a className="logout-button">Logout</a>
          <a className="user-info">User Info</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
