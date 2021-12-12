import React, { useContext } from "react";
import { AuthenticationContext } from '../hooks/context/AuthenticationContext';
import SignIn from "./SignIn";
import UserWelcome from "./UserWelcome";
import '../styles/main.css';


const Main = ()=> {

  const { user, logout } = useContext(AuthenticationContext);

  return (
    <main className="Main">

      {user ? (
        <UserWelcome />
      ):(
        <SignIn />
      )}

      <button onClick={logout}>Cerrar sesión</button>      
    </main>
  );
}

export default Main;