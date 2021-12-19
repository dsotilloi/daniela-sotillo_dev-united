import React from "react";
import Avatar from "./Avatar";

function PostContent({ src, message, date, nickname, like, counterLikes, handle }) {

  const image = require.context( '../../assets/images', true );

    return (
      <div>
        <Avatar src={ src } />
        <p>{ nickname }</p>
        <p>date</p>
        <p>{ message }</p>
        <p>{ like }</p>
        <p>{ counterLikes }</p>
        <img src={ image(`./delete-icon.svg`).default } alt="delete icon" onClick={ handle }/>
      </div>
    );
  }
  
  export default PostContent;