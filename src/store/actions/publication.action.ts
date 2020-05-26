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

export const ActionLoadingPublications = ( state : Boolean ) => 
{
	return{
		type: PublicationsTypes.LOADING_PLUBLICATIONS,
		payload: state
	}
}

export const ActionChangePageNumber = ( pageNumber : Number ) => 
{
	return{
		type: PublicationsTypes.CHANGE_PAGE_NUMBER,
		payload: pageNumber
	}
}