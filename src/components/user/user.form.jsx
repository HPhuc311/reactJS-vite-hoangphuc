import { Button, Input, notification } from "antd";
import { useState } from "react";
import { createUserApi } from "../../services/api.services";


const UserForm = () => {
    const [fullName, setfullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleClickBtn = async () => {
        const res = await createUserApi(fullName, email, password, phone)
        if (res.data) {
            notification.success({
                message: "Create User",
                description: "Tạo user thành công"
            })
        } else {
            notification.error({
                message: "Error Create User",
                description: JSON.stringify(res.message)
            })
        }

    }

    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
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
                <div>
                    <Button type="primary" onClick={() => handleClickBtn()}> Create User </Button>
                </div>
            </div>
        </div>
    );
}

export default UserForm;