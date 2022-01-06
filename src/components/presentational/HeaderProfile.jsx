import React from 'react';
import { logout } from "../../firebase/firebase";
import { useNavigate } from 'react-router-dom';

import Button from './Button';
import Avatar from './Avatar';


function HeaderProfile({ 
	color,
	cta, 
	nickname, 
	src 
}) {

	const image = require.context( '../../assets/images', true );
	const navigate = useNavigate();
	
	const goBack =() => {
		navigate(-1);
	};

	const userLogout = () => {
		logout();
		navigate('/');
	};

	console.log(color);

  return (
		<header>
			<img 
				src={ image(`./back.svg`).default } 
				alt='back icon'
				onClick={ goBack } 
			/>

			<p>{ nickname }</p>
			<Button cta={ cta } handle={ userLogout } />
			<Avatar src={ src } borderColor={ color }/>
			<p>{ nickname }</p>
		</header>
  );
}
  
export default HeaderProfile;