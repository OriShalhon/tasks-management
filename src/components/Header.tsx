import React from "react";
import { FaBars } from "react-icons/fa";
import "./Header.css";

interface HeaderProps {
  onToggleSideBar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSideBar }) => {
  return (
    <header>
      <div className="header">
        <button className="menu-bars" onClick={onToggleSideBar}>
          <FaBars />
        </button>
        <div className="header-right">
          <button className="login-button">Login</button>
          <button className="logout-button">Logout</button>
          <button className="user-info">User Info</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
