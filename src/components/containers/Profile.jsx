import React, { useContext } from "react";
import { AppContext } from "../../hooks/context/AppContext";
import { cta } from "../../helpers/button-cta";
import { sortPostsList } from "../../helpers/sortPostsList";


import HeaderProfile from "../presentational/HeaderProfile";
import Button from "../presentational/Button";
import PostContent from "../presentational/PostContent";


function Profile() {

  // const image = require.context( '../../assets/images', true );
  const { user, logout, postsList } = useContext( AppContext );

  const showUserPosts = () => {
    const filterPosts = postsList.filter(( post ) => post.authorUid === user.uid);
    console.log(filterPosts);
  }

  //Ordena lista de post según la fecha de publicación:
  sortPostsList( postsList );

  return (
    <>
      {user && 
        <HeaderProfile 
        cta={ cta.logout } 
        src={ user.photoURL } 
        // nickname={  } 
        handle={ logout } />
      }

      <main>

        <section>
          <Button cta={cta.posts} handle={ showUserPosts } />
          <Button cta={cta.favorites}/>
        </section>

        {postsList.map((post)=> (
            <PostContent 
              authorUid={ post.authorUid }
              key={ post.id } 
              message={ post.message } 
              nickname={ post.authorNickname }
              photo={ post.authorPhoto}
              postId={ post.id }
            />
          ))}

      </main>

    </>
  );
}

export default Profile;