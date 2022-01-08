import React, { useContext, useState } from "react";
import { AppContext } from '../../context/AppContext';
import { colorsList } from "../../helpers/colorsList";
import { cta } from "../../helpers/button-cta";
import { firestore } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";
import ColorPicker from "../ColorPicker/ColorPicker";

import './userWelcome.css';

const UserWelcome = () => {

	const { user, loggedUsers, postsList } = useContext(AppContext);
	const [ colorSelected, setColorSelected ] = useState( undefined );
	const [ colors, setColors ] = useState( colorsList );
	const [ nickname, setNickname ] = useState('');
	const navigate = useNavigate();
	
	//Agrega o actualiza la información del usuario logueado en la colección "Users" de Firestore:
	const setUser = (e) => {
		
		const loggedUser = loggedUsers.find((logged)=> logged.uid === user.uid);

		if( loggedUser ) {
			firestore.collection( 'users' ).doc( user.uid ).set({
				nickname: e.target.value
			}, { merge: true });
		}else{
			firestore.collection( 'users' ).doc( user.uid ).set({
				email: user.email,
				name: user.displayName,
				nickname: e.target.value,
				photo: user.photoURL
			});
		}

		setNickname( e.target.value );
	};

	//Agrega el color seleccionado por el usuario en la colección "Users" de Firestore y actualiza la lista "colors" con esa información:
	const setColor = ( e, color ) => {
		firestore.collection( 'users' ).doc( user.uid ).set({
			color: color.hex
		}, { merge: true });

		const colorId = e.target.id;

		let newColorsList = colors.map((color)=> {
			if(colorId === color.hex) {
				return {
					name: color.name, 
					hex: color.hex, 
					selected: !color.selected
				}
			}else{
				return {
					name: color.name, 
					hex: color.hex, 
					selected: false
				}
			}
		})

		setColors( newColorsList );
		setColorSelected( color );
	};

	//Actualiza la información del usuario en la lista de los posts que haya hecho en 
	//sesiones anteriores y lo deriva a "/feed":
	const goFeed = (e) => {
		e.preventDefault();

		const userPosts = postsList.filter(( post ) => post.authorUid === user.uid);

		userPosts.map((post) => (
				firestore.doc( `posts/${ post.id }` ).update({
				authorColor: colorSelected.hex,
				authorNickname: nickname,
				authorPhoto: user.photoURL
			})
		));

		navigate( '/feed' );
	};

	return (
		<section className='userWelcome'>

			{user && 
				<>
					<h1 className='userWelcome__h1'>
						WELCOME,
						<span> { user.displayName }!</span> 
					</h1>

					<p className='userWelcome__p'> 
						You logged in with the e-Mail: { user.email } 
					</p>
	
					<input 
						className='userWelcome__input'
						onChange={ setUser } 
						placeholder='Type your nickname'
						type='text'
						value={ nickname }
					/>
		
					<p className='userWelcome__p' >
						Select your favorite color:
					</p>
		
					<ul className='userWelcome__color'>
						{colors.map(( color ) => 
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
					classNameBtn={ 'button-green' }
					cta={ cta.continue } 
					handle={ goFeed } 
				/>
			}
		</section>
	);
}
    
export default UserWelcome;