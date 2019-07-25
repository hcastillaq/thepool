import React from "react";
import { withRouter } from 'react-router-dom';

import { InputBase, IconButton, Paper, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { QueryAction } from "../store/actions/query.actions";
import { PublicationsTypes } from "../store/types/types";
import PublicationService from '../services/publicacion.service';

import store from "../store/root.store";
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';

const useStyles = {
	root: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		height: "45px",
	},
	input: {
		marginLeft: 10,
		flex: 1,
	},
	iconButton: {
		width: ".8em",
		height: ".8em"
	}
};

class Search extends React.Component {

	store$;

	constructor(props) {
		super(props);

		this.state = { query: '' }
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		
		let query = store.getState().query;

		this.setState( { query } );

		this.store$ = store.subscribe(
			() => {
				let state = store.getState();

				this.setState( { query: state.query } );

				if( state.lastActionType == PublicationsTypes.ADD_PUBLICATIONS )
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

	onChange(e) {
		let query = e.target.value.trim();
		store.dispatch( QueryAction( query ) );
	}

	onSubmit(e) {
		e.preventDefault();
		if(!isNull( this.state.query ) && !isEmpty( this.state.query ) )
		{
			PublicationService.getPublicationsWithQuery( this.state.query );
		}
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<Paper style={useStyles.root}>
					
					<InputBase
						placeholder="Ejemplo: Taller de electricidad"
						onChange={this.onChange}
						style={useStyles.input}
						value={this.state.query}
					/>

					<IconButton type="submit">
						<SearchIcon style={useStyles.iconButton} color="primary" />
					</IconButton>

				</Paper>
			</form>

		);
	}
}

export default withRouter( Search );
