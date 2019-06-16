
import Inert from 'inert';

/* Import Rutas */
import './server/Router';

/* Import Servidor */
import Server from './server/Server';


/* Funcion asyncrona para arrancar el servidor */
const init = async () => {
	await Server.register(Inert);

	Server.route({
		method: 'GET',
		path: '/static/{file*}',
		handler: function (request, h) {
			return h.file(request.params.file);
		}
	});

	await Server.start();
	console.log(`Server running at: ${Server.info.uri}`);
};

init();