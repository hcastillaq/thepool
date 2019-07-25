/* Imports de react para SSR */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';


// import Loadable from 'react-loadable';
// import { getBundles } from 'react-loadable-ssr-addon';
// const manifest = require('./../../../public/react-loadable-ssr-addon.json');


/* Import del Html a servir */
import Html from './../Html';

/* Componente Princial */
import App from './../../shared/App';

/* Imports Material UI for SSR */
// import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
// import CustomTheme from './../../theme/theme';

/* Import Server*/
import Server from './../Server';
/* Store */
import store from './../../store/root.store';

/* Helpers */
import { loadFunctionsPathUri } from '../helpers';
;

/**
 * Ruta principal de la aplicacion, esta se encarda de retonar
 * un html con todo los datos precargados para despues hidratarlos 
 * con el javascript del cliente
 * @param {*} request 
 * @param {*} h 
 */

const RootRoute = async (request, h) => {
	/* Obtiene la ruta solicitada */
	let uri = request.path;


	await loadFunctionsPathUri(uri);

	/* Contexto general a pasar*/
	const context = {};

	
	/* Retorna un string necesario para SSR */

	// const sheets = new ServerStyleSheets();

	// const html = await renderToString(
	// 	sheets.collect(
	// 		<ThemeProvider theme={CustomTheme} >
	// 			<StaticRouter location={uri} context={context}>
	// 				<App />
	// 			</StaticRouter>
	// 		</ThemeProvider>
	// 	)
	// );

	// const modules = new Set();
	// const html = await renderToString(
	// 	<Loadable.Capture report={moduleName => modules.add(moduleName)}>
	// 		<StaticRouter location={uri} context={context}>
	// 			<App />
	// 		</StaticRouter>
	// 	</Loadable.Capture>
	// );

	const html = await renderToString(
		<StaticRouter location={uri} context={context}>
			<App />
		</StaticRouter>
	);

		const bundles =  {} //getBundles(manifest, [...manifest.entrypoints, ...Array.from(modules)]);

		const styles = bundles.css || [];
		const scripts = bundles.js || [];
	
	/* Obtiene el string necesario para los estilos - Material ui*/
	const css = "" //sheets.toString();

	/* Fianl store para el client */
	const finalState = store.getState();

	/* Contiene los parametros necesarios para el html a servir */
	let obj = {
		title: 'Server test',
		body: html,
		css: css,
		store: finalState,
		styles,
		scripts
	}

	return h.response(Html(obj));
}

export default Server.route({
	method: 'GET',
	path: "/{path*}",
	handler: RootRoute
});