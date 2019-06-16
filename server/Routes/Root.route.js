/* Imports de react para SSR */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

/* Import del Html a servir */
import Html from './../Html';

/* Componente Princial */
import App from './../../src/shared/App';

/* Imports Material UI for SSR */
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';

/* Custom Theme*/
import CustomTheme from './../../src/theme/theme';

/* Import Server*/
import Server from './../Server';

/* Store */
import { QueryAction } from '../../src/store/actions/query.actions';
import store from './../../src/store/root.store';
import Axios from 'axios';
import { AddPublicationsAction } from '../../src/store/actions/publication.action';


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

	let match = uri.match(/^\/q\/[^]+$/);
	let query = uri.split('/q/')[1];
	
	/* Contexto general a pasar*/
	const context = {};

	/* Data inicial - Publicaciones */
	let data = [];

	/* Nos permite insetar los estilos de material ui */
	const sheets = new ServerStyleSheets();

	/* Store config initial state */
	store.dispatch( QueryAction( '¿work?' ) );
	
	const publicationsResult = await Axios.post( 'http://localhost:8000/api/posts/query', {query} )
		.then( resp => ( resp.data.results ) );

	store.dispatch( AddPublicationsAction( publicationsResult ) );
	
	/* Retorna un string necesario para SSR */
	const html = renderToString(
		sheets.collect(
			<ThemeProvider theme={CustomTheme} >
				<StaticRouter location={uri} context={context}>
					<App initialData={data} />
				</StaticRouter>
			</ThemeProvider>
		)
	);

	/* Obtiene el string necesario para los estilos - Material ui*/
	const css = sheets.toString();

	const finalState = store.getState();
	/* Contiene los parametros necesarios para el html a servir */
	let obj = {
		title: 'Server test',
		body: html,
		initialData: data,
		css: css,
		store: finalState
	}
	return h.response(Html(obj));
}

export default Server.route({
	method: 'GET',
	path: "/{path*}",
	handler: RootRoute
});