import {Subject} from 'rxjs';
import Ajax from './Ajax';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { switchMap } from 'rxjs/operators/switchMap';
import store from './../store';
import {addSearchData} from './../actions/SearchArctions';
import _ from 'lodash';
import  validator from 'validator';

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


  search(term){
    this.subject.next(term);
  }

  getResults(term)
  {
    let url = 'posts/query';
    term = validator.escape(term);
    return Ajax.post(url, {query: term});
  }

  subscription()
  {
    this.subject.pipe(debounceTime(200), 
      switchMap(term => this.getResults(term))).subscribe(resp => 
      {
        if(resp.status == 200){
          this.setDataSearch(resp.data.posts);
        }
      });
  }

  setDataSearch(data)
  {
    store.dispatch(addSearchData(data));
  }
}

export default new SearchService();