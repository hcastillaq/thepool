/* React y React Router */
import React from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";

/* Tema  */
import { ThemeProvider } from "@material-ui/styles";

/* Componentes */
import NewPost from "./../pages/posts/NewPost";
import asyncComponent from './../helpers/asyncComponent';

const asyncHome =asyncComponent(() =>
	import('./../pages/Home').then(module => module.default)
);

const asyncPageResult =asyncComponent(() =>
	import('./../pages/results.page').then(module => module.default)
);

/* Custom Tema */
import CustomTheme from './../theme/theme';

class App extends React.Component {
	constructor(props)
	{
		super(props);
	}
	
	render() {
		return (
			<ThemeProvider theme={ CustomTheme }>
				<Switch>
					<Route
						exact
						path="/"
						component={asyncHome} 
					/>
					
					<Route path="/post/new" component={ asyncHome } />
					<Route path="/q/:query" component={ asyncPageResult } />

					<Route render={() => <h1>Not found</h1>} />
				</Switch>
			</ThemeProvider>
		);
	}
}

export default App;
