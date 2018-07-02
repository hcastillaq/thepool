import React from 'react';

class App extends React.Component{

  componentWillMount(){
    console.log('from client')
  }

  render(){
    return (
      <h1>Working with react</h1>
    )
  }
}

export default App;