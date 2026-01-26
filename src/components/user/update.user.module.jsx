import { useEffect, useState } from "react";
import { Input, Modal, notification } from "antd";
import {updateUserApi } from "../../services/api.services";

const UpdateUserModal = (props) => {
    const [fullName, setfullName] = useState("");
    const [id, setId] = useState("");
    const [phone, setPhone] = useState("");

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props

    //next dataUpdate != rpev dataUpdate 
    useEffect(() => {
        console.log("check dataUpdate", dataUpdate)
        if (dataUpdate) {
            setId(dataUpdate._id);
            setfullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate])

    const handleSubmitBtn = async () => {

        const res = await updateUserApi(id, fullName, phone);
        if (res.data) {
            notification.success({
                message: "Update User",
                description: "Update user thành công"
            })
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "Error Update User",
                description: JSON.stringify(res.message)
            })
        }

    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false)
        setId("")
        setfullName("")
        setPhone("")
        setDataUpdate(null)
    }

    return (
        <Modal title="Update a User"

            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Save"}>
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
                <div>
                    <span>FullName</span>
                    <Input
                        onChange={(event) => { setfullName(event.target.value) }}
                        value={fullName}
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
    );

}

export default UpdateUserModal