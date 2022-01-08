import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

import Logo from '../Logo/Logo';
import Footer from "../Footer/Footer";
import SignIn from '../SignIn/SignIn';
import UserWelcome from "../UserWelcome/UserWelcome";

import './userRegister.css'

function UserRegister() {

  const { user } = useContext( AppContext );

  return (
    <div className="user-register">
      <header>
        <Logo 
          classNameContainer='logo__vert'
          classNameLogo='logo__vert-logotype'
          classNameNaming='logo__vert-naming'
        />
      </header>

      <main>
        {user ? (
          <UserWelcome />
        ):(
          <SignIn />
        )}

        <Footer />
      </main>
    </div>
  );
}

export default UserRegister;