

import AjaxService from './ajax.service';
import { AddPublicationsAction } from './../store/actions/publication.action';
import store from './../store/root.store';

let _publicationService : PublicationService;

/**
 * Servicio que contiene 
 * todas las interacciones de las publicaciones
 */
class PublicationService {

	/**
	 * Url base para las peticiones
	 * @type {String} url
	 */
	private url: String = 'posts/query';
	
	/**
  * Siempre retorna una sola instancia, patron singleton.
  */
	constructor()
	{
		if(_publicationService == null)
		{
			_publicationService = this;
		}
		return _publicationService;
	}

	/**
	 * Obtener las publicaciones filtrando por consulta,
	 * ejecuta GetAllPublicationAction
	 * @param {String} query
	 *  
	 */
	getPublicationsWithQuery( query: String ) : void
	{
		AjaxService.post( this.url, { query } ).subscribe( 
			result => {
				store.dispatch( AddPublicationsAction(result.data.results) );
			} 
		);
	}
}

export default new PublicationService();