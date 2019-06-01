import { GET_ALL_PUBLICATIONS } from './../types/types';


/**
 * Acciones para cuando se obtienen todas las publicaciones
 * @param {Array} publicaciones 
 */
export const getAllPublications = ( publicaciones ) => {
  return{
    type: GET_ALL_PUBLICATIONS,
    payload: publicaciones
  }
};