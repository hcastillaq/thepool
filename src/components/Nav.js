import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";

export default class Nav extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" noWrap>
            The Pool
            <Link to="/post/new"> new </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
