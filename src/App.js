import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Imessage from './Components/Imessage';
import Login from './Components/Login';
import { selectUser, login, logout } from './features/userSlice';
import { auth } from './firebase';

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//  user is logged in
				dispatch(
					login({
						uid: authUser.uid,
						photo: authUser.photoURL,
						email: authUser.email,
						displayName: authUser.displayName,
					})
				);
			} else {
				// user is Loggd out
				dispatch(logout());
			}
		});
	}, []);

	return <div className='app'>{user ? <Imessage /> : <Login />}</div>;
}

export default App;
