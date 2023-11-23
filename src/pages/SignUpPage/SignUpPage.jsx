import { Button, Col, Form, Image, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import { IdcardOutlined, LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import imagePoster from '../../assets/images/banh-pia-poster-2.jpg';
import { AuthCard, InputSelectCustom } from './style';
import { useNavigate } from 'react-router-dom';
import InputPasswordComponent from '../../components/InputPasswordComponent/InputPasswordComponent';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import FloatingLabelComponent from '../../components/FloatingLabelComponent/FloatingLabelComponent';
import * as MessagePopup from '../../components/MessagePopupComponent/MessagePopupComponent';
import * as AddressService from '../../services/AddressService';
import { convertAddressString } from "../../utils";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const isAdmin = false;
    const avatar = "";

    // mutation
    const mutation = useMutationHooks(
        data => UserService.signupUser(data)
    );
    const { data, isLoading, isSuccess, isError } = mutation;

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
            confirmPassword,
            address,
            avatar,
            isAdmin
        })
    }

    /*** ADDRESS SELECT ***/
    // #region
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState('Chọn tỉnh thành');
    const [selectedDistrict, setSelectedDistrict] = useState('Chọn quận huyện');
    const [selectedWard, setSelectedWard] = useState('Chọn phường xã');

    const renderProvince = async () => {
        const res = await AddressService.getProvinces();
        res?.map((province) => {
            setProvinces(
                oldArray => [...oldArray, {
                    value: province.name,
                    label: province.name,
                    code: province.code,
                }]
            );
        });
        return res;
    }
    useEffect(() => {
        renderProvince();
    }, []);
    const handleChangeProvince = async (value, province) => {
        const provinceCode = province?.code;

        setSelectedProvince(value);
        setSelectedDistrict('Chọn quận huyện');
        setSelectedWard('Chọn phường xã');

        const res = await AddressService.getDistricts(provinceCode);
        setDistricts([]);
        setWards([]);
        res?.map((districts) => {
            setDistricts(
                oldArray => [...oldArray, {
                    value: districts.name,
                    label: districts.name,
                    code: districts.code,
                }]
            );
        });
        return res;
    }
    const handleChangeDistrict = async (value, district) => {
        const districtCode = district?.code;

        setSelectedDistrict(value);
        setSelectedWard('Chọn phường xã');

        const res = await AddressService.getWards(districtCode);
        setWards([]);
        res?.map((wards) => {
            setWards(
                oldArray => [...oldArray, {
                    value: wards.name,
                    label: wards.name,
                    code: wards.code,
                }]
            );
        });
        return res;
    }
    const handleChangeWard = async (value, ward) => {
        setSelectedWard(value);
        const thisWard = value;
        const address = convertAddressString(selectedProvince, selectedDistrict, thisWard);
        setAddress(address);
    }
    // #endregion

    // navigation
    const handleNavigateSignin = () => {
        navigate('/signin');
    }
    const handleNavigateHomepage = () => {
        navigate('/');
    }

    return (
        <div style={{ padding: '0px 100px', height: '900px' }}>
            <AuthCard>
                <Row>
                    <Col span={13} style={{ padding: '32px 32px' }}>
                        <h2 style={{ marginBottom: '12px' }}>
                            Chào mừng đến <span onClick={handleNavigateHomepage} style={{ cursor: 'pointer' }}>PIASTORE</span>
                        </h2>
                        <Col style={{ padding: '10px 50px 0px 50px' }}>
                            <h1 style={{ textAlign: 'center', marginBottom: '0px' }}>
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
                                    <FloatingLabelComponent
                                        label="Họ tên"
                                        value={fullname}
                                        styleBefore={{ left: '37px', top: '31px' }}
                                        styleAfter={{ left: '37px', top: '23px' }}
                                    >
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
                                    <FloatingLabelComponent
                                        label="Số điện thoại"
                                        value={phone}
                                        styleBefore={{ left: '37px', top: '31px' }}
                                        styleAfter={{ left: '37px', top: '23px' }}
                                    >
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
                                    style={{ marginBottom: '20px' }}
                                    className='auth-form-item-email'
                                >
                                    <FloatingLabelComponent
                                        label="Tài khoản email"
                                        value={email}
                                        styleBefore={{ left: '37px', top: '31px' }}
                                        styleAfter={{ left: '37px', top: '23px' }}
                                    >
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
                                >
                                    <Row style={{ marginBottom: '35px' }}>
                                        <Col span={24}>
                                            <InputSelectCustom
                                                defaultValue='Chọn tỉnh thành'
                                                onChange={handleChangeProvince}
                                                value={selectedProvince}
                                                options={provinces}
                                            />
                                        </Col>
                                    </Row>
                                    <Row justify='space-between'>
                                        <Col span={11}>
                                            <InputSelectCustom
                                                defaultValue='Chọn quận huyện'
                                                onChange={handleChangeDistrict}
                                                value={selectedDistrict}
                                                options={districts}
                                            />
                                        </Col>
                                        <Col span={11}>
                                            <InputSelectCustom
                                                defaultValue='Chọn phường xã'
                                                onChange={handleChangeWard}
                                                value={selectedWard}
                                                options={wards}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Item>
                                <Form.Item
                                    label=""
                                    validateStatus={"validating"}
                                    help=""
                                    style={{ marginBottom: '0px' }}
                                    className='auth-form-item-password'
                                >
                                    <FloatingLabelComponent
                                        label="Mật khẩu"
                                        value={password}
                                        styleBefore={{ left: '37px', top: '31px' }}
                                        styleAfter={{ left: '37px', top: '23px' }}
                                    >
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
                                    <FloatingLabelComponent
                                        label="Nhập lại mật khẩu"
                                        value={confirmPassword}
                                        styleBefore={{ left: '37px', top: '31px' }}
                                        styleAfter={{ left: '37px', top: '23px' }}
                                    >
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
                            <div>
                                Đã có tài khoản? <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleNavigateSignin}>Đăng nhập</span>
                            </div>
                        </Col>
                    </Col>
                    <Col span={11}>
                        <Image src={imagePoster} preview={false} height={800} style={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }} />
                    </Col>
                </Row>
            </AuthCard>
        </div>
    )
};

export default SignUpPage
