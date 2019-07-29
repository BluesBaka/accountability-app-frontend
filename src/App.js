import React, {Component} from 'react';
import './App.css';
import UserHomepage from './Components/userHomepage'
import Timer from './Components/timer'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: {
        name: ""
      }
    }
  }
render(){
  return (
    <div className="App">
      <UserHomepage />
       {/* <Timer /> */}
    </div>
  );
}


}

export default App;
