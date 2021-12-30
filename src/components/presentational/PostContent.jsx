import React, { useContext } from "react";
import { AppContext } from "../../hooks/context/AppContext";

import Avatar from "./Avatar";


function PostContent({ 
  handleDelete, 
  handleLike,
  handleUnlike,
  message, 
  nickname, 
  photo,
  postId
}) {

  const { postsList, user } = useContext(AppContext);
  const image = require.context( '../../assets/images', true );

  //Filtra la lista de post según el postId al cual el usuario de click: 
  const filterPosts = postsList.filter(( post ) => post.id === postId );

  //Setea el timestamp del post:
  const postTimestamp = filterPosts.map((post) => post.date.seconds * 1000);
  
  //Encuentra el uid del usuario en el array de likes en Firebase:
  const userLikes = filterPosts.map(( fav ) => fav.likes.find(( uidFav ) => user.uid === uidFav));

  //Setea la información del post para que pueda ser renderizada en el componente:
  const post = {
    like: userLikes.includes( user.uid ),
    countLikes: filterPosts.map((post) => post.likes.length),
    localeDate: new Date(...postTimestamp).toLocaleDateString()
  };

  return (
    <div>
      <Avatar src={ photo } />
      <p>{ nickname }</p>
      <p>{ post.localeDate }</p>
      <img src={ image(`./delete-icon.svg`).default } alt="delete icon" onClick={ () => handleDelete( postId )} />
      <p>{ message }</p>

      {post.like ? (
        <img src={ image(`./like-on.svg`).default } alt="like icon" onClick={() => handleUnlike( postId )} />
        ):( 
        <img src={ image(`./like-off.svg`).default } alt="dislike icon" onClick={() => handleLike( postId )} />
      )}

      <p>{ post.countLikes }</p>
    </div>
  );
}
  
export default PostContent;