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

export const capitalizeFirstLetterOfEachWord = (string) => {
	return string
		?.split(' ')
		.map((word) => {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(' ');
};

export const shuffleArray = (array) => {
	let newArray = array?.slice();

	for (let i = newArray?.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}

	return newArray;
};
