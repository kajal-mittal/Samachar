import axios from 'axios';

export const setTopNews = params => {
	return {
		type: 'API_CALL_REQUEST',
		params
	};
};

module.exports = {
	setTopNews
};
