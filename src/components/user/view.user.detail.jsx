import { Button, Drawer } from "antd";

const ViewUserDetails = (props) => {

    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;

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
                    <div >
                        <img height={100} width={150}
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
                        <input type="file" id="btnInput" hidden />
                    </div>
                    {/* <Button type="primary">Upload a Avatar</Button> */}
                </> :
                <>
                    <p>Không có dữ liệu nèo</p>
                </>

            }
        </Drawer>
    );
}

export default ViewUserDetails;