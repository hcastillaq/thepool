import React, { Fragment } from 'react';
import Nav from './../components/Nav';
import PublicationItemResult from '../components/PublicationItemResult';
import { Grid } from '@material-ui/core';
import publicacionService from '../services/publicacion.service';
import { Container } from '@material-ui/core';


/* importando store */
import store from './../store/root.store';

class PageResult extends React.Component {
	
	state: any;
	
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
				this.setPublications( state.publications );
			}
		);
	}

	componentWillUnmount()
	{
		this.store$();
	}

	setPublications( publications: Array<any> )
	{
		this.setState( { publications } )
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
									( publication, index ) => {
										return (
											<Grid item xs={12}>
												<PublicationItemResult
													key={index}
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