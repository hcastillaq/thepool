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
	componentDidMount()
	{
	
	}
	render(){
		return(
			<div>
				<header>
					<h1>The Pool</h1>
					<Search></Search>
				</header>	

				<ItemsContianer initialData={this.props.initialData}/>

				<form action="http://localhost:4000/file" method="post"  encType="multipart/form-data">
					<input type='file' name="file" />
					<input type="submit" />
				</form>

			</div>

		)
	}
}

class ItemsContianer extends React.Component{
	constructor(props)
	{
		super(props);
		
		if(_.isEmpty(store.getState().searchResults) && this.props.initialData)
		{
			this.state = { items: this.props.initialData };
		}	else{
			this.state = { items: store.getState().searchResults };
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
		this.state.items.forEach(item => {
			items.push(<img key={item.id}  src={item.previewURL} />)
		});
		return(
			<div>
				{items}
			</div>
		)
	}
}
export default Home;