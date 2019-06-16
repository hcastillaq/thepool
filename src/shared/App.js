/* React y React Router */
import React from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";

/* Tema  */
import { ThemeProvider } from "@material-ui/styles";

/* Componentes */
import Home from "./../pages/Home";
import NewPost from "./../pages/posts/NewPost";
import PageResult from './../pages/results.page';

/* Custom Tema */
import CustomTheme from './../theme/theme';

/* Global History */
import history from "../helpers/history";

class App extends React.Component {
	render() {
		return (
			<ThemeProvider theme={ CustomTheme }>
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
