import { QueryTypes, PublicationsTypes } from '../types/types';
import INITIALSTATE from './../models/initialstate.modes';

export function RootReducer(state = INITIALSTATE, action : any) {
	state.lastActionType = 	action.type;
	switch (action.type) {
		
		case QueryTypes.QUERY:
			return {
				...state,
				query: action.payload,
			};
		
		case PublicationsTypes.ADD_PUBLICATIONS:
			return {
				...state,
				publications: action.payload,
			};
		case PublicationsTypes.LOADING_PLUBLICATIONS:
			return {
				...state,
			}
		case PublicationsTypes.CHANGE_PAGE_NUMBER:
			return {
				...state,
				pageNumber: action.payload
			}
		default:
			return state;
	}
}

