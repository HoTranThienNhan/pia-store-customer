import { Button, Card, Col, Image, Input, Row, Tooltip } from 'antd';
import React from 'react';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import imagePoster from '../../assets/images/food-poster.jpg'
import { AuthCard } from './style';

const SignUpPage = () => {
    return (
        <div style={{ padding: '0px 70px', height: '1500px' }}>
            <AuthCard>
                <Row>
                    <Col span={12} style={{ padding: '32px 32px' }}>
                        <h2 style={{ marginBottom: '48px' }}>Chào mừng đến BRANCH NAME</h2>
                        <Col style={{ padding: '20px 50px' }}>
                            <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>
                                Đăng Ký Tài Khoản
                            </h1>
                            <InputFormComponent
                                placeholder="Tài khoản"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                className='auth-input-username'
                            />
                            <Input.Password 
                                placeholder="Mật khẩu"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} 
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                className='auth-input-password'
                            />
                            <Input.Password 
                                placeholder="Nhập lại mật khẩu"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} 
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                className='auth-input-password'
                            />
                            <Button type="primary" className='auth-button-signup' danger>Đăng Ký</Button>
                            <div style={{ marginBottom: '8px' }}>
                                Đã có tài khoản? <a>Đăng nhập</a>
                            </div>
                        </Col>
                    </Col>
                    <Col span={12}>
                        <Image src={imagePoster} preview={false} height={600} style={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }} />
                    </Col>
                </Row>
            </AuthCard>
        </div>
    )
};

export default SignUpPage
