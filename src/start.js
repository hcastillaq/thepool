import Server from './server/Server';

import './server/Router';
import path from 'path';


const init = async () => {

	await Server.register(require('@hapi/inert'));

	Server.route({
		method: 'GET',
		path: '/static/{file*}',
		handler: {
			directory: {
				path: path.join('public'),
				lookupCompressed: true,
				lookupMap:{
					gzip: '.gz',
				}
			}
		}
	});

	await Server.start();

	console.log('Server running at:', Server.info.uri);
};

init();