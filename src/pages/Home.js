import React, { Fragment } from "react";
import store from "./../store";
import _ from "lodash";
import ajax from "./../services/Ajax";
import { getAllPublications } from "./../actions/PublicationActions";
import {
  Typography,
  Container,
  Grid,
  Chip,
  List,
} from "@material-ui/core";
import Search from "../components/Search";
import moment from "moment";

/* pequeña config para moment */
moment.locale("es");

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { navComponent: <div>Loading nav component</div> };
  }

  componentWillMount() {
    ajax.post("posts").subscribe(result => {
      store.dispatch(getAllPublications(result.data.results));
    });
  }

  render() {
    return (
      <Fragment>
        <SearchBar />
        <ItemsContianer initialData={this.props.initialData} />
      </Fragment>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <Container>
        <div style={{ margin: "20px 0px" }}>
          <Search />
        </div>
      </Container>
    );
  }
}

class ItemsContianer extends React.Component {
  constructor(props) {
    super(props);

    if (_.isEmpty(store.getState().searchResults) && this.props.initialData) {
      this.state = { items: this.props.initialData };
    } else {
      this.state = { items: store.getState().searchResults };
    }
    this.storeSubscription;
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({ items: store.getState().searchResults });
    });
  }
  componentWillUnmount() {
    //this.storeSubscription()
  }

  render() {
    const items = [];
    this.state.items.forEach(item => {
      items.push(
        <Grid item xs={12} key={item.id} container>
          <Grid item xs={12} sm={7}>
            <Grid item xs={12}>
              <Typography
                component="h5"
                variant="h6"
                style={{ fontSize: "1em" }}
                color="primary"
                noWrap
              >
                {item.title}
              </Typography>
            </Grid>

            <Grid container direction="row" justify="flex-start" item xs={12}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                style={{ fontSize: ".8em" }}
              >
                {moment(item.created_at).format("LL")} -  By Hernan Castilla
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ margin: "10px 0px" }}
              >
                {item.description}
              </Typography>
            </Grid>

            <Grid container direction="row" justify="flex-start" spacing={1}>
              {item.tags.split(",").map( (tag, index) => (
                <Grid item key={index}>
                  <Chip label={tag} />
                </Grid>
              ))}
            </Grid>

          </Grid>
        </Grid>
      );
    });
    return (
      <Container>
        <List>
          <Grid container spacing={2}>
            {items}
          </Grid>
        </List>
      </Container>
    );
  }
}
export default Home;

/**
 *               <CardContent>
                <Typography
                  component="h5"
                  variant="h6"
                  style={{ fontSize: "1.1em" }}
                  color="primary"
                  noWrap
                >
                  {item.title}
                </Typography>

                <Grid container direction="row" justify="flex-start">
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    style={{ fontSize: ".8em" }}
                  >
                    {moment(item.created_at).format("LL")}
                  </Typography>
                </Grid>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ margin: "10px 0px" }}
                >
                  {item.description}
                </Typography>
              </CardContent>

              <ListItemSecondaryAction>
                <Grid container direction="row" justify="flex-end" spacing={1}>
                  {item.tags.split(",").map(tag => (
                    <Grid item>
                      <Chip label={tag} />
                    </Grid>
                  ))}
                </Grid>
              </ListItemSecondaryAction>
 */
