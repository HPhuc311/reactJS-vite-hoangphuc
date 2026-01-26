import {Table} from 'antd';
import { fetchAllUserAPi } from '../../services/api.services';
import { useEffect, useState } from 'react';


const UserTable = () => {

    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        console.log(">>> run useEffect 111")
        loadUser()

    }, []);

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'fullName',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
    ];

    const loadUser = async () => {
        const res = await fetchAllUserAPi()
        setDataUsers(res.data)
    }


    console.log(">>> run render 000")

    return(
        <Table 
        columns={columns} 
        dataSource={dataUsers} 
        rowKey={"_id"} />
    );


}

export default UserTable;