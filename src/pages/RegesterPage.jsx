import React, { useState } from 'react';
import { Button, Form, Input, Alert, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const RegisterPage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const onSubmit = (values) => {
        const { name, email, password } = values;

        if (storedUsers.some(user => user.email === email)) {
            setErrorMessage("The Email already exists");
            return;
        }

        const newUser = {
            id: storedUsers.length + 1, 
            name,
            email,
            password,
            wishlist: []
        };

        const updatedUsers = [...storedUsers, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        setSuccessMessage("Registration Successful! Redirecting to login...");

        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' }}>
            <Card style={{ width: 400, padding: 20, borderRadius: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>Register</Title>

                {errorMessage && <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: 15 }} />}
                {successMessage && <Alert message={successMessage} type="success" showIcon style={{ marginBottom: 15 }} />}

                <Form
                    name="register-form"
                    layout="vertical"
                    onFinish={onSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter your full name!' }]}
                    >
                        <Input placeholder="Enter your full name" />
                    </Form.Item>

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
                            { required: true, message: 'Please input your password!' },
                        ]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block style={{ height: 40, fontSize: 16 }}>
                            Register
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center' }}>
                        <Text>Already have an account?</Text>
                        <Button type="link" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default RegisterPage;
