import axios from 'axios';
import {from} from 'rxjs';
import { URL } from './../config/config';

let ajaxInstance : AjaxService;

/**
 * Servicio que permite hacer peticiones ajax, 
 * tiene una url por defecto que se complenta con las url pasada por parametro.
 */
class AjaxService {
  /**
   * Siempre retorna una sola instancia, patron singleton.
   */
  constructor()
  {
    if( ajaxInstance == null)
    {
      ajaxInstance = this;
    }

    return ajaxInstance;
  }

  /**
   * Hace una peticion por el metodo GET
   * @param {String} url - url de la peticion
   */
  get(url: String)
  {
    return from( axios.get(`${URL}${url}`).then( e => e ).catch( err => err) );
  }

  /**
   * Hace una peticion por el metodo POST
   * @param  {String} url  -  String        [description]
   * @param  {Object} data - datos a enviar al servidor
   * @return {Observable} contiene un objeto con todos los datos de la peticion
   */
  post(url: String, data: Object = {}){
    return from( axios.post(`${URL}${url}`, data).then(e =>  this.makeObjectResponse(e) )
    .catch(err => this.makeObjectResponse(err, true) ) );
  }

  /**
   * Construye el objeto de la respuesta
   * @param {Object} response - respuesta de la peticion
   * @param {Boolean} error   - por defecto es falso, marca el error en la peticion
   * @return {Object} retorna un objecto con la informacion de la peticion
   */
  makeObjectResponse(response: any, error=false)
  {
    if(error){ response =  response.response}
    return({
      response:  response ,
      status: response.status,
      headers: response.headers,
      data: response.data
    });
  }
}

export default new AjaxService();