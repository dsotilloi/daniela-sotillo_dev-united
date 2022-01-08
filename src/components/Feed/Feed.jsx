import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { cta } from '../../helpers/button-cta';
import { firestore } from '../../firebase/firebase';
import { sortPostsList } from '../../helpers/sortPostsList';

import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import PostContent from '../PostContent/PostContent';

import './feed.css'

function Feed() {

	const { user, postsList, loggedUsers } = useContext( AppContext );
	const [ message, setMessage ] = useState("");

  //Obtiene el color y la foto del usuario logueado:
  const infoUser = loggedUsers.filter(( logged ) => logged.uid === user.uid).map(( user ) => {
    return {
      color: user.color,
			photo: user.photo
    }
  });

	//Maneja el input para capturar el mensaje del usuario:
	const getMessage = ( e ) => {
		setMessage( e.target.value );
	};

	//Agrega el post del usuario a Firebase con un ID random:
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
			<header className='feed__header'>
				<Link to={ '/profile' }>
					{infoUser.map(( info )=> (
						<Avatar 
							src={ info.photo }
							borderColor={ info.color } 
							classNameImg='avatar__feed'
							key={ info.photo }
						/>
					))}
				</Link>

				<Logo 
					classNameContainer='logo__horizontal'
					classNameLogo='logo__horizontal-logotype'
					classNameNaming='logo__horizontal-naming'
				/>
			</header>

			<main>
				<section className='feed__main-section'>
					{infoUser.map(( info )=> (
						<Avatar 
							src={ info.photo }
							classNameImg='avatar__feed-input'
							key={ info.photo }
						/>
					))}

					<div className='feed__main-div'>
						<textarea 
							className='feed__main-textarea' 
							maxLength='200'
							onChange={ getMessage } 
							placeholder='What’s happening?'
							value={ message }
						>
						</textarea>

						<div className='feed__main-counter'>
							<div style={{ width: `${ message.length/2 }%` }} className='feed__main-progressBar'></div>
							<p className='feed__main-count'>
								<span>{ message.length }</span>
								<span>200 max.</span>
							</p>
						</div>

						<Button 
							classNameBtn={ 'button_post' }
							cta={ cta.post } 
							handle={ addPost } 
						/>
						</div>
				</section>

				{postsList.map(( post )=> (
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
  
export default Feed;