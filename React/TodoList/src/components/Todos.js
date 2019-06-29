import React, {Component} from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

//this Todo serves as the list of things to do that we pass to App.js
//the individual tasks themselves are the TodoItems
class Todos extends Component {
  render(){
    return this.props.todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleCheckbox={this.props.toggleCheckbox} deleteTodo={this.props.deleteTodo}/>
    ));
  }
}

//need to define PropTypes, from App we can see that <Todos> element has property of todos passed in as an array
Todos.propTypes = {
    todos: PropTypes.array.isRequired
};
export default Todos;