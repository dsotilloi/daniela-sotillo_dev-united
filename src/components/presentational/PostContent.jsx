import React from "react";
import Avatar from "./Avatar";

function PostContent({ 
  src, 
  message, 
  date, 
  nickname, 
  like,
  counterLikes, 
  handleDelete, 
  postId,
  handleLike,
  handleUnlike
}) {

  const image = require.context( '../../assets/images', true );

  return (
    <div>
      <Avatar src={ src } />
      <p>{ nickname }</p>
      <p>date</p>
      <img src={ image(`./delete-icon.svg`).default } alt="delete icon" onClick={ () => handleDelete( postId )} />
      <p>{ message }</p>

      {like ? (
        <img src={ image(`./like-on.svg`).default } alt="like icon" onClick={() => handleUnlike( postId, like )} />
        ):( 
        <img src={ image(`./like-off.svg`).default } alt="dislike icon" onClick={() => handleLike( postId, like )} />
      )}

      <p>{ counterLikes ? counterLikes : 0 }</p>
    </div>
  );
}
  
export default PostContent;