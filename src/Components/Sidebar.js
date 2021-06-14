import React, { useEffect, useState } from 'react';
import './css/Sidebar.css';

// icons
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// tool tip
import Tooltip from '@material-ui/core/Tooltip';

import db, { auth } from '../firebase';

function Sidebar() {
	const user = useSelector(selectUser);

	const [chats, setChats] = useState([]);

	useEffect(() => {
		db.collection('chats').onSnapshot((snapshot) =>
			setChats(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
	}, []);

	const addChat = () => {
		const chatName = prompt('Please Enter a Chat Name');

		if (chatName) {
			db.collection('chats').add({
				chatName: chatName,
			});
		}
	};

	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<Avatar className='sidebar__avatar ' src={user.photo} />

				<div className='sidebar__input'>
					<SearchIcon />
					<input placeholder='Search' />
				</div>

				<Tooltip title='Start New Chat' arrow>
					<IconButton variant='outline' className='sidebar__inputButton'>
						<RateReviewOutlinedIcon onClick={addChat} />
					</IconButton>
				</Tooltip>

				{/* tooltip */}
				<Tooltip title='Log Out' arrow>
					<IconButton>
						<ExitToAppIcon onClick={() => auth.signOut()} />
					</IconButton>
				</Tooltip>
			</div>
			<div className='sidebar__chats'>
				{/* Destructure  */}
				{chats.map(({ id, data: { chatName } }) => (
					<SidebarChat key={id} id={id} chatName={chatName} />
				))}
			</div>
		</div>
	);
}

export default Sidebar;
