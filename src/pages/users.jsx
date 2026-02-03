import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { useEffect, useState } from 'react';
import { fetchAllUserAPi } from '../services/api.services';

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);

    const [current, setCurrent] = useState(1)
    const [pageSize, setpageSize] = useState(5)
    const [total, setTotal] = useState(0);


    useEffect(() => {
        loadUser()
    }, [current, pageSize]);


    const loadUser = async () => {
        const res = await fetchAllUserAPi(current, pageSize)
        if (res.data) {
            setDataUsers(res.data.result)
            setCurrent(res.data.meta.current)
            setpageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    console.log("check current: ", current)


    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser} 
                current={current}
                pageSize = {pageSize}
                total = {total}
                setCurrent = {setCurrent}
                setpageSize = {setpageSize}
                />
                

        </div>
    );
}

export default UserPage;
