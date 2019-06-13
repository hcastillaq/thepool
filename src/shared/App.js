/* React y React Router */
import React from "react";
import { Link, Route, Switch } from "react-router-dom";

/* Tema  */
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";

/* Componentes */
import Nav from "./../components/Nav";
import Home from "./../pages/Home";
import NewPost from "./../pages/posts/NewPost";
import Container from "@material-ui/core/Container";

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

          <Route render={() => <h1>Not found</h1>} />
        </Switch>
      </ThemeProvider>
    );
  }
}

export default App;
