import { useState } from "react"
import { createBookApi, handleUploadFile } from "../../services/api.services"
import { Form, Input, InputNumber, Modal, notification, Select } from "antd"

const CreateBooksUnc = (props) => {
    const [form] = Form.useForm()

    const { createOpen, setIsCreatOpen, loadBooks } = props

    const [selectFile, setSelectFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const resetModalAndCloseModal = () => {
        form.resetFields(),
            setSelectFile(null),
            setPreview(null),
            setIsCreatOpen(false)
    }

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

    const submitFile = async (values) => {
        if (!selectFile) {
            notification.error({
                message: "Error Create Book",
                description: "Please upload picture thumbnail"
            })
            return;
        }
        // step1: upload file
        const resUpload = await handleUploadFile(selectFile, "book");
        if (resUpload.data) {
            // success 
            const newThumbnail = resUpload.data.fileUploaded;
            const { mainText, author, price, quantity, category, } = values
            console.log('values', values)
            // step2 : create book
            const resBook = await createBookApi(
                newThumbnail, mainText, author, price, quantity, category,
            );
            if (resBook.data) {
                resetModalAndCloseModal()
                await loadBooks();
                notification.success({
                    message: "Create Book",
                    description: "Create Success Book"
                })
            }
            else {
                notification.error({
                    message: "Error Create Book",
                    description: JSON.stringify(resBook.message)
                })
            }
        } else {
            notification.error({
                message: "Error Upload File",
                description: JSON.stringify(resUpload.message)
            })
        }

    }


    return (
        <>
            <div className="user-form" style={{ margin: "20px 0" }}>
                <Modal
                    title="Basic Modal"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    okText={"Create new book"}
                    open={createOpen}
                    onOk={() => form.submit()}
                    onCancel={() => resetModalAndCloseModal()}
                >
                    <Form form={form} onFinish={submitFile} layout="vertical">
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <Form.Item
                                label="Title"
                                name="mainText"
                                rules={[
                                    {
                                        required: true,
                                        message: "Title must not be blank"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Author"
                                name="author"
                                rules={[
                                    {
                                        required: true,
                                        message: "Author must not be blank"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: "Price must not be blank"
                                    }
                                ]}
                            >
                                <InputNumber style={{ width: "100%" }} addonAfter={"VNĐ"} />
                            </Form.Item>
                            <Form.Item
                                label="Quantity"
                                name="quantity"
                                rules={[
                                    {
                                        required: true,
                                        message: "Quantity must not be blank"
                                    }
                                ]}
                            >
                                <InputNumber style={{ width: "100%" }} />
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
                                    style={{ Width: "100%" }}
                                    name="category"
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
                        </div>
                            <div>
                                <span>Picture Thumbnail</span>
                                <div>
                                    <label htmlFor="btnUpload" style={{
                                        display:"block",
                                        width:"fit-content",
                                        marginTop: "15px",
                                        padding: "5px 10px",
                                        background: "orange",
                                        borderRadius: "5px",
                                        cursor:"pointer"
                                    }}>
                                        Upload
                                    </label>
                                    <input type="file" hidden id="btnUpload"
                                    onChange={(e) => handleOnChangeFile(e)}
                                    onClick={(e) => e.target.value=null}
                                    style={{display:"none"}}
                                    />
                                </div>
                                {preview && 
                                <>
                                    <div style={{marginTop: "10px", marginBottom:"15px", height: "100px", width: "150px"}}>
                                        <img style={{height: "100%", width:"100%", objectFit:"contain"}} src={preview} alt="" />
                                    </div>
                                </>}
                            </div>
                    </Form>
                </Modal>
            </div >
        </>
    )
}

export default CreateBooksUnc