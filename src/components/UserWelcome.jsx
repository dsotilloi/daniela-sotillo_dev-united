import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { firestore, auth } from "../firebase/firebase";
import { PainterContext } from '../hooks/context/PainterContext';
import { cta } from "../helpers/button-cta";

import Button from "./Button";
import ColorPicker from "./ColorPicker";

import '../styles/userWelcome.css';

const UserWelcome = () => {

	const { colorsList, stateColor, setStateColor } = useContext(PainterContext);
	const navigate = useNavigate();

	const [ color, setColor ] = useState({ color: "" })
	const [ userLogged, setUserLogged ] = useState([]);
  const [ user, setUser ] = useState(null);
	const [ username, setUsername ] = useState({ uid: "",	author: "" })

	useEffect(() => {

		const cancelSubscription = firestore
			.collection( "posts" )
			.onSnapshot(( snapshot ) => {
				const userInfo = snapshot.docs.map((doc) => {
					return {
						id: doc.id,
						uid: doc.data().username.uid,
						author: doc.data().username.author,
						color: doc.data().color.color
					};
				});

				setUserLogged(userInfo);

			})

			auth.onAuthStateChanged(( user ) => {
				setUser(user);
			});

			return () => cancelSubscription();

	}, [])
	
	const handleInput = (e) => {
		let username = {
			author: e.target.value,
      uid: user.uid
		};
		setUsername( username );
	}

	const handleColor = ( colorSelected ) => {
		let color = {
			color: colorSelected,
		};
		setColor( color );
		setStateColor( true );
	}

	const handleUserStyle = async (e) => {
		e.preventDefault();
    await firestore.collection( "posts" ).add( { username, color } );
		navigate("feed");
	}

	///////////////////////////////////////////////////

	console.log(userLogged);
	console.log(user);
	// console.log(stateColor);
	
	return (
		<section className="UserWelcome">

			<h2>WELCOME NAME!</h2>
			
			<input 
				type="text" 
				onChange={ handleInput } 
				placeholder="Type your username" 
				value={ username.author }
				/>

			<p>Select your favorite color:</p>

			<ul className='username__color'>
				{colorsList.map((color) => 
						<ColorPicker 
						color={ color } 
						handle={ handleColor } 
						key={ color.hex } />
					)
				}
			</ul>
			
			{username.author !== "" && stateColor && (
					<Button cta={ cta.continue } handle={ handleUserStyle } />
				)
			}

		</section>
	);
}
    
export default UserWelcome;