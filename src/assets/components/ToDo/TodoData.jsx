const TodoData = (props) => {
    const { todoList } = props;
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

    console.log(">> check props", todoList)
    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                console.log(item, index)
                return (
                    <>
                        <div className="todo-item">
                            <div>{item.name}</div>
                            <button>Delete</button>
                        </div>
                    </>
                )
            })}
            <div>
                {JSON.stringify(props.todoList)}
            </div>
        </div>
    );
}

export default TodoData