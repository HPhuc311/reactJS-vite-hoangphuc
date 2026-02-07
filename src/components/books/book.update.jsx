import { Input, InputNumber, Modal, notification, Select } from "antd"
import { useEffect, useState } from "react"
import { handleUploadFile, updateBooksApi } from "../../services/api.services"

const UpdateBooks = (props) => {
    const { isModalUpdateOpen, dataUpdate, setIsModalUpdateOpen, setDataUpdate, loadBooks } = props

    const [id, setId] = useState("")
    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")

    const [selectFile, setSelectFile] = useState(null)
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            setId(dataUpdate._id)
            setMainText(dataUpdate.mainText)
            setAuthor(dataUpdate.author)
            setPrice(dataUpdate.price)
            setQuantity(dataUpdate.quantity)
            setCategory(dataUpdate.category)
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

    const updateBooks = async (newThumbnail) => {
        const resBook = await updateBooksApi(
            id, newThumbnail, mainText, author, price, quantity, category
        );

        if(resBook.data){
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

    const submitFile = async () =>{
        // không có ảnh preview + không có file => return
        if (!selectFile && !preview){
            notification.error({
                message: "Error update book",
                description: "Please upload thumbnail"
            })
            return
        }

        let newThumbnail = "";
        // có ảnh preview và không có file => không upload ảnh 
        if (!selectFile && preview){
            // do nothing 
            newThumbnail = dataUpdate.thumbnail
        } else {
            // có ảnh preview và có file => upload file 
            const resUpload = await handleUploadFile(selectFile, "book");
            if(resUpload.data) {
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
        await updateBooks(newThumbnail);
    }

    
    const resetModalAndCloseModal = () => {
        setPrice("")
        setQuantity("")
        setCategory("")
        setSelectFile(null)
        setPreview(null)
        setIsModalUpdateOpen(false)
        setAuthor("")
        setId("")
        setMainText("")
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
                        onOk={() => submitFile()}
                        onCancel={() => resetModalAndCloseModal()}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <div>
                                <span>Id</span>
                                <Input
                                    value={id}
                                    onChange={(event) => { setId(event.target.value) }}
                                    disabled
                                />
                            </div>
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

export default UpdateBooks