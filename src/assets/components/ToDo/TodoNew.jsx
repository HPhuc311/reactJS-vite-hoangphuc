const TodoNew = (props) => {
    const { addNewTodo } = props;

    // addNewTodo("hoangphuc")
    const handleClick = () => {
        alert("Click Me")
    }
    // lấy giá trị ô input
    const handleChange = (name) => {
        console.log(">>>> handle on change", name)
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