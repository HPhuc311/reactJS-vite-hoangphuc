import { Drawer } from "antd";

const ViewUserDetails = (props) => {

    const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;

    return(
        <Drawer
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
            
            </>:
            <>
            <p>Không có dữ liệu nèo</p>
            </>

            }
        </Drawer>
    );
}
 
export default ViewUserDetails;