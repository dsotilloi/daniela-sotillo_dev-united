import React, { useState, useEffect, createContext } from "react";
import { auth, firestore, loginConGoogle, logout } from "../../firebase/firebase";

export const AppContext = createContext();

function AppProvider({ children }) {

	const [ loggedUser, setLoggetUser ] = useState([]);
	const [ postsList, setPostsList ] = useState([]);
	const [ user, setUser ] = useState(null);
	
	useEffect(() => {

		if ( user ) {
			const unsubscribeUser = firestore
				.collection( 'users' )
				.onSnapshot(( snapshot ) => {
					const user = snapshot.docs.map((doc) => {
						return {
							color: doc.data().color,
							email: doc.data().email,
							name: doc.data().name,
							nickname: doc.data().nickname,
							photo: doc.data().photo,
							uid: doc.id
						};
					});
					setLoggetUser( user );
				});

				const unsubscribePosts = firestore
				.collection( 'posts' )
				.onSnapshot(( snapshot ) => {
					const post = snapshot.docs.map((doc) => {
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

			return () => {
				unsubscribeUser();
				unsubscribePosts();
			}
		};

		auth.onAuthStateChanged(( user ) => {
			setUser(user);
		});
			
	}, [user]);

	return (
		<AppContext.Provider
			value={{ 
				loggedUser,
				loginConGoogle, 
				logout, 
				postsList, 
				setPostsList,
				user
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export default AppProvider;