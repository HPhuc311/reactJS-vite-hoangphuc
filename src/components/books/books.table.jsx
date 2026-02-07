import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, notification, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { deleteBookApi, fetchAllBookAPi } from "../../services/api.services";
import BookDetails from "./books.details";
import CreateBooks from "./books.create";
import CreateBooksUnc from "./books.create.unc";
import UpdateBooks from "./book.update";
import UpdateBooksUnc from "./book.update.unc";

const BooksTable = (props) => {


    const [dataBooks, setDataBooks] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0);


    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const [createOpen, setIsCreateOpen] = useState(false)

    const [dataUpdate, setDataUpdate] = useState(null);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)


    useEffect(() => {
        loadBooks()
    }, [current, pageSize]);


    const loadBooks = async () => {
        const res = await fetchAllBookAPi(current, pageSize)
        if (res.data) {
            setDataBooks(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    const handleDeleteBook = async (id) => {

    }

    // hàm để thay đổi số trang và các phần tử có trong trang

    const onChange = (pagination) => {
        //nếu trang thay đổi trang: current
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)
            }
        }
        // nếu thay đổi trang: pagesize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    }


    const handleDeleteBooks = async (id) => {
        const res = await deleteBookApi(id);
        if (res.data) {
            notification.success({
                message: "Delete User",
                description: "Delete User Thành Công"
            })
            await loadBooks();
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
            key: "number",
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + (current - 1) * pageSize}</>
                );
            }
        },
        {
            title: 'ID',
            key: 'id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
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
            key: 'title',
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
            key: 'author',
            dataIndex: 'author',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div style={{ display: "flex", gap: "20px" }}>
                        <EditOutlined style={{ cursor: "pointer", color: "orange" }} 
                        onClick={() => {
                            setDataUpdate(record)
                            setIsModalUpdateOpen(true)
                        }}/>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => handleDeleteBooks(record._id)}
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





    return (
        <>

            <div style={{display: "flex", justifyContent: "space-between", margin: "10px 0"}}>
                <h3>Table of Books</h3>
                <Button type="primary" onClick={() => setIsCreateOpen(true)}>
                    Creat New Book
                </Button>
            </div>
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

            <BookDetails
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
            />

            <CreateBooks
                createOpen={createOpen}
                setIsCreatOpen={setIsCreateOpen}
                loadBooks={loadBooks}
            />
            {/* <CreateBooksUnc
                createOpen={createOpen}
                setIsCreatOpen={setIsCreateOpen}
                loadBooks={loadBooks}
            /> */}


            {/* <UpdateBooks
                isModalUpdateOpen={isModalUpdateOpen} 
                dataUpdate = {dataUpdate}
                setIsModalUpdateOpen = {setIsModalUpdateOpen}
                setDataUpdate = {setDataUpdate}
                loadBooks={loadBooks}
            /> */}

            <UpdateBooksUnc
                isModalUpdateOpen={isModalUpdateOpen} 
                dataUpdate = {dataUpdate}
                setIsModalUpdateOpen = {setIsModalUpdateOpen}
                setDataUpdate = {setDataUpdate}
                loadBooks={loadBooks}
            />



        </>
    )
}

export default BooksTable;