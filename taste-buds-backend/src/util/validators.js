const isEmpty = (string) => {
	if (string?.trim() === '') return true;
	else return false;
};

const isEmail = (email) => {
	const regEx =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email?.match(regEx)) return true;
	else return false;
};

const isPhone = (data) => {
	const regEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
	if (data?.match(regEx)) return true;
	else return false;
};

exports.validateRegistration = (data) => {
	let errors = {};

	if (isEmpty(data?.handle)) errors.handle = 'Must not be empty!';
	if (isEmpty(data?.email)) {
		errors.email = 'Must not be empty!';
	} else if (!isEmail(data?.email)) {
		errors.email = 'Must be a valid email address!';
	}
	if (isEmpty(data?.password)) errors.password = 'Must not be empty!';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};

exports.validateLogin = (data) => {
	let errors = {};

	if (isEmpty(data?.login)) errors.login = 'Must not be empty!';
	if (isEmpty(data?.password)) errors.password = 'Must not be empty!';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};

exports.validateProfile = (data) => {
	let errors = {};

	if (isEmpty(data?.firstName)) errors.firstName = 'Must not be empty!';
	if (isEmpty(data?.lastName)) errors.lastName = 'Must not be empty!';
	if (isEmpty(data?.dob?.day)) errors.day = 'Must not be empty!';
	if (isEmpty(data?.dob?.month)) errors.month = 'Must not be empty!';
	if (isEmpty(data?.dob?.year)) errors.year = 'Must not be empty!';
	if (isEmpty(data?.genderIdentity)) errors.identity = 'Must not be empty!';
	if (isEmpty(data?.genderInterest)) errors.interest = 'Must not be empty!';
	if (isEmpty(data?.location?.city)) errors.city = 'Must not be empty!';
	if (isEmpty(data?.location?.state)) errors.stats = 'Must not be empty!';
	if (isEmpty(data?.location?.postalCode))
		errors.postalCode = 'Must not be empty!';
	if (isEmpty(data?.dietType)) errors.diet = 'Must not be empty!';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};

exports.validateCreateChat = (data) => {
	let errors = {};

	if (!data.users || data.users.length === 0)
		errors.users = "Can't start a chat without recipients!";

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};

exports.validateMessage = (data) => {
	let errors = {};

	if (!data.content || !data.chatId)
		errors.message = 'Invalid data passed to request';
	if (isEmpty(data?.content)) errors.content = 'Must not be empty!';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};
