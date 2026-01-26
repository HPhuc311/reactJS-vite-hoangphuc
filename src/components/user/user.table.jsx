import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Table } from 'antd';
import UpdateUserModal from './update.user.module';
import { useState } from 'react';
import ViewUserDetails from './view.user.detail';



const UserTable = (props) => {
    const { dataUsers, loadUser } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)

    const [dataUpdate, setDataUpdate] = useState(null);

    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const [dataDetail, setDataDetail] = useState(null);

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href='#'
                    onClick={() => {
                        setIsDetailOpen(true)
                        setDataDetail(record)
                    }}
                    >{record._id}</a>
                );
            }
        },
        {
            title: 'fullName',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div style={{ display: "flex", gap: "20px" }}>
                        <EditOutlined
                            onClick={() => {
                                setDataUpdate(record);
                                setIsModalUpdateOpen(true);
                            }}
                            style={{ cursor: "pointer", color: "orange" }} />
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </div>
                </Space>
            ),
        },
    ];


    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"} />

            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen= {setIsModalUpdateOpen} 
                dataUpdate = {dataUpdate}
                setDataUpdate = {setDataUpdate}
                loadUser={loadUser}
                />

            <ViewUserDetails
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
            />
        </>
    );


}

export default UserTable;