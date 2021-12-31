import React, { useContext } from "react";
import { AppContext } from "../../hooks/context/AppContext";

import Avatar from "./Avatar";


function PostContent({ 
  authorUid,
  deletePost, 
  likePost,
  message, 
  nickname, 
  photo,
  postId,
  unlikePost
}) {

  // const [ showDelete, setShowDelete ] = useState( test2 );
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
    countLikes: filteredList.map((post) => post.likes.length),
    like: userLikes.includes( user.uid ),
    localeDate: new Date(...postTimestamp).toLocaleDateString()
  };

  return (
    <div>
      <Avatar src={ photo } />
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