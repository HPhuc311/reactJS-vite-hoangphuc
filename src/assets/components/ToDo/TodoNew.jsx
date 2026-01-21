import { useState } from "react"

const TodoNew = (props) => {
    // useStateHook (getter, setter)
    // const valueInput = "Hello";
    const [valueInput, setValueInput] = useState("ericsss")
    
    const { addNewTodo } = props;

    // addNewTodo("hoangphuc")
    const handleClick = () => {
        addNewTodo(valueInput)
        setValueInput(""); // giá trị nhập xong sẽ được làm cho ô nhập vào rỗng
    }
    // lấy giá trị ô input
    const handleChange = (name) => {
        setValueInput(name)
    }

    return (
        <div className='todo-new'>
            <input type="text" placeholder='Enter your task' 
            onChange={(event) => {handleChange(event.target.value)}}
            value={valueInput} // kiểm soát giá trị đầu vào
            />
            <button
                style={{ cursor: "pointer" }}
                onClick={handleClick}
            >Add</button>
        </div>
    );
}

export default TodoNew