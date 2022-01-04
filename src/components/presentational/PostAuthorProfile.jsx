import React, { useContext } from 'react';
import { AppContext } from '../../hooks/context/AppContext';
import { sortPostsList } from '../../helpers/sortPostsList';
import { useParams } from 'react-router-dom';

import HeaderProfile from './HeaderProfile';
import PostContent from '../containers/PostContent';

function PostAuthorProfile() {

	const { postsList, loggedUsers } = useContext( AppContext );
	const { authorUid } = useParams();

	//Obtiene la informacion la foto y el nickname del autor del post:
	const infoUser = loggedUsers.filter(( logged ) => logged.uid === authorUid).map(( logged ) => {
		return {
		nickname: logged.nickname,
		photo: logged.photo
		}
	});

	//Filtra la lista de los posts y devuelve solo los que corresponden al autor:
	const filteredList = postsList.filter(( post ) => post.authorUid === authorUid);

	//Ordena lista de post según la fecha de publicación:
	sortPostsList( postsList );

	return (
		<div>
      {infoUser.map(( info ) => 
        <HeaderProfile 
          key={ info.nickname }
          nickname={ info.nickname } 
          src={ info.photo } 
        />
      )}

			{filteredList.map((post)=> (
				<PostContent 
					authorUid={ post.authorUid }
					key={ post.id } 
					message={ post.message } 
					nickname={ post.authorNickname }
					photo={ post.authorPhoto}
					postId={ post.id }
				/>
			))}

		</div>
	)
}

export default PostAuthorProfile;




