import { useState } from 'react';
import './assets/components/ToDo/todo.css';
import TodoData from './assets/components/ToDo/TodoData';
import TodoNew from './assets/components/ToDo/TodoNew';
import reactLogo from './assets/react.svg'


const App = () => {

  const [todoList, setTodoList] = useState([
    // {id: 1, name: "Learning React"},
    // {id: 2, name: "Watching Youtube"}
  ])



  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      name: name
    }
    setTodoList([...todoList, newTodo])
  }

  // Tạo 1 id ngẫu nhiên
  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew
        addNewTodo={addNewTodo}
      />

      {todoList.length > 0 ?
        <TodoData
          todoList={todoList}
        />
        :
        <div className="todo-image">
          <img className='logo' src={reactLogo} />
        </div>

      }
    </div>
  )
}

export default App
