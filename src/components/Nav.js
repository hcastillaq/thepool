import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid
} from "@material-ui/core";
import SearchBar from "./SearchBar";

export default class Nav extends Component {
  render() {
    return (
      <AppBar position="static" style={ { padding: '10px 0px' } }>
         <Grid container alignItems="center" spacing={1}>
            
            <Typography variant="h5" noWrap>
              The Pool
            </Typography>

            <Grid item xs={6}>
              <SearchBar />
            </Grid>

          </Grid>
      </AppBar>
    );
  }
}
