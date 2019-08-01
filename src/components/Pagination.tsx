import React from 'react';
import store from '../store/root.store';
import { Typography } from '@material-ui/core';
import { ActionChangePageNumber } from '../store/actions/publication.action';

class Pagination extends React.Component{

	state : any;
	constructor(props : any)
	{
		super(props);

		this.state = { items: 0}
	}
	componentWillMount(){
		console.log('pagination load')
		let state = store.getState();
		this.calculatePaginations( state.publications );

		store.subscribe( () => {  
			let state = store.getState();
			this.calculatePaginations( state.publications );
		});
	}
	
	calculatePaginations( publications: Array<any>)
	{
		let factor = 10;
		let div = Math.trunc( publications.length / factor );
		let mod = publications.length % factor;
		let items = div;
		if( mod != 0)
		{
			items += 1;
		}
		this.setState( { items });
	}

	onClick(pageNumber : Number)
	{
		store.dispatch( ActionChangePageNumber( pageNumber ) );
	}

	page( number : Number)
	{
		return (
			<div key={ number.toString() } className="pagination__page" onClick={this.onClick.bind(this, number)}> 
				<Typography component="span" color="primary">
					{ number} 
				</Typography>
			</div>
		);
	}
	render()
	{
		return(
			<div className="pagination">
				{ [...new Array(this.state.items)].map( (v,i) => this.page(i + 1) )}
			</div>
		);
	}
}

export default Pagination;