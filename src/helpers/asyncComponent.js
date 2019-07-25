import React from "react";




export default 	( module ) => {
	class AsyncComponent extends React.Component{
		constructor(props)
		{
			super(props);
			this.state = { component: null };
		}
		componentWillMount()
		{
			module.then(e => {
				this.setState( { component: < e.default /> } )
			});
		}	
		render(){
			const { component } = this.state;
			return (component);
		}
	}

	return AsyncComponent;
};
