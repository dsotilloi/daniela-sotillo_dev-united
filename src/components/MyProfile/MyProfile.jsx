import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { cta } from '../../helpers/button-cta';
import { sortPostsList } from '../../helpers/sortPostsList';

import Button from '../Button/Button';
import HeaderProfile from '../HeaderProfile/HeaderProfile';
import PostContent from '../PostContent/PostContent';

import './myProfile.css';

function MyProfile() {

  const { user, postsList, loggedUsers } = useContext( AppContext );
	const [ showFavPosts, setShowFavPosts ] = useState( false );
  const [ showUserPosts, setShowUserPosts ] = useState( true );

  //Obtiene la informacion la foto y el nickname del usuario logueado:
  const infoUser = loggedUsers.filter(( logged ) => logged.uid === user.uid).map(( user ) => {
    return {
      nickname: user.nickname,
      photo: user.photo,
      color: user.color
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

  //Manejan el estado "showUserPosts" y "showFavPosts":
  const viewUserPosts = () => {
    setShowUserPosts( true );
		setShowFavPosts( false );
  };

  const viewFavPosts = () => {
    setShowUserPosts( false );
		setShowFavPosts( true );
  };

	//Css de los botones "Posts" y "Favorites":
	const cssPostBtn = showUserPosts ? 'showPosts' : 'unshowPosts';
	const cssFavBtn = showFavPosts ? 'showPosts' : 'unshowPosts';

  //Ordena lista de post según la fecha de publicación:
  sortPostsList( postsList );

  return (
    <>
      {infoUser.map(( info ) => 
        <HeaderProfile 
          color={ info.color }
          cta={ cta.logout } 
          key={ info.nickname }
          nickname={ info.nickname } 
          src={ info.photo } 
        />
      )}

      <main>
        <section className='profile-filters__btn'>
          <Button 
						classNameBtn={`button_profile ${ cssPostBtn }`}
						cta={ cta.posts } 
						handle={ viewUserPosts } 
					/>
          <Button 
						classNameBtn={ `button_profile ${ cssFavBtn }`}
						cta={ cta.favorites } 
						handle={ viewFavPosts } 
					/>
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

export default MyProfile;