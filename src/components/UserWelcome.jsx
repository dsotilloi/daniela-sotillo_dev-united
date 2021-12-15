import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { PainterContext } from '../hooks/context/PainterContext';
import { cta } from "../helpers/button-cta";
import Button from "./Button";
import ColorPicker from "./ColorPicker";
import '../styles/userWelcome.css';

const UserWelcome = () => {

	const { colorsList, handleColor, stateColor } = useContext(PainterContext);
	const [ inputData, setInputData ] = useState("");


	const handleInputData = (e) => {
		setInputData(e.target.value);
	}


	// console.log(inputData);
	// console.log(colorSelected);
	// console.log(stateColor);
	
	return (
		<section className="UserWelcome">

			<h2>WELCOME NAME!</h2>
			
			<input 
				type="text" 
				onChange={handleInputData} 
				placeholder="Type your username" 
				value={inputData}
				/>

			<p>Select your favorite color:</p>

			<ul className='username__color'>
				{colorsList.map((color) => 
						<ColorPicker 
						color={ color } 
						handleColor={ handleColor } 
						key={ color.hex } />
					)
				}
			</ul>
			
			{inputData !== "" && stateColor && (
				<Link to="/feed">
					<Button cta={cta.continue} />
				</Link>
				)
			}

		</section>
	);
}
    
export default UserWelcome;