/* React y React Router */
import React from "react";
import { Link, Route, Switch } from "react-router-dom";

/* Tema  */
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";

/* Componentes */
import Home from "./../pages/Home";
import NewPost from "./../pages/posts/NewPost";
import PageResult from './../pages/results.page';

/* Tema personalziado */
const customTheme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: deepPurple
  }
});

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={customTheme}>
        <Switch>
          <Route
            exact
            path="/"
            component={ Home }
          />
          
          <Route path="/post/new" component={ NewPost } />
          <Route path="/q/:query" component={ PageResult } />

          <Route render={() => <h1>Not found</h1>} />
        </Switch>
      </ThemeProvider>
    );
  }
}

export default App;
