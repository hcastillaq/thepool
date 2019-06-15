import React, { Fragment } from 'react';
import Nav from './../components/Nav';
import { store } from '../store/store';
import PublicationItemResult from '../components/PublicationItemResult';
import { Grid } from '@material-ui/core';
import publicacionService from '../services/publicacion.service';

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
			<Fragment>
				<Nav></Nav>

				<Grid container>

					<Grid item xs={8} container spacing={1}>
						{
							this.state.publications.map(
								publication => {
									return (
										<Grid item xs={12}>
											<PublicationItemResult
												key={publication.id}
												item={publication} />
										</Grid>
									)
								}
							)
						}
					</Grid>

				</Grid>
			</Fragment>

		)
	}
}

export default PageResult;