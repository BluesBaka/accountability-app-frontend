import React, {Component} from 'react';
import './App.css';
import UserHomepage from './Components/userHomepage'
import Timer from './Components/timer'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: {
        name: "",
        id: 1
      },
      tasks: [
        {
          title:"Do some weird stuff",
          status: "open",
          workSessions: ""
        }
      ],
      workSessions: []
    }
  }

  componentDidMount(){

    fetch("http://localhost:3001/work_sessions")
    .then(res => res.json())
    .then(data => filterWorkSessions(data))

    const filterWorkSessions = (data) => {
      let sessions = data.filter( item => {
        return item.user_id === this.state.user.id
      })

      this.setState({
        ...this.state,
        workSessions: sessions
      })
    }

    fetch("http://localhost:3001/tasks")
    .then(res => res.json())
    .then(data => filterTasks(data))

    const filterTasks = (data) => {
      let tasks = data.filter(item => {
         this.state.workSessions.map((wSession, idx) => {
          console.log(wSession)
        })

      })

      // console.log(this.state.workSessions)
      // this.setState({
      //   ...this.state,
      //   tasks: [
      //     ...this.state.tasks,
      //     tasks
      //   ]
      // })
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
