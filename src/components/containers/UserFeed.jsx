import React, { useContext } from "react";
import { firestore } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../hooks/context/AppContext";
import { cta } from "../../helpers/button-cta";

import TextInput from "../presentational/TextInput";
import Button from "../presentational/Button";
import Avatar from "../presentational/Avatar";
import PostContent from "../presentational/PostContent";

function UserFeed() {

  const image = require.context('../../assets/images', true);
  const navigate = useNavigate();

  const { 
    user, 
    post, 
    setPost, 
    author, 
    color,
    postsList 
  } = useContext(AppContext);

  const handleInput = (e) => {
    const newPost = {
      message: e.target.value, 
      date: new Date(), 
      like: "", 
      counterLikes: "", 
      id: ""   
    }
    setPost( newPost );
  };

  const handleButton = () => {
		firestore.collection( "posts" ).add({ ...author, ...color, ...post });
  };

  const handleDelete = ( id ) => {
    firestore.doc(`posts/${ id }`).delete();
  };

  const handleAvatar = (e) => {
    e.preventDefault();
		navigate( "/profile" );
  };

  // console.log({ ...post });
  
  return (
    <section className="user-feed">

      <header>
        {user && 
          <Avatar src={ user.photoURL } handle={ handleAvatar } />
        }

        <div>
          <img src={ image(`./dev-united-logo.svg`).default } alt='logo' />
          <img src={ image(`./dev-united-naming.svg`).default } alt='naming' />
        </div>
      </header>

      <main>

        <section>
          <TextInput 
            handle={ handleInput }
            placeholder="What’s happening?"
            value={ post.message }
          />

          <p>CARACTERES UTILIZADOS / 200 max.</p>
          <Button cta={ cta.post } handle={ handleButton } />
        </section>
        
        <section>
          {postsList.map((post)=> (
              <PostContent 
                key={ post.id } 
                nickname={ post.nickname }
                message={ post.message } 
                src={ post.photo }
                date={ post.date }
                like={ post.like }
                counterLikes={ post.counterLikes }
                handle={ handleDelete }
                postId={ post.id }
              />
          ))}
        </section>

      </main>

    </section>
  );
}

export default UserFeed;