import axios from 'axios';
import { URL } from './../config/config';

export interface AjaxResponseInterface {
	response: Object,
	status: Number,
	headers: Object,
	data: any
};


let ajaxInstance: AjaxService;

/**
 * Servicio que permite hacer peticiones ajax, 
 * tiene una url por defecto que se complenta con las url pasada por parametro.
 */
class AjaxService {
	/**
	 * Siempre retorna una sola instancia, patron singleton.
	 */
	constructor() {
		if (ajaxInstance == null) {
			ajaxInstance = this;
		}

		return ajaxInstance;
	}

	/**
	 * Hace una peticion por el metodo GET
	 * @param {String} url - url de la peticion
	 */
	get(url: String) {
		return new Promise(
			resolve => {
				axios.get(`${URL}${url}`)
					.then( e => { resolve( e ) } )
					.catch( err => resolve( err ) );
			}
		);
	}

	/**
	 * Hace una peticion por el metodo POST
	 * @param  {String} url  -  String        [description]
	 * @param  {Object} data - datos a enviar al servidor
	 * @return {Observable} contiene un objeto con todos los datos de la peticion
	 */
	post( url: String, data: Object = {} ) {
		return new Promise(
			resolve => 
			{
				axios.post(`${URL}${url}`, data)
					.then( e => resolve( this.makeObjectResponse( e ) ) )
					.catch( err => resolve( this.makeObjectResponse( err, true ) ) );
			}
		);
	}

	/**
	 * Construye el objeto de la respuesta
	 * @param {Object} response - respuesta de la peticion
	 * @param {Boolean} error   - por defecto es falso, marca el error en la peticion
	 * @return {Object} retorna un objecto con la informacion de la peticion
	 */
	makeObjectResponse(response: any, error = false) {
	
		if (error) { response = response.response }
		const resp : AjaxResponseInterface = {
			response: response,
			status: response.status,
			headers: response.headers,
			data: response.data
		}
		return resp;
	}
}

export default new AjaxService();