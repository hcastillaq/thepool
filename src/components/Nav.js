import React, { Component } from "react";
import {
	AppBar,
	Typography,
	Grid,
	Container,
} from "@material-ui/core";

import ButtonBase from '@material-ui/core/ButtonBase';

import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";

export default class Nav extends Component {
	render() {
		return (
			<AppBar style={ { padding: '5px 0px' } } position="fixed">
					<Container maxWidth="md">
						<Grid container alignItems="center" spacing={1} style={ {margin:'0px', padding:'0px'} }>

						 <ButtonBase>
								<Typography variant="h5" noWrap>
										<Link to="/" >
											Pool
										</Link>
								</Typography>
						 </ButtonBase>
							
							<Grid item xs={8} style={ {marginLeft: '10px'} }>
								<SearchBar />
							</Grid>

						</Grid>
					</Container>
			</AppBar>
		);
	}
}
