import React, {Component} from 'react';
import PropTypes from 'prop-types';

//a TodoItem is the individual listing in the list of Todos
class TodoItem extends Component {

//if a task is completed, display it with a line going through it
//get style returns styling for the div containing the task
  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc solid',
      textDecoration: this.props.todo.completed? 'line-through' : 'none'
    }
  }

  //use component drilling here, bubble up to Todos then to App (because the state of the everything is in App!)
  //go up to App to handle checkbox being checked
  
  render(){
    //destructuring this.props.todo in order to save effort in typing
    //bind lets you have access to "this"
    //also binding the TodoItem's id to that specific TodoItem (this) in order to pass it back up to App
    //need to do same in order to use delete button
    let {id, title} = this.props.todo;
    return(
      <div style={this.getStyle()}>
        <p>
          <input type='checkbox' onChange={this.props.toggleCheckbox.bind(this, id)} />
          {title}
          <button style={btnStyle} onClick={this.props.deleteTodo.bind(this, id )}>X</button>
        </p>
      </div>
    );
  }
}


//need to define PropTypes, from Todos we can see that <TodoItem> element has property of todo passed in as an object
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 8px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default TodoItem;