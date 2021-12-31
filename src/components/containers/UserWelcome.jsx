import React, { useContext, useState } from "react";
import { AppContext } from '../../hooks/context/AppContext';
import { colorsList } from "../../helpers/colorsList";
import { cta } from "../../helpers/button-cta";
import { firestore } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

import Button from "../presentational/Button";
import ColorPicker from "../presentational/ColorPicker";
import TextInput from "../presentational/TextInput";

import '../../styles/userWelcome.css';

const UserWelcome = () => {

	const { user, postsList } = useContext(AppContext);

	const navigate = useNavigate();

	const [ colorSelected, setColorSelected ] = useState("");
	const [ nickname, setNickname ] = useState("");

	//Agrega o actualiza la información del usuario logueado 
	//en la colección "Users" de Firestore:
	const setUser = (e) => {
			firestore.collection('users').doc(user.uid).set({
			email: user.email,
			name: user.displayName,
			nickname: e.target.value,
			photo: user.photoURL
		});
		setNickname( e.target.value );
	};

	//Agrega el color seleccionado por el usuario
	//en la colección "Users" de Firestore:
	const setColor = ( color ) => {
		firestore.collection('users').doc(user.uid).set({
			color: color,
		}, { merge: true });
		setColorSelected( color );
	};

	//Actualiza la información del usuario en la lista de los posts 
	//que haya hecho en sesiones anteriores y lo deriva a "/feed":
	const goToHome = (e) => {
		e.preventDefault();
		const userPosts = postsList.filter((post) => post.authorUid === user.uid);
		userPosts.map((post) => (
				firestore.doc( `posts/${ post.id }` ).update({
					authorColor: colorSelected,
					authorNickname: nickname,
					authorPhoto: user.photoURL
				})
			))
		navigate( "/home" );
	};

	return (
		<section className="UserWelcome">

			{user && 
				<>
					<h2>WELCOME { user.displayName }!</h2>
					<p>e-Mail: { user.email } </p>
	
					<TextInput 
						handle={ setUser } 
						placeholder="Type your nickname" 
					/>
		
					<p>Select your favorite color:</p>
		
					<ul className='username__color'>
						{colorsList.map((color) => 
							<ColorPicker 
								color={ color } 
								handle={ setColor } 
								key={ color.hex } 
							/>
						)}
					</ul>
				</>			
			}

			{nickname && colorSelected &&
				<Button 
					cta={ cta.continue } 
					handle={ goToHome } 
				/>
			}

		</section>
	);
}
    
export default UserWelcome;