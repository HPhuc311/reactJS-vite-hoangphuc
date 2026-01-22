import { useState } from 'react';
import './components/ToDo/todo.css';
import TodoData from './components/ToDo/TodoData';
import TodoNew from './components/ToDo/TodoNew';
import reactLogo from './assets/react.svg'
import Header from './components/layout/header';
import Footer from './components/layout/footer';


const App = () => {

  // thay đổi trạng thái của list 
  const [todoList, setTodoList] = useState([])

  // thêm mới 1 dữ liệu cho list
  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000000),
      name: name
    }

    // copy hết tất cả phần tử có trong mảng và thêm 1 giá trị phí sau nó
    setTodoList([...todoList, newTodo])
    console.log(newTodo)
  }

  // Tạo 1 id ngẫu nhiên
  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Xoá 1 dữ liệu trong bảng dựa vào id 
  const deleToDo = (id) => {
    //lọc các phần tử có id giống nhau 
    const newTodo = todoList.filter(item => item.id !== id)
    setTodoList(newTodo);
  }

  return (
    <>
    <Header/>
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew
        addNewTodo={addNewTodo}
      />

      {todoList.length > 0 ?
        <TodoData
          todoList={todoList}
          deleToDo={deleToDo}
        />
        :
        <div className="todo-image">
          <img className='logo' src={reactLogo} />
        </div>

      }
    </div>
    <Footer/>
    </>
    
  )
}

export default App
