import React, { useContext, useState } from 'react';
import { AppContext } from '../../hooks/context/AppContext';
import { cta } from '../../helpers/button-cta';
import { sortPostsList } from '../../helpers/sortPostsList';

import Button from '../presentational/Button';
import HeaderProfile from '../presentational/HeaderProfile';
import PostContent from './PostContent';


function Profile() {

  const { user, postsList, loggedUsers } = useContext( AppContext );
  const [ showUserPosts, setUserShowPosts ] = useState( true );
  
  //Obtiene la informacion la foto y el nickname del usuario logueado:
  const infoUser = loggedUsers.filter(( logged ) => logged.uid === user.uid).map(( logged ) => {
    return {
      nickname: logged.nickname,
      photo: logged.photo,
      color: logged.color
    }
  });
  
  //Filtra la lista de posts hechos por el usuario logueado, si "showUserPosts" es true.
  //Si es false, el filtro devuelve los post favoritos del usuario:
  let filteredList = [];

  if( showUserPosts ) {
    filteredList = postsList.filter(( post ) => post.authorUid === user.uid);
  }else{
    filteredList = postsList.filter((post) => post.likes.find(( uidLike ) => user.uid === uidLike));
  };

  //Manejan el estado "showUserPosts":
  const viewUserPosts = () => {
    setUserShowPosts( true );
  };

  const viewFavPosts = () => {
    setUserShowPosts( false );
  };

  //Ordena lista de post según la fecha de publicación:
  sortPostsList( postsList );

  return (
    <>
      {infoUser.map(( info ) => 
        <HeaderProfile 
          cta={ cta.logout } 
          key={ info.nickname }
          nickname={ info.nickname } 
          src={ info.photo } 
        />
      )}

      <main>
        <section>
          <Button cta={ cta.posts } handle={ viewUserPosts } />
          <Button cta={ cta.favorites } handle={ viewFavPosts }/>
        </section>

          {filteredList.map(( post )=> (
            <PostContent 
              authorUid={ post.authorUid }
              color={ post.authorColor }
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