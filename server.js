import Hapi from 'hapi';
import Inert from 'inert';
import fs from 'fs';
import Path from 'path';
import Html from './src/server/Html';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import App from './src/shared/App';

class Test extends React.Component{
  render(){
    return <h1>Work ???</h1>
  }
}
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

server.route({
  method:'GET',
  path:"/{path*}",
  handler: (request, h) =>{
    let uri = request.path;
    const context = {};
    const html = renderToString(
      <StaticRouter location="/" context={context}>
        <App />
      </StaticRouter>,
    );

    let obj = {
      title: 'Server test',
      body: html
    }
    return Html(obj);
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