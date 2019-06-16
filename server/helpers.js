import store from "../src/store/root.store";
import { QueryAction } from "../src/store/actions/query.actions";
import Axios from "axios";
import { AddPublicationsAction } from "../src/store/actions/publication.action";

/**
 * Valida que ruta ingreso el usuario
 * @param {String} uri 
 */
export function whatIsUrlPath ( uri ) 
{
	let match = uri.match(/^\/q\/[^]+$/);
	
	if( match  != null){
		return 'QUERY'
	}

	return false;
}

/**
 * Retorna el parametro de busqueda ingresado por el usuario
 * @param {String} uri 
 */
export function getQueryfromUri( uri )
{
	let query = uri.split('/q/')[1];
	return query;
}

/**
 * Funcion que se encarga de ejucutar todos los escripts necesarios
 * en el SSR, esta apoyada por otras funciones, tambien hace las
 * consultas necesarias para los datos iniciales del store
 * @param {String} uri  url consultada por el usuario
 */
export function loadFunctionsPathUri( uri )
{
	return new Promise( 
		resolve => 
		{
			let whatUri = whatIsUrlPath( uri );
			if( whatUri == "QUERY")
			{	
				/* Obtenemos la query y la enviamos al estado del store */
				let query = getQueryfromUri( uri ).replace(/%20/g, ' ');
				store.dispatch( QueryAction( query ) );

				Axios.post( 'http://localhost:8000/api/posts/query', { query } )
					.then(
						resp=>
						{
							store.dispatch( AddPublicationsAction( resp.data.results ) );
							resolve();
						}
					)
			}
		}
	)
}

/* 
	const publicationsResult = await Axios.post( 'http://localhost:8000/api/posts/query', { query } )
		.then( resp => ( resp.data.results ) );
	store.dispatch( AddPublicationsAction( publicationsResult ) );
	*/