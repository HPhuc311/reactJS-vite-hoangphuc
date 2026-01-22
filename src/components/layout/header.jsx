import { Link } from 'react-router-dom';
import './header.css'


// Link giúp trang không bị reload tăng trải nghiệm của người dùng
const Header = () => {
    return (
        <ul>
            <li><Link className="active" to="#home">Home</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/products">Products</Link></li>
        </ul>

    );

}

export default Header;