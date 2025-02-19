import { Layout, Row, Col, Typography, Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text } = Typography;

const SallaFooter = () => {
    return (
        <Footer style={{ backgroundColor: '#1c1c1c', color: '#ffffff', padding: '40px 20px', textAlign: 'center' }}>
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={{ color: '#ffffff' }}>About Salla</Title>
                    <Text style={{ color: '#d3d3d3' }}>Your go-to online store for all your needs.</Text>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={{ color: '#ffffff' }}>Quick Links</Title>
                    <Space direction="vertical">
                        <a href="#" style={{ color: '#d3d3d3' }}>Home</a>
                        <a href="#" style={{ color: '#d3d3d3' }}>Shop</a>
                        <a href="#" style={{ color: '#d3d3d3' }}>About Us</a>
                        <a href="#" style={{ color: '#d3d3d3' }}>Contact Us</a>
                    </Space>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={{ color: '#ffffff' }}>Contact Us</Title>
                    <Text style={{ color: '#d3d3d3' }}>Address: 123 Main Street, City, Country</Text><br />
                    <Text style={{ color: '#d3d3d3' }}>Email: info@salla.com</Text><br />
                    <Text style={{ color: '#d3d3d3' }}>Phone: +1234567890</Text>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Title level={4} style={{ color: '#ffffff' }}>Follow Us</Title>
                    <Space size="large">
                        <a href="#" style={{ color: '#d3d3d3' }}><FacebookOutlined style={{ fontSize: '24px' }} /></a>
                        <a href="#" style={{ color: '#d3d3d3' }}><TwitterOutlined style={{ fontSize: '24px' }} /></a>
                        <a href="#" style={{ color: '#d3d3d3' }}><InstagramOutlined style={{ fontSize: '24px' }} /></a>
                    </Space>
                </Col>
            </Row>
            <Text style={{ display: 'block', marginTop: '20px', color: '#d3d3d3' }}>
                &copy; 2025 Salla. All rights reserved.
            </Text>
        </Footer>
    );
};

export default SallaFooter;