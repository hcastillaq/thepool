import React, { Fragment } from "react";
import store from "./../store";
import _ from "lodash";
import ajax from "./../services/Ajax";
import { getAllPublications } from "./../actions/PublicationActions";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  CardHeader
} from "@material-ui/core";
import Nav from "../components/Nav";
import Search from "../components/Search";
import moment from "moment";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { navComponent: <div>Loading nav component</div> };
  }

  componentWillMount() {
    ajax.post("posts").subscribe(result => {
      console.log(result.data.results);
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
        <Search />
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

    store.subscribe(() => {
      this.setState({ items: store.getState().allPublication });
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
            <Card>
              <CardContent>
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
                    {moment(item.created_at).format("YYYY-MM-DD")}
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
            </Card>
          </Grid>
        </Grid>
      );
    });
    return (
      <Container>
        <Grid container spacing={2}>
          {items}
        </Grid>
      </Container>
    );
  }
}
export default Home;
