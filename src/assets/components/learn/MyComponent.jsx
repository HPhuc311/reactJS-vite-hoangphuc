//arrow function 
// const tên () => {}
// component = HTML + CSS + JS
// JSX
// fragment     
import './style.css';

const MyComponent = () => {
    return (
        <>
            <div>Hello Mấy Phen Update </div>
            <div className="child" style={{
                borderRadius: "10px"
            }}>child</div>
        </>
    );
}

export default MyComponent