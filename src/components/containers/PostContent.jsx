import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../hooks/context/AppContext";
import firebase, { firestore } from "../../firebase/firebase";

import Avatar from "../presentational/Avatar";

import '../../styles/postContent.css';


function PostContent({ 
  authorUid,
  message, 
  nickname, 
  photo,
  postId
}) {

  const { postsList, user } = useContext(AppContext);
  const image = require.context( '../../assets/images', true );

  //Setea el enlace del avatar del post:
  const url = authorUid === user.uid ? '/profile' : `/profile/${ authorUid }`;

  //Filtra la lista de posts según el postId al cual el usuario de click: 
  const filteredList = postsList.filter(( post ) => post.id === postId );

  //Setea el timestamp del post:
  const postTimestamp = filteredList.map((post) => post.date.seconds * 1000);
  
  //Encuentra el uid del usuario en el array de likes en Firebase:
  const userLikes = filteredList.map(( fav ) => fav.likes.find(( uidFav ) => user.uid === uidFav));

  //Setea la información del post para que pueda ser renderizada en el componente:
  const post = {
    countLikes: filteredList.map(( post ) => post.likes.length),
    like: userLikes.includes( user.uid ),
    localeDate: new Date( ...postTimestamp ).toLocaleDateString()
  };

  //Elimina el post de Firebase:
	const deletePost = ( postId ) => {
		if(window.confirm( '¡Hey! ¿Seguro quieres borrar tu post? 😱' )){
			firestore.doc( `posts/${ postId }` ).delete();
			alert( '¡Sigue adelante! Inspírate y comparte otro ahora 💪💡')
		}
	};

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
    <div>
      <Link to={ url }>
        <Avatar src={ photo } />
      </Link>

      <p>{ nickname }</p>
      <p>{ post.localeDate }</p>

      {user.uid === authorUid ? (
        <img src={ 
          image(`./delete-icon.svg`).default } 
          alt="delete icon" 
          onClick={ () => deletePost( postId )} 
        />
      ):(
        null
      )}

      <p>{ message }</p>

      {post.like ? (
        <img 
          src={ image(`./like-on.svg`).default } 
          alt="like icon" 
          onClick={() => unlikePost( postId )} 
        />
        ):( 
        <img 
          src={ image(`./like-off.svg`).default } 
          alt="dislike icon" 
          onClick={() => likePost( postId )} 
        />
      )}

      <p>{ post.countLikes }</p>
    </div>
  );
}
  
export default PostContent;