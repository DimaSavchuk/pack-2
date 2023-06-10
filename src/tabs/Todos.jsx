import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

const LS_KEY = 'todos'
export class Todos extends Component {
  state = {
    todos: [],
  }
  componentDidMount(){
    const savedTodos = localStorage.getItem(LS_KEY);
   if (savedTodos){
    this.setState({todos: JSON.parse(savedTodos)})
   }
  }
  componentDidUpdate = (prevProps, prevState) => {
    const {todos} = this.state;
    if(prevState.todos !== todos){
      localStorage.setItem(LS_KEY, JSON.stringify(todos))
    }
  }
  
  addTodo =(text) =>{
    const newTodo ={
      text,
      id: nanoid()
    }
    this.setState(prevState => ({todos: [...prevState.todos, newTodo]}))
  }
  deleteTodo = (id) =>{
this.setState(prevState => ({todos: prevState.todos.filter(item => item.id !== id)}))
  }
  render() {
    const {todos} = this.state;
    return (
      <>
       <SearchForm onSubmit={this.addTodo} />
       <Grid>{todos.map(({text, id}, idx) => (
        <GridItem key={id}>
        <Todo text={text} count={idx + 1} onDelete={this.deleteTodo} id={id}/>
      </GridItem>
       )
       
       )}</Grid>
       </>
      
    );

  }
}
