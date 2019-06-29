import React, {Component} from 'react';

class AddTodo extends Component {

    //important to save fields (name, email, pw, etc.) in state
    state = {
        title: ''
    }

    //this function is only a Component change instead of App change
    //an App change would have the different components interacting
    //ie) adding a new TodoItem to the Todos
    //e.target.name in this case is the AddTodo's title!
    changeTodo = (e) => {
        this.setState({ [e.target.name] : e.target.value});
    }

    //need to prevent default as it will try to submit to the AddTodos.js file
    //after you submit, go ahead and clear the input field
    //flows back upward to App.js, passing on the title
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title: ''});
    }

    //reminder to add an onChange handler if you provide a value field to input
    render(){
        return (
            <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
                <input 
                  type="text"
                  name="title"
                  style={{flex:'10', padding:'5px'}}
                  placeholder="Add Todo..."
                  value={this.state.title}
                  onChange={this.changeTodo}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn"
                  style={{flex: '1'}}

                />
            </form>
        );

    }
}

export default AddTodo;