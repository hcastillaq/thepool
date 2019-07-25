/* Imports de react para SSR */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

/* Import del Html a servir */
import Html from './../Html';

/* Componente Princial */
import App from './../../shared/App';

/* Imports Material UI for SSR */
// import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';

/* Custom Theme*/
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

	// const sheets = new ServerStyleSheets();
	
	/* Retorna un string necesario para SSR */
	// const html = await renderToString(
	// 	sheets.collect(
	// 		<ThemeProvider theme={CustomTheme} >
	// 			<StaticRouter location={uri} context={context}>
	// 				<App />
	// 			</StaticRouter>
	// 		</ThemeProvider>
	// 	)
	// );

	const html = await renderToString(
		<StaticRouter location={uri} context={context}>
			<App />
		</StaticRouter>
	);

	/* Obtiene el string necesario para los estilos - Material ui*/
	// const css = sheets.toString();
	const css = "";

	/* Fianl store para el client */
	const finalState = store.getState();


	/* Contiene los parametros necesarios para el html a servir */
	let obj = {
		title: 'Server test',
		body: html,
		css: css,
		store: finalState,
	}

	return h.response(Html(obj));
}

export default Server.route({
	method: 'GET',
	path: "/{path*}",
	handler: RootRoute
});