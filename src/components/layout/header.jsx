/* eslint-disable no-unused-vars */
import { Link, } from 'react-router-dom';
import { Menu } from 'antd';
import { AliwangwangFilled, AliwangwangOutlined, BookOutlined, HomeOutlined, LoginOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Children, useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';


// Link giúp trang không bị reload tăng trải nghiệm của người dùng
// NavLink giúp thêm class active khi điều hướng trang
const Header = () => {

    const [current, setCurrent] = useState('');
    const { user } = useContext(AuthContext);

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

        ...(!user.id ? [{
            label: <Link to={"/login"}>Login</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }] : []),


        ...(user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: 'Log Out',
                    key: "login",
                },
            ]
        },] : []),

    ];


    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />

    );

}

export default Header;