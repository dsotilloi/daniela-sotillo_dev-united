import React, { useContext } from 'react';
import { AppContext } from '../../hooks/context/AppContext';

import Logo from './Logo';
import SignIn from './SignIn';
import UserWelcome from "../containers/UserWelcome";

import '../../styles/userRegister.css'

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
      </main>
    </div>
  );
}

export default UserRegister;