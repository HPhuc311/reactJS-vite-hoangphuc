import { Button, Flex, Input, InputNumber, Modal, Select, Space } from "antd"
import { useState } from "react";

const BooksForm = (props) => {

    const { loadBooks } = props

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")



    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <div className="user-form" style={{ margin: "20px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Table Books</h3>
                    <Button type="primary" onClick={showModal}>
                        Creat a New Book
                    </Button>
                    <Modal
                        title="Basic Modal"
                        closable={{ 'aria-label': 'Custom Close Button' }}
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <div>
                                <span>Title</span>
                                <Input
                                    value={title}
                                    onChange={(event) => {setTitle(event.target.value)}}
                                    
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
                                <Input
                                    value={quantity}
                                    onChange={(event) => {setQuantity(event.target.value) }}
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
                                    onChange={(event) => { setCategory(event)}}
                                />
                            </div>
                            {/* <div>
                                <span></span>
                                <Input/>
                            </div> */}
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default BooksForm