import { Avatar, Breadcrumb, Button, Card, Col, Divider, Form, Input, Popconfirm, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import FloatingLabelComponent from '../../components/FloatingLabelComponent/FloatingLabelComponent';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import { EnvironmentOutlined, FacebookOutlined, FileTextOutlined, IdcardOutlined, InstagramOutlined, MailOutlined, PhoneOutlined, PlusOutlined, QuestionCircleOutlined, TwitterOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { WrapperContactCard, WrapperUserEditProfile } from './style';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserEditProfilePage = () => {
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");


    // hooks
    const handleOnChangeFullname = (e) => {
        setFullname(e.target.value);
    }

    const handleOnChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleOnChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleNavigateHomePage = async () => {
        navigate('/');
    }

    return (
        <WrapperUserEditProfile id="container" style={{ padding: '125px 70px 40px 70px', minHeight: '800px', backgroundColor: '#e5e8ed' }}>
            <Breadcrumb
                style={{ paddingLeft: '24px', marginBottom: '20px', userSelect: 'none' }}
                items={[
                    {
                        title: <span onClick={handleNavigateHomePage} style={{ cursor: 'pointer' }}>Trang chủ</span>,
                    },
                    {
                        title: <span>Liên hệ</span>,
                    },
                ]}
            >
            </Breadcrumb>
            <Row>
                <Col span={24}>
                    <WrapperContactCard style={{ borderRadius: '25px' }}>
                        <Row>
                            <Col span={12} style={{ padding: '20px 50px', backgroundColor: '#d4e3fa5e' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '28px', marginBottom: '24px', marginBottom: '35px' }}>LIÊN HỆ</div>
                                <div style={{ marginBottom: '25px' }}>
                                    <PhoneOutlined style={{ fontSize: '28px' }} />
                                    <span style={{ marginLeft: '10px', fontSize: '20px', fontWeight: '600' }}>0857.585.242</span>
                                </div>
                                <div style={{ marginBottom: '25px' }}>
                                    <MailOutlined style={{ fontSize: '28px' }} />
                                    <span style={{ marginLeft: '10px', fontSize: '20px', fontWeight: '600' }}>piastore@example.com.vn</span>
                                </div>
                                <div style={{ marginBottom: '100px' }}>
                                    <EnvironmentOutlined style={{ fontSize: '28px' }} />
                                    <span style={{ marginLeft: '10px', fontSize: '20px', fontWeight: '600' }}>Q.Ninh Kiều, TP.Cần Thơ, Việt Nam</span>
                                </div>
                                <Divider style={{ marginBottom: '25px' }}>
                                    <span style={{ marginLeft: '10px', fontSize: '20px', fontWeight: '600' }}>Mạng xã hội</span>
                                </Divider>
                                <Row justify="center">
                                    <div style={{ marginBottom: '25px' }}>
                                        <FacebookOutlined style={{ fontSize: '40px', marginRight: '40px' }} />
                                        <InstagramOutlined style={{ fontSize: '40px', marginRight: '40px' }} />
                                        <TwitterOutlined style={{ fontSize: '40px' }} />
                                    </div>
                                </Row>
                            </Col>
                            <Col span={12} style={{ padding: '20px 50px', }}>
                                <div style={{ fontSize: '20px', marginTop: '20px', fontWeight: 'bold' }}>Cho chúng tôi biết những suy nghĩ từ bạn</div>
                                <Form autoComplete="off">
                                    <Form.Item
                                        label=""
                                        validateStatus={"validating"}
                                        help=""
                                        style={{ marginBottom: '0px', width: '450px' }}
                                        className='edit-form-item-fullname'
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
                                        style={{ marginBottom: '0px', width: '450px' }}
                                        className='edit-form-item-email'
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
                                                className='edit-input-email'
                                                value={email}
                                                onChange={handleOnChangeEmail}
                                            />
                                        </FloatingLabelComponent>
                                    </Form.Item>
                                    <Form.Item style={{ width: '450px' }}>
                                    <FloatingLabelComponent
                                            label="Nội dung liên hệ"
                                            value={description}
                                            styleBefore={{ left: '19px', top: '31px' }}
                                            styleAfter={{ left: '19px', top: '23px' }}
                                        >
                                            <Input.TextArea
                                                name="description"
                                                prefix={<FileTextOutlined className="site-form-item-icon" />}
                                                rows={2}
                                                className='auth-input-product-description'
                                                value={description}
                                                style={{
                                                    borderRadius: '10px',
                                                    padding: '20px 18px',
                                                    marginTop: '20px',
                                                    border: '1px solid #000'
                                                }}
                                                onChange={handleOnChangeDescription}
                                            />
                                        </FloatingLabelComponent>
                                    </Form.Item>
                                    <Form.Item style={{ width: '450px' }}>
                                        <Row>
                                            <Col span={24}>
                                                {/* <LoadingComponent isLoading={isLoading}> */}
                                                    <Popconfirm
                                                        placement='bottomLeft'
                                                        title="Xác nhận gửi thông tin"
                                                        description="Bạn chắc chắn muốn gửi thông tin này?"
                                                        // onConfirm={handleSaveEditProfile}
                                                        okText="Chắc chắn"
                                                        cancelText="Không"
                                                    >
                                                        <Button
                                                            type="primary"
                                                            htmlType='submit'
                                                            className='edit-button-save'
                                                            danger
                                                        >
                                                            Gửi
                                                        </Button>
                                                    </Popconfirm>
                                                {/* </LoadingComponent> */}
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </WrapperContactCard>
                </Col>
            </Row>
        </WrapperUserEditProfile>
    )
};

export default UserEditProfilePage;
