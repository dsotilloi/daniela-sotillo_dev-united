import React from 'react';

import '../../styles/avatar.css';

function Avatar({ 
	borderColor, 
	classNameImg,
	handle,
	src 
	}) {
	return (
			<img 
				alt='avatar' 
				className={`avatar ${ borderColor } ${ classNameImg }`}
				onClick={ handle } 
				src={ src } 
			/>
	);
}
  
export default Avatar;