import React from "react";
import { Grid, Typography, Chip } from "@material-ui/core";
import moment from "moment";

/* pequeña config para moment */
moment.locale("es");

class ItemSearchResult extends React.Component {
  render() {
		const item = this.props.item;
    return (
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
              {moment(item.created_at).format("LL")} - By Hernan Castilla
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
            {item.tags.split(",").map((tag, index) => (
              <Grid item key={index}>
                <Chip label={tag} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default ItemSearchResult;
