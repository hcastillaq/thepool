import React from 'react';
import SearchService from './../services/SearchService';
import axios from 'axios';

class Search extends React.Component{
	constructor(props)
	{
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	componentWillMount(){
		//SearchService.subscription();
	}

	onChange(e)
	{
		let search = e.target.value.trim();
		
		if( search != '')
		{
			SearchService.search(search);
		}else{
			SearchService.setDataSearch([]);
		}
	}

	render(){
		return(
			<div className="searchInput">
				<i className="icon icon-search icon-1x"></i>
				<input type="text" onChange={this.onChange} 
					placeholder="Ejemplo: Taller de electricidad" />
			</div>
		)
	}
}
export default Search;
