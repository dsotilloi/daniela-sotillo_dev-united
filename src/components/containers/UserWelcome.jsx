import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../firebase/firebase";
import { AppContext } from '../../hooks/context/AppContext';
import { cta } from "../../helpers/button-cta";
import { colorsList } from "../../helpers/colorsList";


import Button from "../presentational/Button";
import ColorPicker from "../presentational/ColorPicker";
import TextInput from "../presentational/TextInput";

import '../../styles/userWelcome.css';

const UserWelcome = () => {

	const { 
		user, 
		color, 
		setColor, 
		author, 
		setAuthor
	 } = useContext(AppContext);

	const navigate = useNavigate();

	const handleInput = (e) => {
		let newAuthor = {
			nickname: e.target.value,
      uid: user.uid,
			photo: user.photoURL
		};
		setAuthor( newAuthor );
	};

	const handleColor = ( colorSelected ) => {
		let newColor = {
			color: colorSelected,
			selected: true
		};
		setColor( newColor );
	};

	const handleButton = (e) => {
		e.preventDefault();
		navigate( "/feed" );
	};

	return (
		<section className="UserWelcome">

			{user && 
				<>
					<h2>WELCOME { user.displayName }!</h2>
					<p>e-Mail: { user.email } </p>
	
					<TextInput 
						handle={ handleInput } 
						placeholder="Type your nickname" 
						value={ author.nickname }
					/>
		
					<p>Select your favorite color:</p>
		
					<ul className='username__color'>
						{colorsList.map((color) => 
							<ColorPicker 
								color={ color } 
								handle={ handleColor } 
								key={ color.hex } 
							/>
						)}
					</ul>
				</>			
			}

			{ author.nickname !== "" && color.selected && (
				<Button cta={ cta.continue } handle={ handleButton } />
			)}
		</section>
	);
}
    
export default UserWelcome;