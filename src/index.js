import './sass/app.sass';

import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import App from './shared/App';

// Loadable.preloadReady().then(() => {
// 	hydrate(
// 		<BrowserRouter>
// 			<App/>
// 		</BrowserRouter>,
// 		document.getElementById('root'),
// 	);
// });

hydrate(
	<BrowserRouter>
		<App/>
	</BrowserRouter>,
	document.getElementById('root')
);