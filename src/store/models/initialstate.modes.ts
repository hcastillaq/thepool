import { InitialStateInterface } from './../interfaces/interfaces';

const INITIALSTATE : InitialStateInterface = {
	query: '',
	publications: [],
	publicationsLimit: [],
	lastActionType: '',
	loadingPublications: false,
	startPLimit: 0,
	endPLimit: 10
}

export default INITIALSTATE;