import './assets/components/ToDo/todo.css';
import TodoData from './assets/components/ToDo/TodoData';
import TodoNew from './assets/components/ToDo/TodoNew';
import reactLogo from './assets/react.svg'


const App = () => {

  const name = "HoangPhuc";
  const age = 25;
  const data = {
    address: "hcm",
    country: "vie"
  }

  return (
    <div className="todo-container"> 
        <div className="todo-title">Todo List</div>
        <TodoNew/>
        <TodoData
        name = {name}
        age = {age}
        data = {data}
        />
        <div className="todo-image">
          <img className='logo' src={reactLogo}/>
        </div>
    </div>
  )
}

export default App
