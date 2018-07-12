import React from 'react';
import SearchService from './../services/SearchService';

class Search extends React.Component{
	constructor(props)
	{
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	componentWillMount(){
		SearchService.subscription();
	}

	onChange(e)
	{
		let key = '9419402-e507727b63e86f0bb83d8bd28';
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
