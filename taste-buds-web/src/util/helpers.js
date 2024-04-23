export const not = (a, b) => {
	return a.filter((value) => b.indexOf(value) === -1);
};

export const intersection = (a, b) => {
	return a.filter((value) => b.indexOf(value) !== -1);
};
