import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Navigate } from "react-router-dom";
import { Button, Result } from "antd";
import Link from "antd/es/typography/Link";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    if(user && user.id){
        return (<>
            {props.children}
        </>)
    } return (
        <Result
            status="404"
            title="Unauthorized"
            subTitle="You need to log in to access this resources "
            extra={<Button type="primary"><Link to="/">Back To Home Page</Link></Button>}
        />
    )
}

export default PrivateRoute