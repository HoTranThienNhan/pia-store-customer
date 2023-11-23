import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import { Button, Col, Image, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import * as ProductService from '../../services/ProductService';
import { useNavigate } from 'react-router-dom';
import imageLogo from '../../assets/images/banh-pia-logo.png';

const FooterComponent = () => {

    const [productAllTypes, setProductAllTypes] = useState([]);

    const fetchAllProductTypes = async () => {
        const res = await ProductService.getAllProductTypes();
        if (res?.status === 'OK') {
            setProductAllTypes(res?.data);
        }
    }
    useEffect(() => {
        fetchAllProductTypes();
    }, []);


    // navigate
    const navigate = useNavigate();
    const handleNavigateMenuPage = (e) => {
        const productType = e.target.textContent;
        navigate(`/menu/${productType}`);
    }

    return (
        <div>
            <Row style={{ padding: '50px 114px', backgroundColor: '#eae5d6' }}>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Image src={imageLogo} draggable={false} preview={false} width={250} />
                        </Col>
                        <Col>
                            <div style={{ fontSize: '16px', textAlign: 'justify' }}>
                                Chúng tôi luôn mong muốn cung cấp những sản phẩm chất lượng về hương vị, giá thành
                                cũng như đem lại những trải nghiệm vô cùng tuyệt vời đến với khách hàng.
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col offset={2} span={5}>
                    <Row style={{ fontSize: '18px', fontWeight: '600', marginBottom: '25px' }}>
                        <span>Phân Loại</span>
                    </Row>
                    {productAllTypes?.map((type) => {
                        return (
                            <Row style={{ marginBottom: '20px' }}>
                                <span style={{ cursor: 'pointer' }} onClick={handleNavigateMenuPage}>{type}</span>
                            </Row>
                        );
                    }
                    )}
                </Col>
                <Col span={5}>
                    <Row style={{ fontSize: '18px', fontWeight: '600', marginBottom: '25px' }}>
                        <span>Cửa Hàng</span>
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <span style={{ cursor: 'pointer' }}>Liên Hệ</span>
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <span style={{ cursor: 'pointer' }}>Khuyến Mãi</span>
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <span style={{ cursor: 'pointer' }}>Q&A</span>
                    </Row>
                    <Row style={{ marginBottom: '20px' }}>
                        <span style={{ cursor: 'pointer' }}>Chính Sách & Dịch Vụ</span>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row style={{ fontSize: '18px', fontWeight: '600', marginBottom: '25px' }}>
                        <span>Nhận thông báo mới nhất</span>
                    </Row>
                    <Row style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>
                        <Input style={{ height: '40px' }} placeholder='Địa chỉ email' />
                    </Row>
                    <Row style={{ fontSize: '18px', fontWeight: '600', marginBottom: '30px' }}>
                        <Button type='primary' style={{ borderRadius: '25px', height: '40px', width: '100%', padding: '7px 0px' }}>
                            Đăng Ký
                        </Button>
                    </Row>
                    <Row style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>
                        <span>Mạng Xã Hội</span>
                    </Row>
                    <Row style={{ fontSize: '24px', fontWeight: '600', marginBottom: '25px' }}>
                        <span style={{ marginRight: '20px', cursor: 'pointer' }}>
                            <FacebookOutlined />
                        </span>
                        <span style={{ marginRight: '20px', cursor: 'pointer' }}>
                            <InstagramOutlined />
                        </span>
                        <span style={{ marginRight: '20px', cursor: 'pointer' }}>
                            <TwitterOutlined />
                        </span>
                    </Row>
                </Col>
            </Row>
        </div>
    )
};

export default FooterComponent;
