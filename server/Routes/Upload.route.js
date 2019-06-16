import Server from './../Server.js';

import fs from 'fs';
import Path from 'path';

/* Subir imagenes */
Server.route({
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