import React from 'react';
import { useSelector } from 'react-redux';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Breadcrumb, Button, Col, Divider, Image, Result, Row, Tabs } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import { SmileOutlined } from '@ant-design/icons';

const MenuPage = () => {
    const user = useSelector((state) => state?.user);
    const favorite = useSelector((state) => state?.favorite[state?.favorite?.findIndex(prop => prop.user === user?.id)]);

    /*** NAVIGATE ***/
    const navigate = useNavigate();
    const handleNavigateHomePage = () => {
        navigate('/');
    }
    const handleNavigateMenuPage = () => {
        navigate('/menu');
    }

    return (
        <div>
            <div id="container" style={{ padding: '85px 90px 80px 90px', height: '100%', backgroundColor: '#e5e8ed' }}>
                <Breadcrumb
                    style={{ paddingLeft: '24px', marginTop: '20px', marginBottom: '40px' }}
                    items={[
                        {
                            title: <span onClick={handleNavigateHomePage} style={{ cursor: 'pointer' }}>Trang chủ</span>,
                        },
                        {
                            title: <span style={{ cursor: 'pointer' }}>Sản phẩm yêu thích</span>,
                        },
                    ]}
                />
                <Row justify="center">
                    <Divider>
                        <Col style={{ fontSize: '32px', marginBottom: '30px' }} >
                            <span style={{ fontWeight: '700' }}>My Favorites</span>
                        </Col>
                    </Divider>
                </Row>
                {favorite?.favoriteItems?.length > 0 ? (
                    <Row style={{ margin: '0px 30px' }}>
                        {
                            favorite?.favoriteItems?.map((product, index) => {
                                return (
                                    <Col span={5} offset={(index % 4 == 0) ? 0 : 1} style={{ marginBottom: '30px' }}>
                                        <CardComponent
                                            user={user}
                                            favorite={favorite}
                                            id={product.favoriteProductId}
                                            image={product.favoriteProductImage}
                                            name={product.favoriteProductName}
                                            price={product.favoriteProductPrice}
                                        />
                                    </Col>
                                );
                            })
                        }
                    </Row>
                )
                    :
                    (
                        <Result
                            icon={<SmileOutlined />}
                            title="Hmm, có vẻ như chưa có sản phẩm yêu thích!"
                            extra={<Button type="primary" onClick={handleNavigateMenuPage}>Đi tới Menu</Button>}
                        />
                    )}
                {/* <Row justify="center">
                        {(favorite?.favoriteItems?.length >= 4) &&
                            <Button
                                type="primary"
                                style={{ marginBottom: '40px', borderRadius: '20px' }}
                                onClick={
                                    () => {
                                        setLimitProducts((prev) => products?.total === products?.data?.length ? prev - 4 : prev + 4);
                                    }
                                }
                            >
                                {products?.total > products?.data?.length ? 'Hiển Thị Thêm' : 'Ẩn bớt'}
                            </Button>
                        }
                    </Row> */}
                {/* </LoadingComponent> */}
            </div>
        </div>
    )
};

export default MenuPage
