import React from "react";
import { withRouter } from 'react-router-dom';

import { InputBase, IconButton, Paper} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from "@material-ui/icons/Search";

import { QueryAction } from "../store/actions/query.actions";
import { PublicationsTypes } from "../store/types/types";
import PublicationService from '../services/publicacion.service';

import store from "../store/root.store";
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';
import { ActionLoadingPublications } from "../store/actions/publication.action";

const useStyles = {
	root: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		height: "45px",
		borderRadius: "2.6em",
		paddingLeft: '10px'
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

		this.state = { query: '', loading: false }
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
				this.setState( { loading: state.loadingPublications } );
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
		let query = e.target.value;
		store.dispatch( QueryAction( query) );
	}

	onSubmit(e) {
		e.preventDefault();
		if(!isNull( this.state.query ) && !isEmpty( this.state.query ) )
		{
			store.dispatch( ActionLoadingPublications( true ) );
			PublicationService.getPublicationsWithQuery( this.state.query.trim() );
		}
	}

	validateStateLoading()
	{
		if(this.state.loading)
		{
			return <CircularProgress 
				style={ {marginRight:'15px'} } size={20} />;
		}
		return(
		<IconButton type="submit">
			<SearchIcon style={useStyles.iconButton} color="primary" />
		</IconButton>);
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

					{this.validateStateLoading()}
				</Paper>
			</form>

		);
	}
}

export default withRouter( Search );
