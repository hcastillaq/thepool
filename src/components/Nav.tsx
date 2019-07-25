import React, { Component } from "react";
import {
	AppBar,
	Typography,
	Grid,
	Container,
	Toolbar,
	Button,
} from "@material-ui/core";


import { makeStyles } from '@material-ui/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";
import { APPTITLE } from './../config/config';

export default class Nav extends React.Component <any, any>{
	
	constructor( props : any)
	{
		super(props);
		this.state = { SearchBar: null, Title: null };
	}

	componentWillMount()
	{
		if( !this.props.home )
		{
			this.setState( {
				SearchBar: (
					<div className="nav__content__item nav__content__item--search-bar">
						<SearchBar />
					</div>
				)
			});

			this.setState( {
				Title: (
					<div className="nav__content__item nav__content--title">
						<Typography variant="h6">
							<Link to="/">
								{APPTITLE}
							</Link>
						</Typography>
					</div>
				)
			})
		}
	}
	render()
	{
		return (
			<AppBar className={ `nav ${this.props.home ? 'nav--home':''} ` }>
				<Toolbar className="nav__content">
					{ this.state.Title }
					{ this.state.SearchBar }
					<div className="nav__content__item nav__content__item--icons">
						icons
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}; 
