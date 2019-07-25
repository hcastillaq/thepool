import Hapi from '@hapi/hapi';
const Server = Hapi.server({
	port: 4000,
	host: 'localhost',
	compression: { minBytes: 1 }
});

export default Server;

