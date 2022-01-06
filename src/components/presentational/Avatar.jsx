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
				className={`avatar ${ classNameImg }`}
				onClick={ handle } 
				src={ src } 
				style={{bordercolor: `${ borderColor }`}}
			/>
	);
}
  
export default Avatar;