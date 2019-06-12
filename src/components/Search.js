import React from "react";
import SearchService from "./../services/SearchService";
import { InputBase, IconButton, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = {
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "45px",
  },
  input: {
    marginLeft: 8,
		flex: 1,
  },
  iconButton: {
		padding: 10,
		width: ".8em",
		height: ".8em"
  }
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    let search = e.target.value.trim();

    if (search != "") {
      SearchService.search(search);
    } else {
      SearchService.setDataSearch([]);
    }
  }

  render() {
    return (
      <Paper style={useStyles.root}>
        <InputBase
          placeholder="Ejemplo: Taller de electricidad"
          onChange={this.onChange}
          style={useStyles.input}
        />
        <SearchIcon style={useStyles.iconButton} color="primary" />
      </Paper>
    );
  }
}

export default Search;
