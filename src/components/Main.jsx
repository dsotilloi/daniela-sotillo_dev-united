import React, { useContext } from "react";
import { AuthenticationContext } from '../hooks/context/AuthenticationContext';
import SignIn from "./SignIn";
import UserWelcome from "./UserWelcome";
import '../styles/main.css';


function Main() {

  const { user } = useContext(AuthenticationContext);

  return (
    <main className="Main">

      {user ? (
        <UserWelcome />
      ):(
        <SignIn />
      )}

    </main>
  );
}

export default Main;