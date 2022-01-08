import React from 'react';
import { useNavigate } from "react-router-dom";

import './logo.css';

function Logo({
	classNameContainer,
	classNameLogo,
	classNameNaming
}) {

	const image = require.context( '../../assets/images', true );
	const navigate = useNavigate();

	const goHome = () => navigate( '/' );

	return (
		<div className={`logo ${ classNameContainer }`} onClick={ goHome }>
			<img 
				alt='Dev-United logo' 
				className={ classNameLogo }
				src={image( `./dev-united-logo.svg` ).default} 
			/>
			<img 
				alt='Dev-United naming' 
				className={ classNameNaming }
				src={image( `./dev-united-naming.svg` ).default} 
			/>
		</div>
	)
}

export default Logo;
