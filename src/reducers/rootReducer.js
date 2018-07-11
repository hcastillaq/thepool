import {ADD_SEARCH_DATA} from './../types/types';

const initialState = {
  searchResults: []
};

const rootReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_SEARCH_DATA:
      return {
        ... state,
        searchResults: action.payload
      };
    default:
      return state;
  }
}

export default rootReducer;