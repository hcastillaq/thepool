import axios from 'axios';
import {from} from 'rxjs';

let ajaxInstance = null;

class Ajax {
  constructor()
  {
    if( ajaxInstance == null)
    {
      ajaxInstance = this;
    }

    return ajaxInstance;
  }

  get(url)
  {
    return from( axios.get(url).then( e => e.data) );
  }

  post(url, data){
    return from(axios.post(url, data).then(e => e.data));
  }
}

export default new Ajax();