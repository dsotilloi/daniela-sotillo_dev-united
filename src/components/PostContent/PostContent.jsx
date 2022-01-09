import React, { useContext } from "react";
import firebase, { firestore } from "../../firebase/firebase";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

import Avatar from "../Avatar/Avatar";

import './postContent.css';

function PostContent({ 
  authorUid,
  color,
  email,
  message, 
  nickname, 
  photo,
  postId
  }) {

  const { postsList, user } = useContext(AppContext);
  const image = require.context( '../../assets/images', true );

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
    <section className='post-container'>
      <div className='post-content animate__animated animate__bounceIn'>
        <Link to={ authorUid === user.uid ? '/profile' : `/profile/${ authorUid }` }>
          <Avatar classNameImg='avatar__post' src={ photo } />
        </Link>

        <div className='post-content__container'>

          <section className='post-content__header'>
            <div className='post-content__author'>
              <p style={{background: `${ color }`}}> { nickname } </p>
              <p> - { post.localeDate }</p>
            </div>

            {user.uid === authorUid ? (
              <img 
                alt="delete icon" 
                className='post-content__delete'
                onClick={() => deletePost( postId )} 
                src={image( './delete-icon.svg' ).default} 
              />
            ):(
              null
            )}
          </section>

          <p className='post-content__email'>with the e-Mail: { email }</p>

          <p className='post-content__message'>{ message }</p>

          <section className='post-content__likes'>
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

            <p className={ post.like ? 'like' : 'unlike'}>{ post.countLikes }</p>
          </section>
        </div>
      </div>
    </section>
  );
}
  
export default PostContent;