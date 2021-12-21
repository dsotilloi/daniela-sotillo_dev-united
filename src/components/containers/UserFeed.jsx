import React, { useContext } from "react";
import { firestore } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../hooks/context/AppContext";
import { cta } from "../../helpers/button-cta";

import Avatar from "../presentational/Avatar";
import Button from "../presentational/Button";
import PostContent from "../presentational/PostContent";
import TextInput from "../presentational/TextInput";

function UserFeed() {

  const image = require.context('../../assets/images', true);
  const navigate = useNavigate();

  const { 
    author, 
    color,
    post, 
    postsList,
    setPost, 
    user
  } = useContext(AppContext);

  const handleInput = (e) => {
    const newPost = {
      message: e.target.value, 
      date: new Date(), 
      like: 0, 
      counterLikes: 0, 
      id: ""
    }
    setPost( newPost );
  };
  
  const avatarProfile = (e) => {
    e.preventDefault();
    navigate( "/profile" );
  };

  const addPost = () => {
		firestore.collection( "posts" ).add({ ...author, ...color, ...post });
  };

  const deletePost = ( id ) => {
    firestore.doc(`posts/${ id }`).delete();
  };

  const likePost = ( id, like) => {
    firestore.doc(`posts/${ id }`).update({
      like: like + 1
    });
  };

  const unlikePost = ( id, like) => {
    firestore.doc(`posts/${ id }`).update({
      like: like - 1
    });
  };

  console.log(user);
  
  return (
    <section className="user-feed">

      <header>
        {user && 
          <Avatar src={ user.photoURL } handle={ avatarProfile } />
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
          <Button cta={ cta.post } handle={ addPost } />
        </section>
        
        <section>
          {postsList.map((post)=> (
            <PostContent 
              counterLikes={ post.counterLikes }
              date={ post.date }
              handleDelete={ deletePost }
              key={ post.id } 
              like={ post.like }
              message={ post.message } 
              nickname={ post.nickname }
              postId={ post.id }
              src={ post.photo }
              handleLike={ likePost }
              handleUnlike={ unlikePost }
            />
          ))}
        </section>

      </main>

    </section>
  );
}

export default UserFeed;