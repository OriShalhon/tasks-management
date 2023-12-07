import React from "react";
import "./Header.css";

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header>
      <div className="header">
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
