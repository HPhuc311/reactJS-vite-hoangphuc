//arrow function 
// const tên () => {}
// component = HTML + CSS + JS
// JSX
// fragment     
import './style.css';

const MyComponent = () => {
    // const hoidanit = "Douple Hello"; //string
    // const hoidanit = 25; // number
    // const hoidanit = true; // boolean
    const hoidanit = [1 , 2 , 4]; 
    // const hoidanit = {
    //     name: "Phuc",
    //     age: 18
    // } Object

    return (
        <>
            <div> {JSON.stringify(hoidanit)}Hello Mấy Phen Update </div>
            <div>{console.log("hoangphuc")}</div>
            <div className="child" style={{
                borderRadius: "10px"
            }}>child</div>
        </>
    );
}

export default MyComponent