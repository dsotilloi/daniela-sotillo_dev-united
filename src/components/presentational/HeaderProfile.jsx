import React from "react";

import Button from "./Button";
import Avatar from "./Avatar";


function HeaderProfile({ src, cta, handle, nickname }) {

	const image = require.context( '../../assets/images', true );

  return (
		<header>
			<img src={ image(`./back.svg`).default } alt='back icon' />
			<p>{ nickname }</p>
			<Button cta={ cta } handle={ handle } />
			<Avatar src={ src } />
			<p>{ nickname }</p>
		</header>
  );
}
  
export default HeaderProfile;