import React, { useContext } from "react";
import { AppContext } from '../../hooks/context/AppContext';
import UserWelcome from "../containers/UserWelcome";
import SignIn from "./SignIn";


function UserRegister() {

  const image = require.context( '../../assets/images', true );
  const { user } = useContext( AppContext );

  return (
    <>
      <header>
        <div>
          <img src={ image(`./dev-united-logo.svg`).default } alt='logo' />
          <img src={ image(`./dev-united-naming.svg`).default } alt='naming' />
        </div>
      </header>

      <main>

        {user ? (
          <UserWelcome />
        ):(
          <SignIn />
        )}

      </main>

    </>
  );
}

export default UserRegister;