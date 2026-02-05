import { Drawer } from "antd";
import { useState } from "react";

const ViewBooksDetail = (props) => {

    const {
        isDetailOpen,
        dataDetail,
        setIsDetailOpen,
        setDataDetail } = props


    return (
        <>
            <Drawer
                title="View Book Detail"
                closable={{ 'aria-label': 'Close Button' }}
                width={"25vw"}
                onClose={() => {
                    setIsDetailOpen(false)
                    setDataDetail(null)
                }}
                open={isDetailOpen}
            >
                {dataDetail ?
                    <>
                        <p>ID: {dataDetail._id}</p>
                        <br />
                        <p>Title: {dataDetail.mainText}</p>
                        <br />
                        <p>Author: {dataDetail.author}</p>
                        <br />
                        <p>Price: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataDetail.price)}</p>
                        <br />
                        <p>Category: {dataDetail.category}</p>
                        <br />
                        <p>Quanntity: {dataDetail.quantity}</p>
                        <br />
                        <p>Sold: {dataDetail.sold}</p>
                        <br />
                        <div>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`} alt="" />
                        </div>
                    </> : <></>}
            </Drawer>
        </>
    )
}

export default ViewBooksDetail;