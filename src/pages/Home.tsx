import React from "react";
import {
	Container,
	Grid,
	Typography,
} from "@material-ui/core";

import SearchBar from "../components/SearchBar";
import { store } from './../store//store';
import { PublicationsTypes } from './../store/types/types';

class Home extends React.Component 
{
	
	store$: any;
	props: any;
	state: any;

	constructor(props: any) 
	{
		super(props);
		this.state = { navComponent: <div>Loading nav component</div> };
	}

	componentDidMount()
	{
		
		this.store$ = store.subscribe( 
			() =>
			{
				let state = store.getState();

				if( state.lastActionType == PublicationsTypes.ADD_PUBLICATIONS)
				{
					this.props.history.push(`/q/${state.query}`);
				}
			}
		);
	}

	componentWillUnmount()
	{
		this.store$();
	}

	render() 
	{
		return (
			<div className="page page__home">
				<Container maxWidth="sm" >
					<Grid container 
					justify="center" 
					alignItems="center" 
					className="page__home__content">

						<Grid item xs={12} container spacing={1}>

							<Grid item xs={12} container alignItems="center" justify="center" >
								<Typography variant="h2" component="h1" color="primary">
									The Pool
								</Typography>
							</Grid>
							
							<Grid item xs={12}>
								<SearchBar />	
							</Grid>

						</Grid>

					</Grid>
				</Container>
			</div>
		);
	}
}
		
export default Home;