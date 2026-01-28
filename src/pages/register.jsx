import { Button, Form, Input, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { registerUserApi } from "../services/api.services";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log('values', values)
        const res = await registerUserApi(
            values.fullName, 
            values.email, 
            values.password, 
            values.phone);
        if(res.data){
            notification.success({
                message: "Register User",
                description: "Đăng kí người dùng thành công"
            })
            navigate("/login");
        }else{
            {
                notification.error({
                    message: "Register User Error",
                    description: JSON.stringify(res.message)
                })
            }
        }
    }
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >

            <div style={{ margin: "50px" }}>
                <Form.Item
                    label="Username"
                    name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Full Name"
                    name="fullName"
                rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                rules={[{ required: true, message: 'Please input your email' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[{  
                        required: true,
                        pattern: new RegExp(/\d+/g),
                        message: "Wrong format!"
                    }]}
                >
                    <Input />
                </Form.Item>

                <div>
                    <Button onClick={() => form.submit()} type="primary">Register</Button>
                </div>
            </div>

        </Form>

    );
}

export default RegisterPage;
