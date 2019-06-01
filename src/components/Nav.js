import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Container
} from "@material-ui/core";
import Search from "./Search";

export default class Nav extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" noWrap>
            The Pool
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
