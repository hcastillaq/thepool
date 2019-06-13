import React from "react";
import SearchService from "./../services/SearchService";
import { InputBase, IconButton, Paper, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { store } from "../store/store";
import { QueryAction } from "../store/actions/query.actions";
import PublicationService from '../services/publicacion.service.ts';

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
  constructor(props) {
    super(props);

    this.state = { query: '' }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    store.subscribe(
      () => {
        this.setState({ query: store.getState().query });
      }
    );
  }

  onChange(e) {
    let query = e.target.value.trim();
    store.dispatch(QueryAction(query));
  }

  onSubmit(e) {
    e.preventDefault();
    PublicationService.getPublicationsWithQuery( this.state.query );
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

export default Search;
