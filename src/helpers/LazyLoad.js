import React from 'react';

class LazyLoad extends React.Component{

  constructor(props){
    super(props);
    
    this.state = {
      AsyncModule: null
    }
  }

  componentDidMount()
  {
    this.props.getComponent().then( e => e.default).then( e => {
      this.setState({ AsyncModule: e })
    })
  }

  render()
  {
    const {loader} = this.props;
    const {AsyncModule} = this.state;

    if(AsyncModule)
    {
      return ( <AsyncModule />)
    }

    if(loader)
    {
      const Loader = loader;
      return <Loader />;
    }
    return ( <div>No component return </div> );
  }
}

export default LazyLoad;