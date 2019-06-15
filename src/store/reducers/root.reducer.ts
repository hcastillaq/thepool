import { QueryTypes, PublicationsTypes } from '../types/types';


interface initialState {
	query: String,
	publications: Array<Object>,
	lastActionType: String
}
interface Action {
	type: String;
	payload: any;
}

const INITIALSTATE : initialState = {
	query: '',
	publications: [],
	lastActionType: ''
}

export function RootReducer(state = INITIALSTATE, action: Action) {
	switch (action.type) {
		
		case QueryTypes.QUERY:
			return {
				...state,
				query: action.payload,
				lastActionType: QueryTypes.QUERY
			};
		
		case PublicationsTypes.ADD_PUBLICATIONS:
			return {
				...state,
				publications: action.payload,
				lastActionType: PublicationsTypes.ADD_PUBLICATIONS
			};

		default:
			return state;
	}
}

