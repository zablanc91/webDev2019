import React, {Component} from 'react';
import './App.css';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';

//todos are a list of things to do, we will pass it into Todos.js; see render method below
//MAIN APP - HANDLE LOGIC HERE
//Components (Todos, AddTodos, etc.) will render UI
//NOTE: using arrow functions inside App, this avoids having to bind the methods (not yet the standard!)
class App extends Component {
  state = {
    todos: [
      {
        id:1,
        title: 'Walk the dog',
        completed: false
      },

      {
        id:2,
        title: 'Buy eggs',
        completed: false
      },

      {
        id:3,
        title: 'Go to bike shops',
        completed: false
      }
    ]
  }

  //The 'id' being passed in this case is the TodoItem's id that we binded to toggleCheckbox!
  //setState is used to edit that particular todo so 'completed' gets toggled and the text decoration can be applied
  //map through todos and edit the one with the particular id
  toggleCheckbox = (id) => {
    console.log('what is id?: ' + id);
    this.setState({todos: this.state.todos.map( (todo) => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    })});
  }

  //delete the todo with a matching id, filter for todos that don't have the id
  deleteTodo = (id) =>{
    console.log(id);
    this.setState({todos: this.state.todos.filter( (todo) => {
      return todo.id !== id;
    })});
  }

  //append the new todo into the list of todos in the App's state
  //id will be largest id + 1
  addTodo = (title) => {
    let newID = this.findLargestID() + 1;
    console.log('newest ID: ' + newID);
    let newTodo = {
      id : newID,
      title : title,
      completed : false
    };
    this.setState({todos: [...this.state.todos, newTodo]});
  }

  findLargestID(){
    let ids = this.state.todos.map(todo => todo.id);
    return Math.max(...ids);
  }

  render(){
    console.log(this.state.todos);
    return (
      <div className='app'>
        <div className='container'>
          <Header />
          <AddTodo addTodo={this.addTodo}/>
          <Todos todos={this.state.todos} toggleCheckbox={this.toggleCheckbox} deleteTodo={this.deleteTodo} />
        </div>
      </div>
    );
  }
}

export default App;