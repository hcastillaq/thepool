import { QueryTypes, PublicationsTypes } from '../types/types';
import INITIALSTATE from './../models/initialstate.modes';



export function RootReducer(state = INITIALSTATE, action : any) {
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
		case PublicationsTypes.LOADING_PLUBLICATIONS:
			return {
				...state,
				loadingPublications: action.payload
			}
		default:
			return state;
	}
}

