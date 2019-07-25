import React from 'react';
import PropTypes from 'prop-types';
import Nav from './../components/Nav';
import PublicationItemResult from '../components/PublicationItemResult';
import { Grid, CssBaseline } from '@material-ui/core';
import { Container } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';

/* importando store */
import store from './../store/root.store';
import { PublicationsTypes, QueryTypes } from '../store/types/types';


function ElevationScroll(props : any) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
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
				
				<CssBaseline />

				<ElevationScroll {... this.props}>
					<Nav />
				</ElevationScroll>
					
				<Toolbar />
				
				<Container>
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

				{/* <Nav></Nav>
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
				</Container> */}
			</div>
		)
	}
}

export default PageResult;