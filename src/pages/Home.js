import React from 'react';
import store from './../store';
import addSearchData from './../actions/SearchArctions';
import Search from './../components/Search';
import _ from 'lodash';

class Home extends React.Component{
	constructor(props)
	{
		super(props);
		this.state = {navComponent: <div>Loagin nav component</div>}
	}

	render(){
		return(
			<div>
				<header>
					<h1>The Pool</h1>
					<Search></Search>
				</header>	
				<ItemsContianer initialData={this.props.initialData}/>
			</div>
		)
	}
}

class ItemsContianer extends React.Component{
	constructor(props)
	{
		super(props);
		
		this.state = {
			items: []
		}
		this.storeSubscription;
	}
	
	componentDidMount()
	{	
		
		this.storeSubscription = store.subscribe(() => {
			this.setState( { items: store.getState().searchResults } )
		});
		
	}
	componentWillUnmount()
	{
		this.storeSubscription()
	}

	render()
	{
		const items = [];
		
		this.state.items.forEach(post => {
			items.push(<div key={post.id}>
				<span>{post.title}</span>
				<p>{post.description}</p>
			</div>)
		})

		return(
			<div>
				{items}
			</div>
		)
	}
}
export default Home;