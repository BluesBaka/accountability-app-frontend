import React, { Component, Fragment } from 'react'

// props= submitable, submitWS()
class Note extends Component  {

  renderNote = () => {
    return this.props.submitable ? <input type="submit" value="Submit" onClick={(e)=> this.props.submitWS(e)}/> : null
  }
  render(){
    return(
      <Fragment>
        <form className="note">
          <textarea placeholder="Please write some notes about how you spent your time">
          </textarea>
          {this.renderNote()}
        </form>
      </Fragment>

    )
  }

}

export default Note;
