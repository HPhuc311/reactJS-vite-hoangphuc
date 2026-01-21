const TodoData = (props) => {

    //props là 1 biến object {}
    //{
    // name: "HoangPhuc",
    // age: 22, 
    // data: {}
    //}
    // ---- destructuring data (Method 1) ----
    const { name } = props;
    //-----Method 2--------
    // const name = props.name;
    // const age = props.age;
    // const data = props.data;
    //-------Method 3-------

    console.log(">> check props", props)
    return (
        <div className='todo-data'>
            <div>My name is {name}</div>
            <div>Learning REACT</div>
            <div>Watching Youtube</div>
            <div>
                {JSON.stringify(props.todoList)}
            </div>
        </div>
    );
}

export default TodoData