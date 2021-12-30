import React, { useContext, useState } from "react";
import firebase, { firestore } from "../../firebase/firebase";
import { AppContext } from "../../hooks/context/AppContext";
import { cta } from "../../helpers/button-cta";
import { sortPostsList } from "../../helpers/sortPostsList";
import { useNavigate } from "react-router-dom";

import Avatar from "../presentational/Avatar";
import Button from "../presentational/Button";
import PostContent from "../presentational/PostContent";
import TextInput from "../presentational/TextInput";

function Feed() {
  
  const [ message, setMessage ] = useState("");
  const [ showProfile, setShowProfile ] = useState( false );
  const { postsList, user, loggedUser } = useContext(AppContext);
  const navigate = useNavigate();
  const image = require.context('../../assets/images', true);

  //Deriva al usuario a "/profile":
  const goProfile = (e) => {
    e.preventDefault();
    setShowProfile( !showProfile );
    navigate( "/profile" );
  };

  //Maneja el input para capturar el mensaje del usuario:
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  
  //Envía el mensaje del usuario y el contenido del post a Firebase:
  const addPost = () => {
    const authorPref = loggedUser.filter(( logged ) => logged.uid === user.uid);
    authorPref.map((author) => (
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

  //Ordena lista de post según la fecha de publicación:
  sortPostsList( postsList );

  return (
    <section className="user-feed">

      <header>

        {user && 
          <Avatar src={ user.photoURL } handle={ goProfile } />
        }

        <div>
          <img src={ image(`./dev-united-logo.svg`).default } alt='logo' />
          <img src={ image(`./dev-united-naming.svg`).default } alt='naming' />
        </div>
      </header>

      <main>

        <section>
          <TextInput 
            handle={ handleMessage }
            placeholder="What’s happening?"
            value={ message }
          />

          <p>CARACTERES UTILIZADOS / 200 max.</p>
          <Button cta={ cta.post } handle={ addPost } />
        </section>
        
        <section>
          {postsList.map((post)=> (
            <PostContent 
              authorUid={ post.authorUid }
              deletePost = { deletePost }
              handleLike={ likePost }
              handleUnlike={ unlikePost }
              key={ post.id } 
              message={ post.message } 
              nickname={ post.authorNickname }
              photo={ post.authorPhoto}
              postId={ post.id }
            />
          ))}
        </section>

      </main>

    </section>
  );
}

export default Feed;