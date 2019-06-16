/* Imports para Hapi */
import Hapi from 'hapi';

/* Imports Nativos */
import Path from 'path';

/* Servidor de Hapi */
const Server = Hapi.server({
	port: 4000,
	host: 'localhost',
	routes: {
		files: {
			relativeTo: Path.join(__dirname, '../public')
		}
	}
});


export default Server;