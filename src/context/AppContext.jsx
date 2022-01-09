import React, { useState, useEffect, createContext } from "react";
import { auth, firestore } from "../firebase/firebase";

export const AppContext = createContext();

function AppProvider({ children }) {

	const [ isLoading, setIsLoading ] = useState( true );
	const [ loggedUsers, setLoggetUsers ] = useState( [] );
	const [ postsList, setPostsList ] = useState( [] );
	const [ user, setUser ] = useState( null );
	
	useEffect(() => {

		//Si el usuario esta logueado, actualiza el estado "loggedUsers" y "postsList"
		//con la información de Firebase:
		if ( user ) {
			const unsubscribeUser = firestore
				.collection( 'users' )
				.onSnapshot(( snapshot ) => {
				const user = snapshot.docs.map(( doc ) => {
					return {
						color: doc.data().color,
						email: doc.data().email,
						name: doc.data().name,
						nickname: doc.data().nickname,
						photo: doc.data().photo,
						uid: doc.id
					};
				});
				setLoggetUsers( user );
			});

			const unsubscribePosts = firestore
			.collection( 'posts' )
			.onSnapshot(( snapshot ) => {
				const post = snapshot.docs.map(( doc ) => {
					return {
						authorColor: doc.data().authorColor,
						authorNickname: doc.data().authorNickname,
						authorPhoto: doc.data().authorPhoto,
						authorUid: doc.data().authorUid,
						date: doc.data().date,
						id: doc.id,
						likes: doc.data().likes,
						message: doc.data().message
					};
				});
				setPostsList( post );
			});

			setIsLoading( false );
			
			return () => {
				unsubscribeUser();
				unsubscribePosts();
			}
		};
		
		//Actualzia el estado "user" cuando con la información del
		//usuario logueado:
		auth.onAuthStateChanged(( user ) => {
			setUser( user );
		});
		
	}, [ user ]);
	
	return (
		<AppContext.Provider
			value={{ 
				isLoading,
				loggedUsers,
				postsList, 
				setPostsList,
				user
			}}
		>
			{ children }
		</AppContext.Provider>
	);
}

export default AppProvider;