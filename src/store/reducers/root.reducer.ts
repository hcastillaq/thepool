import { ADD_SEARCH_DATA, GET_ALL_PUBLICATIONS } from '../types/types';

const initialState = {
	searchResults: [],
	allPublication: []
};


export function RootReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_SEARCH_DATA:
			return {
				...state,
				searchResults: action.payload
			};
		case GET_ALL_PUBLICATIONS:
			return {
				...state,
				allPublication: action.payload
			}
		default:
			return state;
	}
}

