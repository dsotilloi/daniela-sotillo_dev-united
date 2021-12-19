import React, { useState, useEffect, createContext } from "react";
import { auth, firestore, loginConGoogle, logout } from "../../firebase/firebase";

export const AppContext = createContext();

function AppProvider({ children }) {

	const [ user, setUser ] = useState(null);
	const [ postsList, setPostsList ] = useState([]);
	
	const [ color, setColor ] = useState({ 
		color: "", 
		selected: false 
	}) 
	
	const [ author, setAuthor ] = useState({ 
		nickname: "", 
		uid: "", 
		photo: "" 
	})
	
	const [ post, setPost ] = useState({ 
		message: "", 
		date: "", 
		like: "", 
		counterLikes: "", 
		id: "" 
	 })
	
	useEffect(() => {

		const unsubscribe = firestore
			.collection( "posts" )
			.onSnapshot(( snapshot ) => {
				const newPostContent = snapshot.docs.map((doc) => {
					return {
						color: doc.data().color,
						counterLikes: doc.data().counterLikes,
						date: doc.data().date,
						id: doc.id,
						like: doc.data().like,
						message: doc.data().message,
						nickname: doc.data().nickname,
						photo: doc.data().photo,
						selected: doc.data().selected,
						uid: doc.data().uid
					};
				});

				setPostsList( newPostContent );
			});

			auth.onAuthStateChanged(( user ) => {
				setUser(user);
			});

			return () => unsubscribe();
	}, [])
	
	return (
		<AppContext.Provider
			value={{ 
				user, 
				loginConGoogle, 
				logout, 
				postsList, 
				setPostsList,
				color, 
				setColor,
				author, 
				setAuthor,
				post, 
				setPost
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export default AppProvider;