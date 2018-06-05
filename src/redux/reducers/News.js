const INITIAL_STATE = {
	articles: [{ title: 'data' }],
	showApiData: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'API_CALL_SUCCESS':
			return {
				...state,
				showApiData: true,
				articles: action.response.data.articles
			};

		default:
			return state;
	}
};
