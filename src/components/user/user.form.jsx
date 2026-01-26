import { Button, Input, Modal, notification } from "antd";
import { useState } from "react";
import { createUserApi } from "../../services/api.services";


const UserForm = () => {
    const [fullName, setfullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setisModalOpen] = useState(false)

    const handleSubmitBtn = async () => {

        const res = await createUserApi(fullName, email, password, phone)
        if (res.data) {
            notification.success({
                message: "Create User",
                description: "Tạo user thành công"
            })
            setisModalOpen(false)
        } else {
            notification.error({
                message: "Error Create User",
                description: JSON.stringify(res.message)
            })
        }

    }

    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button type="primary" onClick={() => setisModalOpen(true)}> Create User </Button>
            </div>
            <Modal title="Create User"

                open={isModalOpen}
                onOk={() => handleSubmitBtn}
                onCancel={() => setisModalOpen(false)}
                maskClosable={false}
                okText={"Create"}>
                <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                    <div>
                        <span>FullName</span>
                        <Input
                            onChange={(event) => { setfullName(event.target.value) }}
                            value={fullName}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            onChange={(event) => { setEmail(event.target.value) }}
                            value={email}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            onChange={(event) => { setPassword(event.target.value) }}
                            value={password}
                        />
                    </div>
                    <div>
                        <span>Phone Number</span>
                        <Input
                            onChange={(event) => { setPhone(event.target.value) }}
                            value={phone} />
                    </div>
                </div>
            </Modal>

        </div>
    );
}

export default UserForm;