const TodoData = (props) => {
    const { todoList, deleToDo } = props;
    //props là 1 biến object {}
    //{
    // name: "HoangPhuc",
    // age: 22, 
    // data: {}
    //}
    // ---- destructuring data (Method 1) ----
    // const { name } = props;
    //-----Method 2--------
    // const name = props.name;
    // const age = props.age;
    // const data = props.data;
    //-------Method 3-------

    const handleClick = (id) => {
        deleToDo(id)
    }

    console.log(">> check props", todoList)
    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                console.log(item, index)
                return (
                    <>
                        <div className={`todo-item`} key={item.id}>
                            <div>{item.name}</div>
                            <button
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleClick(item.id)} >
                            Delete</button>
                        </div>
                    </>
                )
            })}
        </div>
    );
}

export default TodoData