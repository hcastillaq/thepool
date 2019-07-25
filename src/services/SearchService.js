/*
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { switchMap } from 'rxjs/operators/switchMap';
import isNull from 'lodash/isNull';
import AjaxService from './Ajax.service';

let searchServiceInstace = null;

class SearchService {

	constructor() {
		if (isNull(searchServiceInstace)) {
			this.searchServiceInstace = this;
			this.subject = new Subject();
			this.subscription();
		}

		return searchServiceInstace;
	}


	search(term) {
		this.subject.next(term);
	}

	getResults(term) {
		let url = 'posts/query';
		return AjaxService.post(url, { query: term });
	}


	subscription() {
		this.subject.pipe(debounceTime(0),
			switchMap(term => this.getResults(term))).subscribe(resp => {
				if (resp.status == 200) {
					this.setDataSearch(resp.data.results);
				} else {
					console.log('bad request', resp);
				}
			});
	}


	setDataSearch(data) {
	}
}

export default new SearchService();
*/