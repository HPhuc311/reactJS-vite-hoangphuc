/* eslint-disable no-unused-vars */
import { Link, NavLink } from 'react-router-dom';
import './header.css'


// Link giúp trang không bị reload tăng trải nghiệm của người dùng
// NavLink giúp thêm class active khi điều hướng trang
const Header = () => {
    return (
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/users">Users</NavLink></li>
            <li><NavLink to="/books">Books</NavLink></li>
        </ul>

    );

}

export default Header;