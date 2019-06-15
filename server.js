/* Imports para Hapi */
import Hapi from 'hapi';
import Inert from 'inert';

/* Imports Nativos */
import fs from 'fs';
import Path from 'path';
import 'isomorphic-fetch';

/* Import del Html a servir */
import Html from './src/server/Html';

/* Imports de react para SSR */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

/* Componente Princial */
import App from './src/shared/App';


/* Imports Material UI for SSR */
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';

/* Custom Theme*/
import CustomTheme from './src/theme/theme';


/* Sass Convert para SSR*/



/* Servidor de Hapi */
const server = Hapi.server({
	port: 4000,
	host: 'localhost',
	routes: {
		files: {
			relativeTo: Path.join(__dirname, 'public')
		}
	}
});

/* Subir imagenes */
server.route({
	method: "POST",
	path: "/post/new",
	config: {
		payload: {
			output: 'stream',
			parse: true,
			allow: 'multipart/form-data'
		}
	},
	handler: (request, h) => {
		let data = request.payload;
		if (data.file) {
			let name = data.file.hapi.filename;
			let path = __dirname + '/public/uploads/' + name;
			let file = fs.createWriteStream(path);
			data.file.pipe(file);
		}
		return data;
	}
});


/* Ruta que renderiza la app en react */
server.route({
	method: 'GET',
	path: "/{path*}",
	handler: (request, h) => {
		let uri = request.path;
		const context = {};

		let data = [];

		const sheets = new ServerStyleSheets();

		const html = renderToString(
			sheets.collect(
				<ThemeProvider theme={ CustomTheme } >
					<StaticRouter location={uri} context={context}>
						<App initialData={data} />
					</StaticRouter>
				</ThemeProvider>
			)
		);
		
		const css = sheets.toString();
		
		let obj = {
			title: 'Server test',
			body: html,
			initialData: data,
			css: css
		}
		return h.response( Html( obj ) );
	}
});

/* Funcion asyncrona para arrancar el servidor */
const init = async () => {
	await server.register(Inert);

	server.route({
		method: 'GET',
		path: '/static/{file*}',
		handler: function (request, h) {
			return h.file(request.params.file);
		}
	});

	await server.start();
	console.log(`Server running at: ${server.info.uri}`);
};

init();