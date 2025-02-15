import React, { useState } from 'react';
import { Button, Form, Input, Alert, Card, Typography, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componante/Navbar';
import SallaFooter from '../componante/footer';
import SallaHeader from '../componante/loginHeader';
import LoginHeader from '../componante/loginHeader';

const { Title, Text } = Typography;

const LoginPage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const onSubmit = (values) => {
        const { email, password } = values;

        if (email === "admin@gmail.com" && password === "admin123") {
            localStorage.setItem('currentUser', JSON.stringify({ email, role: "admin", name: "Admin", wishlist: [] }));
            navigate('/Admin');
            return;
        }

        const foundUser = storedUsers.find(user => user.email === email && user.password === password);

        if (foundUser) {
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            navigate('/', { replace: true });
        } else {
            setErrorMessage("Invalid Email or Password");
        }
    };

    return (
        <>
        <Navbar/>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '95vh', backgroundColor: '#f4f4f4',paddingLeft: '20px',paddingRight: '20px' }}>
           
           {/* Hide LoginHeader on small screens */}
           <Col xs={0} sm={0} md={12} lg={10} xl={8}>
                        <LoginHeader />
                    </Col>
            
            <Card style={{ width: 400, padding: 20, borderRadius: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>Login</Title>

                {errorMessage && <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: 15 }} />}

                <Form
                    name="login-form"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { type: 'email', message: 'The input is not a valid E-mail!' },
                            { required: true, message: 'Please input your Email!' },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'Password must contain at least 8 characters, including letters and numbers!' },
                            { required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block style={{ height: 40, fontSize: 16 }}>
                            Login
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center' }}>
                        <Text>Don't have an account?</Text>
                        <Button type="link" onClick={() => navigate('/register')}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
        <SallaFooter/>
        </>
    );
};

export default LoginPage;
