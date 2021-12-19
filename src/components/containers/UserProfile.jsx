import React, { useContext } from "react";
import { AppContext } from "../../hooks/context/AppContext";
import { cta } from "../../helpers/button-cta";

import HeaderProfile from "../presentational/HeaderProfile";


function UserProfile() {

  // const image = require.context( '../../assets/images', true );
  const { user, author } = useContext( AppContext );

  console.log(author)

  return (
    <>
      {user && 
        <HeaderProfile src={ user.photoURL } cta={ cta.logout } nickname={ author.nickname }/>
      }

      <main>

          <section>

          </section>
      </main>

    </>
  );
}

export default UserProfile;