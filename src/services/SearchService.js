import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { switchMap } from 'rxjs/operators/switchMap';
import { QueryAction } from './../store/actions/query.actions';
import { store } from './../store/store';
import AjaxService from './ajax.service';
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
<<<<<<< HEAD
    term = validator.escape(term);
    return Ajax.post(url, {query: term});
=======
    return AjaxService.post(url, {query: term});
>>>>>>> cb754a8544aaaa2cd77aea9b7cabbd3797c28016
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
<<<<<<< HEAD
          this.setDataSearch(resp.data.posts);
=======
          this.setDataSearch(resp.data.results);
        }else{
          console.log('bad request', resp);
>>>>>>> cb754a8544aaaa2cd77aea9b7cabbd3797c28016
        }
      });
  }

  /**
   * 
   * @param {*} data 
   */
  setDataSearch(data)
  {
  }
}

export default new SearchService();