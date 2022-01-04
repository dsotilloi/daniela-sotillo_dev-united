import React from 'react';
import { cta } from '../../helpers/button-cta'
import { loginConGoogle } from "../../firebase/firebase";

import ButtonImg from './ButtonImg';

import '../../styles/signIn.css';

function SignIn() {

	const image = require.context( '../../assets/images', true );

	return (
		<section>
			<h1 className='signIn__h1'>
				LOREM 
				<br></br> 
				IPSUM DOLOR
			</h1>

			<p className='signIn__p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
			
			<ButtonImg 
				alt='google logo'
				classNameBtn='google-button'
				classNameImg='google-img'
				cta={ cta.signIn }
				handle={ loginConGoogle } 
				img={ image( './google-icon.svg' ).default }
			/> 
		</section>      
	)
};

export default SignIn;