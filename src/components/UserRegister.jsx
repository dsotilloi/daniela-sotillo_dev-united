import React, { useContext } from "react";
import { AuthenticationContext } from '../hooks/context/AuthenticationContext';
import UserWelcome from "./UserWelcome";
import SignIn from "./SignIn";


function UserRegister() {

  const image = require.context('../assets/images', true);
  const { user } = useContext(AuthenticationContext);

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