import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import './css/SidebarChat.css';
import { useDispatch } from 'react-redux';
import { setChat } from '../features/chatSlice';
import db from '../firebase';
import * as timeago from 'timeago.js';
import DeleteIcon from '@material-ui/icons/Delete';

function SidebarChat({ id, chatName }) {
	const dispatch = useDispatch();
	const [chatInfo, setChatInfo] = useState([]);

	useEffect(() => {
		db.collection('chats')
			.doc(id)
			.collection('messages')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) =>
				setChatInfo(snapshot.docs.map((doc) => doc.data()))
			);
	}, [id]);

	const onDelet = (e) => {
		e.preventDefault();

		db.collection('chats')
			.doc(id)
			.delete()
			.then(function () {
				console.log('Document successfully deleted!');
			})
			.catch(function (error) {
				console.error('Error removing document: ', error);
			});
	};

	return (
		<div
			onClick={() =>
				dispatch(
					setChat({
						chatId: id,
						chatName: chatName,
					})
				)
			}
			className='sidebarChat'
		>
			<Avatar src={chatInfo[0]?.photo} />
			<div className='sidebarChat__info'>
				<h3>{chatName}</h3>
				<p>{chatInfo[0]?.message}</p>
				<small>
					{timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}
				</small>
			</div>
			<div className='sidebar__delete'>
				<IconButton>
					<DeleteIcon onClick={onDelet} />
				</IconButton>
			</div>
		</div>
	);
}

export default SidebarChat;
