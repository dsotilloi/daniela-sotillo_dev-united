import React from "react";
import Avatar from "./Avatar";

function PostContent({ src, message, date }) {
  // console.log('hola  dadada')
    return (
      <div>
        <Avatar src={ src } />
        <p>{ message }</p>
        <p>{ date }</p>
        <p>MESSAGEEEE</p>
      </div>
    );
  }
  
  export default PostContent;