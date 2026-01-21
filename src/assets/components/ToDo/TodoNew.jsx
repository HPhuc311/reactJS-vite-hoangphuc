import { useState } from "react"

const TodoNew = (props) => {
    // useStateHook (getter, setter)
    // const valueInput = "Hello";
    const [valueInput, setValueInput] = useState("ericsss")
    
    const { addNewTodo } = props;

    // addNewTodo("hoangphuc")
    const handleClick = () => {
        addNewTodo(valueInput)
    }
    // lấy giá trị ô input
    const handleChange = (name) => {
        setValueInput(name)
    }

    return (
        <div className='todo-new'>
            <input type="text" placeholder='Enter your task' 
            onChange={(event) => {handleChange(event.target.value)}}
            />
            <button
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add</button>
        </div>
    );
}

export default TodoNew