import { QueryTypes, PublicationsTypes } from '../types/types';


interface initialState {
	query: String,
	publications: Array<Object>
}
interface Action {
	type: String;
	payload: any;
}

const INITIALSTATE : initialState = {
	query: '',
	publications: []
}

export function RootReducer(state = INITIALSTATE, action: Action) {
	switch (action.type) {
		
		case QueryTypes.QUERY:
			return {
				...state,
				query: action.payload
			};
		
		case PublicationsTypes.ADD_PUBLICATIONS:
			return {
				...state,
				publications: action.payload
			};

		default:
			return state;
	}
}

