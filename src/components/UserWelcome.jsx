import React, { useContext } from "react";
import { PainterContext } from '../hooks/context/PainterContext';
import { cta } from "../helpers/button-cta";
import Button from "./Button";
import ColorPicker from "./ColorPicker";
import '../styles/userWelcome.css';

const UserWelcome = () => {

	const { colors, handleColor } = useContext(PainterContext);
	
	return (
		<section className="UserWelcome">

			<h2>WELCOME NAME!</h2>
			<input type="text" placeholder="Type your username" />
			<p>Select your favorite color:</p>

			<ul className='username__color'>
				{colors.map((color) => 
						<ColorPicker 
						color={ color } 
						handleColor={ handleColor } 
						key={ color.hex } />
					)
				}
			</ul>

			<Button cta={cta.continue} />
		</section>
	);
}
    
export default UserWelcome;