import React from 'react';
import  defaultPic  from '../../assets/images/defaultPic.svg';
import PropTypes from 'prop-types';

import './avatar.css';

function Avatar({ 
	borderColor, 
	classNameImg,
	handle,
	src 
	}) {

	const imgSrc = src ? src : defaultPic;

	return (
			<img 
				alt='avatar' 
				className={`avatar ${ classNameImg }`}
				onClick={ handle } 
				src={ imgSrc } 
				style={{border: `0.5rem solid ${ borderColor }`}}
			/>
	);
}
  
export default Avatar;

Avatar.propTypes = {
  src: PropTypes.string.isRequired
};