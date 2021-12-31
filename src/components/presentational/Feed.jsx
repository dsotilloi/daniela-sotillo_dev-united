import React, { useContext } from "react";
import { AppContext } from "../../hooks/context/AppContext";
import { cta } from "../../helpers/button-cta";
import { sortPostsList } from "../../helpers/sortPostsList";

import Avatar from "./Avatar";
import Button from "./Button";
import PostContent from "./PostContent";
import TextInput from "./TextInput";

function Feed({ 
  addPost, 
  deletePost, 
  getMessage, 
  goToProfile, 
  likePost, 
  message,
  unlikePost 
 }) {
  
  const { postsList, user } = useContext(AppContext);
  const image = require.context('../../assets/images', true);

  //Ordena lista de post según la fecha de publicación:
  sortPostsList( postsList );

  return (
    <section className="user-feed">

      <header>

        {user && 
          <Avatar src={ user.photoURL } handle={ goToProfile } />
        }

        <div>
          <img src={ image(`./dev-united-logo.svg`).default } alt='logo' />
          <img src={ image(`./dev-united-naming.svg`).default } alt='naming' />
        </div>
      </header>

      <main>

        <section>
          <TextInput 
            handle={ getMessage }
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
              likePost={ likePost }
              unlikePost={ unlikePost }
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