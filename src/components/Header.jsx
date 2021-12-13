import React from "react";
import '../styles/header.css';

function Header() {
  const image = require.context('../assets/images', true);

    return (
      <header className="Header">
        <div>
          <img src={ image(`./dev-united-logo.svg`).default } alt='logo' />
          <img src={ image(`./dev-united-naming.svg`).default } alt='naming' />
        </div>
      </header>
    );
  }
  
  export default Header;