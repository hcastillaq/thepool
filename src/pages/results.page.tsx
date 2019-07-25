import React from 'react';
import Nav from './../components/Nav';
import PublicationItemResult from '../components/PublicationItemResult';
import { Grid } from '@material-ui/core';
import { Container } from '@material-ui/core';


/* importando store */
import store from './../store/root.store';
import { PublicationsTypes, QueryTypes } from '../store/types/types';

class PageResult extends React.Component {
	
	state: any;
	props: any;
	store$: any;

	constructor(props: any) {
		super(props);
		this.state = { publications: [] };
	}

	componentWillMount()
	{
		this.setPublications( store.getState().publications );	
	}

	componentDidMount()
	{
		this.store$ = store.subscribe(
			() => {
				let state = store.getState();
				if( state.lastActionType == PublicationsTypes.ADD_PUBLICATIONS )
				{
					this.setPublications( state.publications );
				}
			}
		);
	}

	componentWillUnmount()
	{
		this.store$();
	}

	setPublications( publications: Array<any> )
	{
		this.setState( { publications } );
	}

	render() {
		return (
			<div className="page page_results">
				<Nav></Nav>
				<Container maxWidth="md" className="page_results__content">
					<Grid container>
						<Grid item xs={12} container spacing={1}>
							{
								this.state.publications.map(
									( publication : any, index : any ) => {
										return (
											<Grid item xs={12} key={index}>
												<PublicationItemResult
													item={publication} />
											</Grid>
										)
									}
								)
							}
						</Grid>
					</Grid>
				</Container>
			</div>
		)
	}
}

export default PageResult;