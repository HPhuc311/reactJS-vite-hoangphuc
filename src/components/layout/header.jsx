/* eslint-disable no-unused-vars */
import { Link, useNavigate, } from 'react-router-dom';
import { Menu, message } from 'antd';
import { AliwangwangFilled, AliwangwangOutlined, BookOutlined, HomeOutlined, LoginOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Children, useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logOutApi } from '../../services/api.services';


// Link giúp trang không bị reload tăng trải nghiệm của người dùng
// NavLink giúp thêm class active khi điều hướng trang
const Header = () => {
    const [current, setCurrent] = useState('');

    const { user, setUser } = useContext(AuthContext);

        const navigate = useNavigate(); 

    const handleLogOut = async() => {
        const res = await logOutApi();
        if(res.data){
            // Clear data
            localStorage.removeItem("access_token")
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            message.success("Logout Success");
            // redirect to home 
            navigate("/");
        }
    }




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
                    label: <span onClick={() => handleLogOut()}>Log Out</span>,
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