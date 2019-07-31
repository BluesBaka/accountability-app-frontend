import React from 'react'

// props= tasks, addATask(), deleteTask()
const TaskList = props => {

  const displayTasks = () => {
    return props.tasks.map((task, idx) => {
      return <li key={idx}>
      {task.title}
      <button className="delete-button" name="delete-button" onClick={()=> props.deleteTask(task)}>X</button>
      <button className="edit-button" name="edit-button">E</button>
      </li>
    })

  }

    return(
      <div className="">
        <form onSubmit={props.addATask}>
          <input type="text" name="taskInput" />
          <input type="submit" value="Add" />
        </form>
        <ul>
          {displayTasks()}
        </ul>
      </div>
    )

}

export default TaskList
