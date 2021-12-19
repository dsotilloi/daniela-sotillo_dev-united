import React, { useContext } from "react";
import { AppContext } from '../../hooks/context/AppContext';
import { cta } from '../../helpers/button-cta'
import Button from "./Button";


function SignIn() {

	const { loginConGoogle } = useContext(AppContext);   
	const image = require.context('../../assets/images', true);

	return (
		<section>
			<h1 className="main__h1">LOREM IPSUM DOLOR</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

			<div>
				<img src={ image(`./google-icon.svg`).default } alt='google icon' />
				<Button 
				cta={ cta.signIn } 
				handle={loginConGoogle} /> 
			</div>
			
		</section>      
	)
};

export default SignIn;