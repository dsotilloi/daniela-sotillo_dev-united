import React from "react";

function Avatar({ src, handle }) {
	return (
		<div>
			<img src={ src } alt="avatar" onClick={ handle } />
	  </div>
	);
}
  
export default Avatar;