import React, { useContext } from "react";
import { AppContext } from "../../hooks/context/AppContext";
import { cta } from "../../helpers/button-cta";

import HeaderProfile from "../presentational/HeaderProfile";
import Button from "../presentational/Button";


function UserProfile() {

  // const image = require.context( '../../assets/images', true );
  const { user, author, logout } = useContext( AppContext );

  return (
    <>
      {user && 
        <HeaderProfile 
        cta={ cta.logout } 
        src={ user.photoURL } 
        nickname={ author.nickname } 
        handle={ logout } />
      }

      <main>

        <section>
          <Button />
          <Button />
        </section>

        


      </main>

    </>
  );
}

export default UserProfile;