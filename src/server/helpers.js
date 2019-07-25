import store from "../store/root.store";
import { QueryAction } from "./../store/actions/query.actions";
import { AddPublicationsAction } from "./../store/actions/publication.action";
import Axios from "axios";

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

				Axios.post( 'http://localhost:8000/api/posts/query', { query } )
					.then(
						resp=>
						{
							store.dispatch( AddPublicationsAction( resp.data.results ) );
							store.dispatch( QueryAction(query) );
							resolve();
						}
					)
			}else{
				resolve();

			}
		}
	)
}

/* 
	const publicationsResult = await Axios.post( 'http://localhost:8000/api/posts/query', { query } )
		.then( resp => ( resp.data.results ) );
	store.dispatch( AddPublicationsAction( publicationsResult ) );
	*/