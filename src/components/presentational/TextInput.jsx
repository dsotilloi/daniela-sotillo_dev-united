import React from "react";

function TextInput({ handle, placeholder, value }) {
    return (
			<input 
				type="text" 
				onChange={ handle } 
				placeholder={placeholder} 
				value={ value }
			/>
    );
  }
  
  export default TextInput;