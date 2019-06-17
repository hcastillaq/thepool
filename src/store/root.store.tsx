import { createStore } from 'redux';
import { RootReducer } from './reducers/root.reducer';
import INITIALSTATE from './models/initialstate.modes';
import { devToolsEnhancer } from 'redux-devtools-extension';

declare global {
	interface Window  
	{ 
		__PRELOADED_STATE__ ?: any, 
		__REDUX_DEVTOOLS_EXTENSION__? : any, 
	}
}

let prelaoadState : any;

if ( typeof( window ) == "undefined" )
{
	prelaoadState = INITIALSTATE;
}else
{
	prelaoadState = window.__PRELOADED_STATE__;
	delete window.__PRELOADED_STATE__;
}

const store = createStore(
	RootReducer,
	prelaoadState,
	devToolsEnhancer( { } )
);

export default store;
