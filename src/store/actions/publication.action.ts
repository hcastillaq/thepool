import { PublicationsTypes } from './../types/types';

/**
 * Accion para agregar las publicaciones al store
 * @param {Array} publicaciones 
 */
export const AddPublicationsAction = ( publicaciones: Array<Object>) => {
	return{
		type: PublicationsTypes.ADD_PUBLICATIONS,
		payload: publicaciones
	}
};