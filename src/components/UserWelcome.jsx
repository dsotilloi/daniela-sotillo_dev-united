import React, { useContext } from "react";
import { PainterContext } from '../hooks/context/PainterContext';
import { cta } from "../helpers/button-cta";
import Button from "./Button";
import '../styles/userWelcome.css';

const UserWelcome = () => {

	const { colors, handleColor } = useContext(PainterContext);
	
	return (
		<section className="UserWelcome">
			<h2>WELCOME NAME!</h2>
			<input type="text" placeholder="Type your username" />
			<p>Select your favorite color</p>

			{colors.map((color) => 
					<div 
					className="color"
					onClick={() => handleColor(color.hex)}
					style={{ backgroundColor: color.hex }} >
					</div>
				)
			}

			<Button cta={cta.continue} />
		</section>
	);
}
    
export default UserWelcome;