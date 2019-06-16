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

/**
 * Ruta principal de la aplicacion, esta se encarda de retonar
 * un html con todo los datos precargados para despues hidratarlos 
 * con el jaascript del cliente
 * @param {*} request 
 * @param {*} h 
 */


const RootRoute = async (request, h) => {
	/* Obtiene la ruta solicitada */
	let uri = request.path;

	/* Contexto general a pasar*/
	const context = {};

	/* Data inicial - Publicaciones */
	let data = [];

	/* Nos permite insetar los estilos de material ui */
	const sheets = new ServerStyleSheets();

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

	/* Contiene los parametros necesarios para el html a servir */
	let obj = {
		title: 'Server test',
		body: html,
		initialData: data,
		css: css
	}

	return h.response(Html(obj));
}

 
export default Server.route({
	method: 'GET',
	path: "/{path*}",
	handler: RootRoute
});