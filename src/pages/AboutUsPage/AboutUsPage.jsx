import { Breadcrumb, Col, Image, Row } from 'antd';
import React, { useState } from 'react';
import { WrapperUserEditProfile } from './style';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AboutUsBanner from "../../assets/images/about-us-banner.png";
import AboutUsBanhPia1 from "../../assets/images/banh-pia-about-1.jpeg";

const UserEditProfilePage = () => {
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();

    const handleNavigateHomePage = async () => {
        navigate('/');
    }

    return (
        <div>
            <div style={{ paddingTop: '85px' }}>
                <Row>
                    <Col span={24}>
                        <Image src={AboutUsBanner} preview={false} draggable={false} />
                    </Col>
                </Row>
            </div>
            <WrapperUserEditProfile id="container" style={{ padding: '25px 70px 40px 70px', minHeight: '600px', backgroundColor: '#e5e8ed' }}>
                <Breadcrumb
                    style={{ paddingLeft: '24px', marginBottom: '20px', userSelect: 'none' }}
                    items={[
                        {
                            title: <span onClick={handleNavigateHomePage} style={{ cursor: 'pointer' }}>Trang chủ</span>,
                        },
                        {
                            title: <span>Tìm hiểu</span>,
                        },
                    ]}
                >
                </Breadcrumb>
                <Row justify="center">
                    <h1>THÔNG TIN CỬA HÀNG</h1>
                </Row>
                <Row style={{ margin: '30px 50px 0px 50px' }}>
                    <Col span={10}>
                        <Image src={AboutUsBanhPia1} preview={false} draggable={false} />
                    </Col>
                    <Col offset={2} span={12}>
                        <div>
                            <span style={{ fontSize: '20px' }}>
                                Miền Tây luôn là một địa điểm thu hút rất nhiều khách du lịch ở khắp nơi cả trong và ngoài nước.
                                Đến với miền Tây bạn sẽ được trải nghiệm cuộc sống của những con người sông nước miệt vườn, khám phá những nét văn hóa đặc sắc.
                                Được thưởng thức những món đặc sản vô cùng hấp dẫn và chọn những loại đặc sản làm quà cho người thân, bạn bè.
                            </span>
                        </div>
                        <div style={{ marginTop: '25px' }}>
                            <span style={{ fontSize: '20px' }}>
                                Bên cạnh đó, đến với <strong>PiaStore</strong> bạn sẽ tha hồ lựa chọn được những chiếc bánh pía thơm ngon
                                đậm nét đặc trưng của miền tây nói chung và của Sóc Trăng nói riêng.
                            </span>
                        </div>
                        <div style={{ marginTop: '25px' }}>
                            <span style={{ fontSize: '20px' }}>
                                Bánh pía Sóc Trăng nổi tiếng với hương vị thơm ngon với mùi sầu riêng đặc trưng.
                                Loại bánh này với thành phần chính từ đậu xanh, sầu riêng, bột mì và lòng đỏ trứng kết hợp cùng với
                                một số nguyên liệu đặc biệt tạo nên hương vị đặc trưng của loại bánh này.
                            </span>
                        </div>
                    </Col>
                </Row>
            </WrapperUserEditProfile>
        </div>
    )
};

export default UserEditProfilePage;
