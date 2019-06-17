import Server from './server/Server';

import './server/Router';

const init = async () => {

	await Server.register(require('@hapi/inert'));

	Server.route({
		method: 'GET',
		path: '/static/{file*}',
		handler: {
			directory: {
				path: './public',
				listing: false,
				index: true
			}
		}
	});

	await Server.start();

	console.log('Server running at:', Server.info.uri);
};

init();