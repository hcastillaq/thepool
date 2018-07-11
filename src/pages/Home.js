import React from 'react';
import store from './../store';
import LazyLoad from './../helpers/LazyLoad';
		
const Search = () => {
	return (<LazyLoad getComponent={ () =>  import('./../components/Search') } 
		loader={ () => <div className="searchInput searchInput--loader"></div> }> </LazyLoad>)
}

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

				<ItemsContianer />

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
		this.state = { items: [] };
	}
	
	componentDidMount()
	{
		this.state.items = store.getState().searchResults;
		
		store.subscribe(() => {
			this.setState( { items: store.getState().searchResults } )
		});
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