import { Button, Col, Form, Image, Row } from 'antd';
import React, { useState } from 'react';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import imagePoster from '../../assets/images/food-poster.jpg'
import { AuthCard } from './style';
import { useNavigate } from 'react-router-dom';
import InputPasswordComponent from '../../components/InputPasswordComponent/InputPasswordComponent';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // mutation
    const mutation = useMutationHooks(
        data => UserService.signupUser(data)
    );

    const { data, isLoading } = mutation;

    // hooks
    const handleOnChangeEmail = (value) => {
        setEmail(value);
    }

    const handleOnChangePassword = (value) => {
        setPassword(value);
    }

    const handleOnChangeConfirmPassword = (value) => {
        setConfirmPassword(value);
    }

    const handleSignup = () => {
        mutation.mutate({
            email,
            password,
            confirmPassword
        })
    }

    // navigation
    const handleNavigateSignin = () => {
        navigate('/signin');
    }
    const handleNavigateHomepage = () => {
        navigate('/');
    }

    return (
        <div style={{ padding: '0px 70px', height: '1500px' }}>
            <AuthCard>
                <Row>
                    <Col span={12} style={{ padding: '32px 32px' }}>
                        <h2 style={{ marginBottom: '48px' }}>
                            Chào mừng đến <span onClick={handleNavigateHomepage} style={{ cursor: 'pointer' }}>BRANCH NAME</span>
                        </h2>
                        <Col style={{ padding: '20px 50px' }}>
                            <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>
                                Đăng Ký Tài Khoản
                            </h1>
                            <Form autoComplete="off">
                                <Form.Item
                                    label=""
                                    validateStatus={"validating"}
                                    help=""
                                    style={{ marginBottom: '0px' }}
                                    className='auth-form-item-email'
                                >
                                    <InputFormComponent
                                        placeholder="Tài khoản"
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        className='auth-input-email'
                                        value={email}
                                        onChange={handleOnChangeEmail}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label=""
                                    validateStatus={"validating"}
                                    help=""
                                    style={{ marginBottom: '0px' }}
                                    className='auth-form-item-password'
                                >
                                    <InputPasswordComponent
                                        placeholder="Mật khẩu"
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        className='auth-input-password'
                                        value={password}
                                        onChange={handleOnChangePassword}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label=""
                                    validateStatus={"validating"}
                                    help=""
                                    style={{ marginBottom: '0px' }}
                                    className='auth-form-item-confirm-password'
                                >
                                    <InputPasswordComponent
                                        placeholder="Nhập lại mật khẩu"
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        className='auth-input-password'
                                        value={confirmPassword}
                                        onChange={handleOnChangeConfirmPassword}
                                    />
                                </Form.Item>
                                {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                                <Form.Item>
                                    <LoadingComponent isLoading={isLoading}>
                                        <Button
                                            disabled={!email.length || !password.length || !confirmPassword.length}
                                            type="primary"
                                            htmlType='submit'
                                            className='auth-button-signup'
                                            onClick={handleSignup}
                                            danger
                                        >
                                            Đăng Ký
                                        </Button>
                                    </LoadingComponent>
                                </Form.Item>
                            </Form>
                            <div style={{ marginBottom: '8px' }}>
                                Đã có tài khoản? <a onClick={handleNavigateSignin}>Đăng nhập</a>
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
