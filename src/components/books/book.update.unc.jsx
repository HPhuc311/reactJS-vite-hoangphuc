import { Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useEffect, useState } from "react"
import { handleUploadFile, updateBooksApi } from "../../services/api.services"

const UpdateBooksUnc = (props) => {
    const { isModalUpdateOpen, dataUpdate, setIsModalUpdateOpen, setDataUpdate, loadBooks } = props

    const [form] = Form.useForm()

    const [selectFile, setSelectFile] = useState(null)
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category
            })
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectFile(null);
            setPreview(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setSelectFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    const updateBooks = async (newThumbnail, values) => {
        const { id, mainText, author, price, quantity, category } = values;
        const resBook = await updateBooksApi(
            id, newThumbnail, mainText, author, price, quantity, category
        );

        if (resBook.data) {
            resetModalAndCloseModal()
            await loadBooks();
            notification.success({
                message: "Upadate Books",
                description: "Update Books Success"
            })
        } else {
            notification.error({
                message: "Upadate Error Books",
                description: JSON.stringify(resBook.message)
            })
        }
    }

    const submitFile = async (values) => {
        // không có ảnh preview + không có file => return
        if (!selectFile && !preview) {
            notification.error({
                message: "Error update book",
                description: "Please upload thumbnail"
            })
            return
        }

        let newThumbnail = "";
        // có ảnh preview và không có file => không upload ảnh 
        if (!selectFile && preview) {
            // do nothing 
            newThumbnail = dataUpdate.thumbnail
        } else {
            // có ảnh preview và có file => upload file 
            const resUpload = await handleUploadFile(selectFile, "book");
            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error Upload File",
                    description: JSON.stringify(resUpload.message)
                });
                return;
            }
        }

        // Step 2: Update File 
        await updateBooks(newThumbnail, values);
    }


    const resetModalAndCloseModal = () => {
        form.resetFields()
        setSelectFile(null)
        setPreview(null)
        setIsModalUpdateOpen(false)
    }


    return (
        <div>
            <div className="user-form" style={{ margin: "20px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Modal
                        title="Basic Modal"
                        closable={{ 'aria-label': 'Custom Close Button' }}
                        okText={"Upload a Book"}
                        open={isModalUpdateOpen}
                        onOk={() => form.submit()}
                        onCancel={() => resetModalAndCloseModal()}
                    >
                        <Form form={form} onFinish={submitFile} layout="vertical">
                            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                                <Form.Item
                                    label="ID"
                                    name="id"
                                >
                                    <Input
                                        disabled
                                    />
                                </Form.Item>
                                <Form.Item
                                label="Title"
                                name="mainText"
                                rules={[
                                    {
                                        required: true,
                                        message:"Title must not be blank"
                                    }
                                ]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    label="Author"
                                    name="author"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Author must not be blank"
                                        }
                                    ]}>
                                    <Input
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Price"
                                    name="price"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Title must not be blank"
                                        }
                                    ]}>
                                    <InputNumber style={{ width: '100%' }} addonAfter="VNĐ"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Quantity"
                                    name="quantity"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Quantity must not be blank"
                                        }
                                    ]}>
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    label="Category"
                                    name="category"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Category must not be blank"
                                        }
                                    ]}
                                >
                                    <Select
                                        name="category"
                                        style={{ width: "100%" }}
                                        allowClear
                                        options={[
                                            { value: 'Arts', label: 'Arts' },
                                            { value: 'Business', label: 'Business' },
                                            { value: 'Comics', label: 'Comics' },

                                            { value: 'Cooking', label: 'Cooking' },
                                            { value: 'Entertainment', label: 'Entertainment' },
                                            { value: 'History', label: 'History' },

                                            { value: 'Music', label: 'Music' },
                                            { value: 'Sports', label: 'Sports' },
                                            { value: 'Teen', label: 'Teen' },
                                            { value: 'Travel', label: 'Travel' },
                                        ]}
                                    />
                                </Form.Item>
                                <div>
                                    <span>Thumbnail</span>
                                    <div>
                                        <label htmlFor="btnUpload" style={{
                                            display: "block",
                                            width: "fit-content",
                                            marginTop: "15px",
                                            padding: "5px 10px",
                                            background: "orange",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}>
                                            Upload
                                        </label>
                                        <input type="file" hidden id="btnUpload"
                                            onChange={(event) => handleOnChangeFile(event)}
                                            onClick={(event) => event.target.value = null}
                                            style={{display: "none"}}
                                        />
                                    </div>
                                    {preview &&
                                        <>
                                            <div style={{
                                                marginTop: "10px",
                                                marginBottom: "15px",
                                                height: "100px",
                                                width: "150px"
                                            }}>
                                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }} src={preview} alt="" />
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default UpdateBooksUnc