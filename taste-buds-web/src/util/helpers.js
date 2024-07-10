export const not = (a, b) => {
	return a.filter((value) => b.indexOf(value) === -1);
};

export const intersection = (a, b) => {
	return a.filter((value) => b.indexOf(value) !== -1);
};

export const getChatName = (user, chatData) => {
	let chatName = chatData.chatName;

	if (!chatName) {
		const users = chatData.users.filter((item) => item._id !== user);
		let namesArray = users.map((user) => user.firstName + ' ' + user.lastName);
		chatName = namesArray.join(', ');
	}

	return chatName;
};

const getUserChatImage = (user) => {
	if (!user || !user.profilePhoto) {
		return alert('User passed into function is invalid!');
	}

	return { userImg: user.profilePhoto };
};

export const getChatImages = (user, chatData) => {
	const users = chatData.users.filter((item) => item._id !== user);
	let chatImage = [];
	chatImage?.push(getUserChatImage(users[0]));
	let groupChatClass = '';

	if (users.length > 1) {
		groupChatClass = 'group-chat-image';
		chatImage.push(getUserChatImage(users[1]));
	}

	return { ...(groupChatClass && { groupChatClass }), chatImage };
};
