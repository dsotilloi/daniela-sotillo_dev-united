import React, { useContext, useState } from 'react';
import { AppContext } from '../../hooks/context/AppContext';
import { Link } from 'react-router-dom';
import { cta } from '../../helpers/button-cta';
import { sortPostsList } from '../../helpers/sortPostsList';
import { firestore } from '../../firebase/firebase';

import Avatar from '../presentational/Avatar';
import Button from '../presentational/Button';
import PostContent from './PostContent';
import TextInput from '../presentational/TextInput';

function Feed() {

	const { user, postsList, loggedUsers } = useContext( AppContext );
	const [ message, setMessage ] = useState("");
	const image = require.context( '../../assets/images', true );

	//Maneja el input para capturar el mensaje del usuario:
	const getMessage = ( e ) => {
		setMessage( e.target.value );
	};

	const addPost = () => {
		const authorPref = loggedUsers.filter(( logged ) => logged.uid === user.uid );
		authorPref.map(( author ) => (
			firestore.collection( 'posts' ).add({
				authorColor: author.color,
				authorNickname: author.nickname,
				authorPhoto: author.photo,
				authorUid: author.uid,
				date: new Date(),
				likes: [],
				message: message
			})
		));
		setMessage('');
	};
	
  //Ordena lista de post según la fecha de publicación:
  sortPostsList( postsList );

    return (
      <>
      	<header>
					{user && 
						<Link to={ '/profile' }>
							<Avatar src={ user.photoURL } />
						</Link>
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
							placeholder='What’s happening?'
							value={ message }
						/>

						<p>CARACTERES UTILIZADOS / 200 max.</p>
						<Button cta={ cta.post } handle={ addPost } />
					</section>

					<section>
						{postsList.map(( post )=> (
							<PostContent 
								authorUid={ post.authorUid }
								key={ post.id } 
								message={ post.message } 
								nickname={ post.authorNickname }
								photo={ post.authorPhoto}
								postId={ post.id }
							/>
						))}
					</section>
				</main>
      </>
    );
  }
  
  export default Feed;