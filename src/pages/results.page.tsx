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

import Pagination from './../components/Pagination';

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
		this.state = { publications: [], numPublications: 0 };
	}

	componentWillMount() {
		let state = store.getState();
		this.setPublications(
			state.publications.slice(state.startPLimit, state.endPLimit));
	}

	componentDidMount() {
		this.store$ = store.subscribe(
			() => {
				let state = store.getState();
				if (state.lastActionType == PublicationsTypes.ADD_PUBLICATIONS 
						|| state.lastActionType == PublicationsTypes.CHANGE_PAGE_NUMBER) {
					let end = state.pageNumber * state.pageFactor;
					let start = (state.pageNumber - 1) * state.pageFactor;
					this.setPublications(
							state.publications.slice(start, end));
					this.setState( {numPublications : state.publications.length} )
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
		if( this.state.publications.length == 0 )
		{
			return(
				<div>
					
					<Typography variant="h6" component="span" style={ {marginLeft:"5px"} }>
							No se encontraron resultados para
					</Typography>
					
					<Typography variant="h5" component="span">
							{ store.getState().query } 
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
							Cerca de {this.state.numPublications}  resultados
				</span>
					</div>
				</Grid>

				<Grid item xs={6} container>
					{
						this.state.publications.map(
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

				<Grid item xs={6}>
					<Pagination />
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