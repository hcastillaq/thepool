import { InitialStateInterface } from './../interfaces/interfaces';

const INITIALSTATE : InitialStateInterface = {
	query: '',
	publications: [],
	lastActionType: '',
	loadingPublications: false,
	pageFactor: 10,
	pageNumber: 1
}

export default INITIALSTATE;