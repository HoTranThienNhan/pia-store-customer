import { Button, Col, Form, Image, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import { IdcardOutlined, LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import imagePoster from '../../assets/images/food-poster.jpg'
import { AuthCard } from './style';
import { useNavigate } from 'react-router-dom';
import InputPasswordComponent from '../../components/InputPasswordComponent/InputPasswordComponent';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import FloatingLabelComponent from '../../components/FloatingLabelComponent/FloatingLabelComponent';
import * as MessagePopup from '../../components/MessagePopupComponent/MessagePopupComponent';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // mutation
    const mutation = useMutationHooks(
        data => UserService.signupUser(data)
    );
    const { data, isLoading , isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess) {
            MessagePopup.success();
            handleNavigateSignin();
        } else if (isError) {
            MessagePopup.error();
        }
    }, [isSuccess, isError]);

    // hooks
    const handleOnChangeFullname = (e) => {
        setFullname(e.target.value);
    }

    const handleOnChangePhone = (e) => {
        setPhone(e.target.value);
    }

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleOnChangePassword = (e) => {
        setPassword(e);
    }

    const handleOnChangeConfirmPassword = (e) => {
        setConfirmPassword(e);
    }

    const handleSignup = () => {
        // parse these data into UserService 
        mutation.mutate({
            fullname,
            phone,
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
                            Chào mừng đến <span onClick={handleNavigateHomepage} style={{ cursor: 'pointer' }}>BRAND NAME</span>
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
                                    className='auth-form-item-fullname'
                                >
                                    <FloatingLabelComponent label="Họ tên" value={fullname}>
                                        <InputFormComponent
                                            placeholder=""
                                            prefix={<IdcardOutlined className="site-form-item-icon" />}
                                            className='auth-input-fullname'
                                            value={fullname}
                                            onChange={handleOnChangeFullname}
                                        />
                                    </FloatingLabelComponent>
                                </Form.Item>
                                <Form.Item
                                    label=""
                                    validateStatus={"validating"}
                                    help=""
                                    style={{ marginBottom: '0px' }}
                                    className='auth-form-item-phone'
                                >
                                    <FloatingLabelComponent label="Số điện thoại" value={phone}>
                                        <InputFormComponent
                                            placeholder=""
                                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                                            className='auth-input-phone'
                                            value={phone}
                                            onChange={handleOnChangePhone}
                                        />
                                    </FloatingLabelComponent>
                                </Form.Item>
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
                                <Form.Item
                                    label=""
                                    validateStatus={"validating"}
                                    help=""
                                    style={{ marginBottom: '0px' }}
                                    className='auth-form-item-confirm-password'
                                >
                                    <FloatingLabelComponent label="Nhập lại mật khẩu" value={confirmPassword}>
                                        <InputPasswordComponent
                                            placeholder=""
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            className='auth-input-password'
                                            value={confirmPassword}
                                            onChange={handleOnChangeConfirmPassword}
                                        />
                                    </FloatingLabelComponent>
                                </Form.Item>
                                {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                                <Form.Item>
                                    <LoadingComponent isLoading={isLoading}>
                                        <Button
                                            disabled={!fullname.length 
                                                || !phone.length
                                                || !email.length 
                                                || !password.length 
                                                || !confirmPassword.length}
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
