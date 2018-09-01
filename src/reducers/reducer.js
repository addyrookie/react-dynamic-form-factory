export const initialState = {
	config: []
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "SAVE_CONFIG":
			return Object.assign({}, state, {
				config: action.payload
			});
		case "RESET_ALL":
			return initialState;
		default:
			return state;
	}
};