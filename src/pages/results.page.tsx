import React from 'react';
import PropTypes from 'prop-types';
import Nav from './../components/Nav';
import PublicationItemResult from '../components/PublicationItemResult';
import { Grid, CssBaseline, Box, Typography } from '@material-ui/core';
import { Container } from '@material-ui/core';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Toolbar from '@material-ui/core/Toolbar';

/* importando store */
import store from './../store/root.store';
import { PublicationsTypes, QueryTypes } from '../store/types/types';
import { PublicationModel } from '../store/models/publication.model';


function ElevationScroll(props: any) {
	const { children, window } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

ElevationScroll.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

class PageResult extends React.Component {

	state: any;
	props: any;
	store$: any;

	constructor(props: any) {
		super(props);
		this.state = { publications: [], publicationsComponents: [] };
	}

	componentWillMount() {
		this.setPublications(store.getState().publications);
	}

	componentDidMount() {
		this.store$ = store.subscribe(
			() => {
				let state = store.getState();
				if (state.lastActionType == PublicationsTypes.ADD_PUBLICATIONS) {
					this.setPublications(state.publications);
				}
			}
		);
	}

	componentWillUnmount() {
		this.store$();
	}

	setPublications(publications: Array<any>) {
		this.setState({ publications });
	}
	
	viewResults() {
		let state = store.getState();
		if( this.state.publications.length == 0 )
		{
			return(
				<div>
					
					<Typography variant="h6" component="span" style={ {marginLeft:"5px"} }>
							No se encontraron resultados para
					</Typography>
					
					<Typography variant="h5" component="span">
						Taller de Electricidad  {/* { state.query } */}	 
					</Typography>
					<Typography variant="h5">
						:(
					</Typography>
				</div>
			);
		}

		return (
			<div>
				<Grid item xs={12} container>
					<div className="page_results__content__about">
						<span>
							Cerca de {this.state.publications.length}  resultados
				</span>
					</div>
				</Grid>

				<Grid item xs={6} container>
					{
						state.publicationsLimit.map(
								(publication: any, index: any) => {
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
			</div>
		)
	}
	render() {
		return (
			<div className="page page_results">

				<CssBaseline />

				<ElevationScroll {... this.props}>
					<Nav />
				</ElevationScroll>
				<Toolbar />
				<Container className="page_results__content">
					<Grid container>
						{ this.viewResults() }
					</Grid>
				</Container>
			</div>
		)
	}
}

export default PageResult;