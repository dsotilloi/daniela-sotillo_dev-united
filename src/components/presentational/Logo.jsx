import React from 'react';

import '../../styles/logo.css';

function Logo({
	classNameContainer,
	classNameLogo,
	classNameNaming
}) {

	const image = require.context( '../../assets/images', true );

	return (
		<div className={`logo ${ classNameContainer }`}>
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
