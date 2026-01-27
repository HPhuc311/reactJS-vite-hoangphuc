import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Space, Table } from 'antd';
import UpdateUserModal from './update.user.module';
import { useState } from 'react';
import ViewUserDetails from './view.user.detail';
import { deleteUserApi } from '../../services/api.services';



const UserTable = (props) => {
    const { dataUsers, loadUser } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)

    const [dataUpdate, setDataUpdate] = useState(null);

    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const [dataDetail, setDataDetail] = useState(null);

    const handleDeleteUser = async (id) => {
        const res = await deleteUserApi(id);
        if (res.data){
            notification.success({
                message: "Delete User",
                description: "Delete User Thành Công"
            })
            await loadUser();
        } else {
            notification.error({
                message: "Error Delete User",
                description: JSON.stringify(res.message)
            })
        }
    }

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                console.log("check index", index)
                return(
                    <>{index + 1}</>
                );
            }
        },
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
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => handleDeleteUser(record._id)}
                            okText="Yes"
                            cancelText="No"
                            placement='left'
                        >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                        </Popconfirm>
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
                loadUser={loadUser}
            />
        </>
    );


}

export default UserTable;