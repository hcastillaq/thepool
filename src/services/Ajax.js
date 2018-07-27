import axios from 'axios';
import {from} from 'rxjs';
import {URL} from './../config/config';

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
    return from( axios.get(URL + url).then( e => e).catch( err => err) );
  }

  post(url, data={}){
    return from( axios.post(URL + url, data).then(e =>  this.makeObjectResponse(e) )
    .catch(err => this.makeObjectResponse(err, true) ) );
  }

  makeObjectResponse(response, error=false)
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

export default new Ajax();