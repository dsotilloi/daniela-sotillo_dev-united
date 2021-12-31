import React, { useContext, useState } from "react";
import firebase, { firestore } from "../../firebase/firebase";
import { AppContext } from "../../hooks/context/AppContext";
import { useNavigate } from "react-router-dom";

import Feed from "../presentational/Feed";
import Profile from "./Profile"

function Home() {

	const [ message, setMessage ] = useState("");
	const [ showFeed, setShowFeed ] = useState( true );
	const { user, loggedUsers } = useContext(AppContext);
	const navigate = useNavigate();

	//Deriva al usuario a "/profile":
	const goToProfile = (e) => {
		e.preventDefault();
		setShowFeed( !showFeed );
		navigate( "profile" );
	};

	//Maneja el input para capturar el mensaje del usuario:
	const getMessage = (e) => {
		setMessage( e.target.value );
	};
	
	//Envía el mensaje del usuario y el contenido del post a Firebase:
	const addPost = () => {
		const authorPref = loggedUsers.filter(( logged ) => logged.uid === user.uid );
		authorPref.map(( author ) => (
			firestore.collection( 'posts' ).add({
				authorColor: author.color,
				authorNickname: author.nickname,
				authorPhoto: author.photo,
				authorUid: author.uid,
				date: new Date(),
				likes: [],
				message: message
			})
		));
		setMessage("");
	};

	//Elimina el post de Firebase:
	const deletePost = ( postId ) => {
		if(window.confirm( '¡Hey! ¿Seguro quieres borrar tu post? 😱' )){
			firestore.doc( `posts/${ postId }` ).delete();
			alert( '¡Sigue adelante! Inspírate y comparte otro ahora 💪💡')
		}
	}

	//Actualiza el array de likes agregando el uid del usuario da like:
	const likePost = ( postId ) => {
		firestore.doc( `posts/${ postId }` ).update({
			likes: firebase.firestore.FieldValue.arrayUnion( user.uid )
		});
	};

	//Actualiza el array de likes eliminando el uid del usuario que quita el like:
	const unlikePost = ( postId ) => {
		firestore.doc( `posts/${ postId }` ).update({
			likes: firebase.firestore.FieldValue.arrayRemove( user.uid )
		});
	}; 

    return (
      <>
      	{showFeed ? (
					<Feed 
						addPost={ addPost }
						deletePost = { deletePost }
						getMessage={ getMessage }
						goToProfile={ goToProfile }
						likePost={ likePost }
						message={ message }
						unlikePost={ unlikePost }
					/>
				):(
					<Profile 
						addPost={ addPost }
						deletePost = { deletePost }
						likePost={ likePost }
						unlikePost={ unlikePost }
					/>
				)}
      </>
    );
  }
  
  export default Home;