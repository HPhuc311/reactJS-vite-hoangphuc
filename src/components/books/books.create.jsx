import { useState } from "react"
import { createBookApi, handleUploadFile } from "../../services/api.services"
import { Input, InputNumber, Modal, notification, Select } from "antd"

const CreateBooks = (props) => {
    const { createOpen, setIsCreatOpen, loadBooks} = props

    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")

    const [selectFile, setSelectFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const [loadCreate, setLoadCreate] = useState(false)

    const resetModalAndCloseModal = () => {
        setMainText(),
            setAuthor(),
            setPrice(),
            setQuantity(),
            setCategory(),
            setSelectFile(null),
            setPreview(null)
            // setIsCreatOpen(false)
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

    const submitFile = async () => {
        setLoadCreate(true)
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
        setLoadCreate(false)
    }


    return (
        <div>
            <div className="user-form" style={{ margin: "20px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Modal
                        title="Basic Modal"
                        closable={{ 'aria-label': 'Custom Close Button' }}
                        okText={"Create new book"}
                        okButtonProps={{
                            loading: {}
                        }}
                        open={createOpen}
                        onOk={() => submitFile()}
                        onCancel={() => resetModalAndCloseModal()}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <div>
                                <span>Title</span>
                                <Input
                                    value={mainText}
                                    onChange={(event) => { setMainText(event.target.value) }}

                                />
                            </div>
                            <div>
                                <span>Author</span>
                                <Input
                                    value={author}
                                    onChange={(event) => { setAuthor(event.target.value) }}
                                />
                            </div>
                            <div>
                                <span>Price</span>
                                <InputNumber style={{ width: '100%' }} addonAfter="VNĐ"
                                    onChange={(event) => { setPrice(event) }}
                                    value={price}
                                />
                            </div>
                            <div>
                                <span>Quantity</span>
                                <InputNumber
                                    style={{ width: '100%' }}
                                    value={quantity}
                                    onChange={(event) => { setQuantity(event) }}
                                />
                            </div>
                            <div>
                                <span>Category</span>
                                <Select
                                    value={category}
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
                                    onChange={(event) => { setCategory(event) }}
                                />
                            </div>
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
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default CreateBooks