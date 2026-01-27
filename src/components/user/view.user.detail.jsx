import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateAvatarApi } from "../../services/api.services";

const ViewUserDetails = (props) => {

    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail, loadUser } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);


    const handleOnChangFile = (event) => {

        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return;
        }

        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleUpdateUserAvatar = async () => {
        //step1 : upload file 
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            const resUpdateAvatar = await updateAvatarApi(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone)
            // step2: update user 
            if (resUpdateAvatar.data) {
                setIsDetailOpen(false)
                setSelectedFile(null)
                setPreview(null)
                await loadUser();
                notification.success({
                    message: "Succes Upload File",
                    description: "Update avatar thành công"
                })
            } else {
                notification.error({
                    message: "Error Upload File",
                    description: JSON.stringify(resUpload.message)
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
        <Drawer
            width={"40vw"}
            title="Basic Drawer"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={() => {
                setDataDetail(null)
                setIsDetailOpen(false)
            }}
            open={isDetailOpen}
        >
            {dataDetail ?
                <>
                    <p>ID: {dataDetail._id}</p>
                    <br />
                    <p>Full Name: {dataDetail.fullName}</p>
                    <br />
                    <p>Email: {dataDetail.email}</p>
                    <br />
                    <p>Phone Number: {dataDetail.phone}</p>
                    <br />
                    <p>Avatar:</p>
                    <br />
                    <div style={{ marginTop: "10px", height: "100px", width: "150px", border: "1px solid #ccc" }} >
                        <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} alt="" />
                    </div>
                    <div>
                        <label htmlFor="btnInput"
                            style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "5px 10px",
                                background: "orange",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >Upload a Avatar</label>
                        <input
                            onChange={(event) => handleOnChangFile(event)}
                            type="file" id="btnInput"
                            hidden
                        />
                    </div>

                    {preview &&
                        <>
                            <div style={{ marginTop: "10px", height: "100px", width: "150px" }} >
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                    src={preview} />
                            </div>
                            <Button type="primary" onClick={() => handleUpdateUserAvatar()}>Save</Button>
                        </>
                    }
                </> :
                <>
                    <p>Không có dữ liệu nèo</p>
                </>

            }
        </Drawer>
    );
}

export default ViewUserDetails;