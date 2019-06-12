import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { switchMap } from 'rxjs/operators/switchMap';
import { AddSearchDataAction } from '../store/actions/SearchArctions';

import { store } from './../store/store';
import Ajax from './Ajax';
import _ from 'lodash';



let searchServiceInstace = null;

class SearchService {

  constructor()
  { 
    if(_.isNull(searchServiceInstace))
    {
      this.searchServiceInstace = this;
      this.subject = new Subject();
      this.subscription();
    }

    return searchServiceInstace;
  }

  /**
   * 
   * @param {*} term 
   */
  search(term){
    this.subject.next(term);
  }

  /**
   * 
   * @param {*} term 
   */
  getResults(term)
  {
    let url = 'posts/query';
    return Ajax.post(url, {query: term});
  }

  /**
   * 
   */
  subscription()
  {
    this.subject.pipe(debounceTime(0), 
      switchMap(term => this.getResults(term))).subscribe(resp => 
      {
        if(resp.status == 200){
          this.setDataSearch(resp.data.results);
        }else{
          console.log('bad request', resp);
        }
      });
  }

  /**
   * 
   * @param {*} data 
   */
  setDataSearch(data)
  {
    store.dispatch( AddSearchDataAction(data) );
  }
}

export default new SearchService();