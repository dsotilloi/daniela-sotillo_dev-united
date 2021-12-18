import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { firestore, auth } from "../firebase/firebase";
import { PainterContext } from '../hooks/context/PainterContext';
import { cta } from "../helpers/button-cta";

import Button from "./Button";
import ColorPicker from "./ColorPicker";

import '../styles/userWelcome.css';

const UserWelcome = () => {

	const { colorsList } = useContext(PainterContext); //cambiar context por un helper
	const navigate = useNavigate();

	const [ color, setColor ] = useState({ color: "", selected: false }) 
	const [ userLogged, setUserLogged ] = useState([]);
  const [ user, setUser ] = useState(null);
	const [ author, setAuthor ] = useState({ nickname: "", uid: "" })

	useEffect(() => {

		const unsubscribe = firestore
			.collection( "posts" )
			.onSnapshot(( snapshot ) => {
				const userInfo = snapshot.docs.map((doc) => {
					return {
						id: doc.id,
						uid: doc.data().author.uid,
						nickname: doc.data().author.nickname,
						color: doc.data().color.color
					};
				});

				setUserLogged(userInfo);

			})

			auth.onAuthStateChanged(( user ) => {
				setUser(user);
			});

			return () => unsubscribe();

	}, [])
	
	const handleInput = (e) => {
		let author = {
			nickname: e.target.value,
      uid: user.uid
		};
		setAuthor( author );
	}

	const handleColor = ( colorSelected ) => {
		let color = {
			color: colorSelected,
			selected: true
		};
		setColor( color );
	}

	const handleUserStyle = async(e) => {
		e.preventDefault();
    await firestore.collection( "posts" ).add( { author, color } );

		navigate( "feed" );
	}

	///////////////////////////////////////////////////

	console.log(userLogged);
	
	return (
		<section className="UserWelcome">

			{user && 
				<>
					<h2>WELCOME { user.displayName }!</h2>
	
					<input 
						type="text" 
						onChange={ handleInput } 
						placeholder="Type your nickname" 
						value={ author.nickname }
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
			
				</>							
							
			}

			{ author.nickname !== "" && color.selected && (
					<Button cta={ cta.continue } handle={ handleUserStyle } />
				)
			}

		</section>
	);
}
    
export default UserWelcome;