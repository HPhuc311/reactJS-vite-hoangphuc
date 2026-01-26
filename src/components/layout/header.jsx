/* eslint-disable no-unused-vars */
import { Link,} from 'react-router-dom';
import { Menu } from 'antd';
import {BookOutlined, HomeOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useState } from 'react';


// Link giúp trang không bị reload tăng trải nghiệm của người dùng
// NavLink giúp thêm class active khi điều hướng trang
const Header = () => {

    const [current, setCurrent] = useState('mail');
    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };


    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'products',
            icon: <BookOutlined />,
        },
    ];

    
    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />

    );

}

export default Header;