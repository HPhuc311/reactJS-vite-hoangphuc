import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Space, Table } from "antd";
import { useState } from "react";
import ViewBooksDetail from "./view.books";

const BooksTable = (props) => {

    const { dataBooks, current, pageSize, setCurrent, total, setpageSize } = props

    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const [dataDetail, setDataDetail] = useState(null);

    const columns = [
        {
            title: "STT",
            key:"number",
            render: (_, record,index) => {
                return (
                    <>{(index + 1) + (current - 1) * pageSize}</>
                );
            }
        },
        {
            title: 'ID',
            key:'id',
            dataIndex: '_id',
            render: (_, record) => {
                return(
                    <a href="#"
                    onClick={() => {
                        setIsDetailOpen(true)
                        setDataDetail(record)
                    }}
                    >{record._id}</a>
                );
            }

        },
        {
            title: 'Title',
            key:'title',
            dataIndex: 'mainText', 

        },
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'price', 
            render: (text) => {
                if (text) return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text)
            }

        },
        {
            title: 'Quantity',
            key: 'quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Author',
            key:'author',
            dataIndex: 'author',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div style={{ display: "flex", gap: "20px" }}>
                        <EditOutlined style={{ cursor: "pointer", color: "orange" }} />
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            // onConfirm={() => handleDeleteBooks(record._id)}
                            okText="Yes"
                            cancelText="No"
                            placement='left'
                        >
                            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                        </Popconfirm>
                    </div>
                </Space>
            ) 
        },
    ];


    // hàm để thay đổi số trang và các phần tử có trong trang 

    const onChange = (pagination) => {
        //nếu trang thay đổi trang: current
        if(pagination && pagination.current){
            if(+pagination.current !== +current){
                setCurrent(+pagination.current)
            }
        }
        // nếu thay đổi trang: pagesize
        if(pagination && pagination.pageSize){
            if (+pagination.pageSize !== +pageSize) {
                setpageSize(+pagination.pageSize)
            }
        }
    }

    return (
        <>
            <Table 
            dataSource={dataBooks} 
            columns={columns} 
            pagination={
                {
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                }
            }
            onChange={onChange}
            />;
            <ViewBooksDetail
                isDetailOpen={isDetailOpen}
                dataDetail={dataDetail}
                setIsDetailOpen={setIsDetailOpen}
                setDataDetail={setDataDetail}
            />
        </>
    )
}

export default BooksTable;