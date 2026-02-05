import { useEffect, useState } from "react";
import BooksTable from "../components/books/books.table";
import { fetchAllBookAPi } from "../services/api.services";
import BooksForm from "../components/books/books.form";

const BooksPage = () => {
    const [dataBooks, setDataBooks] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setpageSize] = useState(5)
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadBooks()
    }, [current, pageSize]);

    const loadBooks = async () => {
        const res = await fetchAllBookAPi(current, pageSize)
        if (res.data) {
            setDataBooks(res.data.result)
            setCurrent(res.data.meta.current)
            setpageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <div style={{padding: "20px"
        }}>
            <BooksForm
            loadBooks={loadBooks}
            />
            <BooksTable
                dataBooks={dataBooks}
                loadBooks={loadBooks}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setpageSize={setpageSize}
                total={total}

            />
        </div>
    )
}

export default BooksPage;