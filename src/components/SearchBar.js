
import React, { Fragment } from 'react';
import Search from './Search';
import { Container, Grid } from '@material-ui/core';

class SearchBar extends React.Component {
  render() {
    return (
      <Fragment>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Search />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default SearchBar;