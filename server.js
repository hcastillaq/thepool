import Hapi from 'hapi';
import Inert from 'inert';
import fs from 'fs';
import Path from 'path';
import Html from './src/server/Html';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './src/shared/App';
import 'isomorphic-fetch';

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
  path:"/post/new",
  config:{
    payload:{
      output: 'stream',
      parse: true,
      allow: 'multipart/form-data'
    }
  },
  handler: (request, h)=>{
    let data = request.payload;
    if(data.file)
    {
      let name = data.file.hapi.filename;
      let path = __dirname + '/public/uploads/'+ name;
      let file = fs.createWriteStream(path);
      data.file.pipe(file);
    }
    return data;
  }
});

server.route({
  method:"POST",
  path:'/hola',
  handler: (request, h)=>{
    return 'work';
  }
});

/* Ruta que renderiza la app en react */
server.route({
  method:'GET',
  path:"/{path*}",
  handler: (request, h) =>{
    let uri = request.path;
    const context = {};
    
    let data = [];

    const html = renderToString(
      <StaticRouter location={uri} context={context}>
        <App initialData={data}/>
      </StaticRouter>,
    );

    let obj = {
      title: 'Server test',
      body: html,
      initialData: data
    }
    return h.response(Html(obj));
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