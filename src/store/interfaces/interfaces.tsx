export interface ActionInterface {
	type: String;
	payload: any;
}

export interface InitialStateInterface {
	query: String,
	publications: Array<Object>,
	lastActionType: String,
	loadingPublications: Boolean
	publicationsLimit: Array<Object>,
	startPLimit: Number,
	endPLimit: Number,
}