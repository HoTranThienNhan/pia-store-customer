import React from 'react';
import CardComponent from '../../components/CardComponent/CardComponent';
import SidebarComponent from '../../components/SidebarComponent/SidebarComponent';
import { Breadcrumb, Col, Row } from 'antd';



const MenuPage = () => {
    return (
        <div id="container" style={{ padding: '85px 70px 0px 70px', height: '1500px' }}>
            <Breadcrumb style={{ paddingLeft: '24px', marginTop: '20px', marginBottom: '40px' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Thực đơn</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col span={5}>
                    <SidebarComponent />
                </Col>
                <Col span={19}>
                    <Row gutter={[16, 32]} justify="start">
                        <Col span={6}>
                            <CardComponent />
                        </Col>
                        <Col span={6}>
                            <CardComponent />
                        </Col>
                        <Col span={6}>
                            <CardComponent />
                        </Col>
                        <Col span={6}>
                            <CardComponent />
                        </Col>
                        <Col span={6}>
                            <CardComponent />
                        </Col>
                        <Col span={6}>
                            <CardComponent />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
};

export default MenuPage
