import { Button, Form, Modal, Spin, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import FloatingLabelComponent from '../../components/FloatingLabelComponent/FloatingLabelComponent';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import { DeleteOutlined, HomeOutlined, IdcardOutlined, LockOutlined, PhoneOutlined, PlusOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { WrapperUploadUserAvtar, WrapperUserEditProfile } from './style';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as MessagePopup from '../../components/MessagePopupComponent/MessagePopupComponent';
import { updateUser } from '../../redux/slices/userSlice';
import { getBase64 } from '../../utils';

const UserEditProfilePage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [fullname, setFullname] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);
    const [address, setAddress] = useState(user?.address);
    const [avatar, setAvatar] = useState(user?.avatar);

    // mutation
    const mutation = useMutationHooks(
        ({ id, accessToken, ...rests } = data) =>
            UserService.updateUser(id, rests, accessToken)
    );
    const { data, isLoading, isSuccess, isError } = mutation;

    // useEffect to show in the inputs on every time changing the user information
    useEffect(() => {
        setFullname(user?.name);
        setEmail(user?.email);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user]);

    // get user details to show for frontend sides after every time updating the user information
    useEffect(() => {
        if (isSuccess) {
            MessagePopup.success();
            handleGetUserDetails(user?.id, user?.accessToken);
        } else if (isError) {
            MessagePopup.error();
        }
    }, [isSuccess, isError]);

    // hooks
    const handleOnChangeFullname = (value) => {
        setFullname(value);
    }

    const handleOnChangeEmail = (value) => {
        setEmail(value);
    }

    const handleOnChangePhone = (value) => {
        setPhone(value);
    }

    const handleOnChangeAddress = (value) => {
        setAddress(value);
    }

    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            setAvatar(file.preview);
    }

    const handleRemoveAvatar = () => {
        setAvatar('');
    }

    const handleGetUserDetails = async (id, accessToken) => {
        // res contains user information
        const res = await UserService.getUserDetails(id, accessToken);
        dispatch(updateUser({ ...res?.data, accessToken: accessToken }));
    }

    const handleSaveEditProfile = async () => {
        // parse these data into UserService to update new data
        await mutation.mutateAsync({
            id: user?.id,
            fullname,
            email,
            phone,
            address,
            avatar,
            accessToken: user?.accessToken
        });
    }

    return (
        <WrapperUserEditProfile id="container" style={{ padding: '40px 70px', height: '1500px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '24px' }}>THÔNG TIN NGƯỜI DÙNG</div>
            <Form autoComplete="off">
                <Form.Item
                    label=""
                    validateStatus={"validating"}
                    help=""
                    style={{ marginBottom: '0px' }}
                    className='edit-form-item-fullname'
                >
                    <FloatingLabelComponent label="Họ tên" value={fullname}>
                        <InputFormComponent
                            placeholder=""
                            prefix={<IdcardOutlined className="site-form-item-icon" />}
                            className='edit-input-fullname'
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
                    className='edit-form-item-email'
                >
                    <FloatingLabelComponent label="Tài khoản email" value={email}>
                        <InputFormComponent
                            placeholder=""
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            className='edit-input-email'
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
                    className='edit-form-item-phone'
                >
                    <FloatingLabelComponent label="Số điện thoại" value={phone}>
                        <InputFormComponent
                            placeholder=""
                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                            className='edit-input-phone'
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
                    className='edit-form-item-address'
                >
                    <FloatingLabelComponent label="Địa chỉ" value={address}>
                        <InputFormComponent
                            placeholder=""
                            prefix={<HomeOutlined className="site-form-item-icon" />}
                            className='edit-input-address'
                            value={address}
                            onChange={handleOnChangeAddress}
                        />
                    </FloatingLabelComponent>
                </Form.Item>
                <Form.Item
                    label=""
                    validateStatus={"validating"}
                    help=""
                    style={{ marginBottom: '0px' }}
                    className='edit-form-item-avatar'
                >
                    <WrapperUploadUserAvtar>
                        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>Ảnh đại diện</div>
                        <div style={{ display: 'grid' }}>
                            <div  style={{ marginTop: '10px', marginBottom: '10px' }}>
                                {avatar && (<img src={avatar} alt='avatar' />)}
                            </div>
                            <div>
                                <Upload onChange={handleOnChangeAvatar} maxCount={1}>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                                <Button icon={<DeleteOutlined />} onClick={handleRemoveAvatar} style={{ width: '98px' }}>Remove</Button>
                            </div>
                        </div>
                    </WrapperUploadUserAvtar>
                </Form.Item>
                <Form.Item>
                    <LoadingComponent isLoading={isLoading}>
                        <Button
                            // disabled={!fullname.length
                            //     || !email.length
                            //     || !phone.length}
                            type="primary"
                            htmlType='submit'
                            className='edit-button-signup'
                            onClick={handleSaveEditProfile}
                            danger
                        >
                            Lưu
                        </Button>
                    </LoadingComponent>
                </Form.Item>
            </Form>
        </WrapperUserEditProfile>
    )
};

export default UserEditProfilePage;
