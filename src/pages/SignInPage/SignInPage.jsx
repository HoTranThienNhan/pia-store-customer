import { Button, Col, Form, Image, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import imagePoster from '../../assets/images/food-poster.jpg'
import { AuthCard } from './style';
import { useNavigate } from 'react-router-dom';
import InputPasswordComponent from '../../components/InputPasswordComponent/InputPasswordComponent';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import FloatingLabelComponent from '../../components/FloatingLabelComponent/FloatingLabelComponent';
import * as MessagePopup from '../../components/MessagePopupComponent/MessagePopupComponent';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/userSlice';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // mutation
    const mutation = useMutationHooks(
        data => UserService.signinUser(data)
    );

    const { data, isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess) {
            // if accessToken exists
            if (data?.accessToken) {
                MessagePopup.success();
                handleNavigateHomepage();
                // keep accessToken stored in the browser
                localStorage.setItem('accessToken', JSON.stringify(data?.accessToken));
                // decoded contains elements (id, isAdmin) of access token payload
                const decoded = jwt_decode(data?.accessToken);
                if (decoded?.id) {
                    handleGetUserDetails(decoded.id, data?.accessToken);
                }
            } else {
                MessagePopup.error();
            }
        } else if (isError) {
            MessagePopup.error();
        }
    }, [isSuccess, isError]);

    // navigation
    const handleNavigateSignup = () => {
        navigate('/signup');
    }
    const handleNavigateHomepage = () => {
        navigate('/');
    }

    const handleGetUserDetails = async (id, accessToken) => {
        // res contains user information
        const res = await UserService.getUserDetails(id, accessToken);
        dispatch(updateUser({...res?.data, accessToken: accessToken}));
    }

    // hooks
    const handleOnChangeEmail = (value) => {
        setEmail(value);
    }

    const handleOnChangePassword = (value) => {
        setPassword(value);
    }

    const handleSignin = () => {
        mutation.mutate({
            email,
            password
        });
    }

    return (
        <div style={{ padding: '0px 70px', height: '1500px' }}>
            <AuthCard>
                <Row>
                    <Col span={12} style={{ padding: '32px 32px' }}>
                        <h2 style={{ marginBottom: '48px' }}>
                            Chào mừng đến <span onClick={handleNavigateHomepage} style={{ cursor: 'pointer' }}>BRAND NAME</span>
                        </h2>
                        <Col style={{ padding: '20px 50px' }}>
                            <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>
                                Đăng Nhập Tài Khoản
                            </h1>
                            <Form autoComplete="off">
                                <Form.Item
                                    label=""
                                    validateStatus={"validating"}
                                    help=""
                                    style={{ marginBottom: '0px' }}
                                    className='auth-form-item-email'
                                >
                                    <FloatingLabelComponent label="Tài khoản email" value={email}>
                                        <InputFormComponent
                                            placeholder=""
                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                            className='auth-input-email'
                                            value={email}
                                            onChange={handleOnChangeEmail}
                                        />
                                    </FloatingLabelComponent>
                                </Form.Item>
                                <Form.Item
                                    label=""
                                    validateStatus={"validating"}
                                    help=""
                                    style={{ marginBottom: '0px' }}
                                    className='auth-form-item-password'
                                >
                                    <FloatingLabelComponent label="Mật khẩu" value={password}>
                                        <InputPasswordComponent
                                            placeholder=""
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            className='auth-input-password'
                                            value={password}
                                            onChange={handleOnChangePassword}
                                        />
                                    </FloatingLabelComponent>
                                </Form.Item>
                                
                                {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                                <Form.Item>
                                    <LoadingComponent isLoading={isLoading}>
                                        <Button
                                            disabled={!email.length || !password.length}
                                            type="primary"
                                            htmlType='submit'
                                            onClick={handleSignin}
                                            className='auth-button-signin'
                                            danger
                                        >
                                            Đăng Nhập
                                        </Button>
                                    </LoadingComponent>
                                </Form.Item>
                            </Form>
                            <div style={{ marginBottom: '8px' }}>
                                <a>Quên mật khẩu?</a>
                            </div>
                            <div>
                                Chưa có tài khoản? <a onClick={handleNavigateSignup}>Tạo tài khoản</a>
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

export default SignInPage
