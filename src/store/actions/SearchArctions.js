import {ADD_SEARCH_DATA} from './../types/types';

export const AddSearchDataAction = ( data ) => {
  return{
    type: ADD_SEARCH_DATA,
    payload: data
  }
};