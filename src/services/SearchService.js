import {Subject} from 'rxjs';
import Ajax from './Ajax';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { switchMap } from 'rxjs/operators/switchMap';
import store from './../store';
import {addSearchData} from './../actions/SearchArctions';
import _ from 'lodash';


let searchServiceInstace = null;

class SearchService {
  constructor()
  { 
    this.subject = new Subject();

    if(_.isNull(searchServiceInstace))
    {
      this.searchServiceInstace = this;
    }

    return searchServiceInstace;
  }


  search(term){
    this.subject.next(term);
  }

  getResults(term)
  {
    let url = `https://pixabay.com/api/?key=9419402-e507727b63e86f0bb83d8bd28&q=${term}&image_type=photo&pretty=true`;
      
    return Ajax.get(url);
  }

  subscription()
  {
    this.subject.pipe(debounceTime(200), 
      switchMap(term => this.getResults(term))).subscribe(result => 
      {
        this.setDataSearch(result.hits);
      });
  }

  setDataSearch(data)
  {
    store.dispatch(addSearchData(data));
  }
}

export default new SearchService();