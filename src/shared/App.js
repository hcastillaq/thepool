/* React y React Router */
import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from 'react-loadable';

/* Tema  */
import { ThemeProvider } from "@material-ui/styles";

/* Componentes */
import NewPost from './../pages/posts/NewPost';
// const NewPost = Loadable({
// 	loader: () => import('./../pages/posts/NewPost'),
// 	loading() {
// 		return <div>Loading...</div>
// 	}
// });


/* Custom Tema */
import CustomTheme from './../theme/theme';

/* Pages */
import HomePage from './../pages/Home';

import PageResult from './../pages/Results.page';
// const PageResult = Loadable({
// 	loader: () => import('./../pages/Results.page'),
// 	loading() {
// 		return <div>Loading...</div>
// 	}
// });


class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ThemeProvider theme={CustomTheme}>
				<Switch>
					<Route
						exact
						path="/"
						component={HomePage}
					/>

					<Route path="/post/new" component={NewPost} />
					<Route path="/q/:query" component={PageResult} />

					<Route render={() => <h1>Not found</h1>} />
				</Switch>
			</ThemeProvider>
		);
	}
}

export default App;
