import React from 'react';
import { cta } from '../../helpers/button-cta'
import { useNavigate } from "react-router-dom";

import Button from '../Button/Button';
import Footer from '../Footer/Footer';
import Logo from '../Logo/Logo';

import './notFound.css';

function NotFound404() {

  const navigate = useNavigate();

  const goHome = () => navigate('/');

  return (
    <div className='not-found'>
      <header>
        <Logo 	
          classNameContainer='logo__not-found'
          classNameLogo='logo__not-found-logotype'
          classNameNaming='logo__not-found-naming'
        />
      </header>

      <main className='not-found__main'>
        <h1>Sorry,
          <br />
          <span>the page not found</span>
        </h1>

        <p>The link you followed probably broken, or the page has been removed</p>

        <Button 
          classNameBtn='button-green not-found__btn'
          cta={ cta.home }
          handle={ goHome }
        />
      </main>
      <Footer/>
    </div>
  );
}

export default NotFound404;