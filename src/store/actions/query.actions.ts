import { QueryTypes } from './../types/types';

export function QueryAction ( data : String )  {
  return{
    type: QueryTypes.QUERY,
    payload: data
  }
};