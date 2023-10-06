import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import CardComponent from '../../components/CardComponent/CardComponent';
import SidebarComponent from '../../components/SidebarComponent/SidebarComponent';
import { Breadcrumb, Button, Col, Row } from 'antd';
import * as ProductService from '../../services/ProductService';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

const MenuPage = () => {
    const [productState, setProductState] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limitProducts, setLimitProducts] = useState(5);
    const [productTypes, setProductTypes] = useState([]);
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 1000);
    const refSearch = useRef();

    /*** ALL PRODUCTS ***/
    const fetchAllProducts = async (context) => {
        setLoading(true);
        const limitProducts = context?.queryKey && context?.queryKey[1];
        const search = context?.queryKey && context?.queryKey[2];
        const onlyActive = 'true';
        const res = await ProductService.getAllProducts(search, limitProducts, onlyActive);
        setLoading(false);
        return res;
    }

    const queryAllProducts = useQuery(
        {
            queryKey: ['products', limitProducts, searchDebounce],
            queryFn: fetchAllProducts,
            retry: 3,
            retryDelay: 1000,
            keepPreviousData: true,
            staleTime: Infinity,
        }
    );
    const { isLoading, data: products, isPreviousData } = queryAllProducts;


    /*** ALL PRODUCT TYPES ***/
    const fetchAllProductTypes = async () => {
        const res = await ProductService.getAllProductTypes();
        if (res?.status === 'OK') {
            setProductTypes(res?.data);
        }
    }

    useEffect(() => {
        fetchAllProductTypes();
    }, []);


    /*** NAVIGATE ***/
    const navigate = useNavigate();
    const handleNavigateHomePage = () => {
        navigate('/');
    }

    return (
        <div id="container" style={{ padding: '85px 90px 0px 90px', height: '1500px' }}>
            <Breadcrumb
                style={{ paddingLeft: '24px', marginTop: '20px', marginBottom: '40px' }}
                items={[
                    {
                        title: <span onClick={handleNavigateHomePage} style={{ cursor: 'pointer' }}>Trang chủ</span>,
                    },
                    {
                        title: <span style={{ cursor: 'pointer' }}>Thực đơn</span>,
                    },
                ]}
            ></Breadcrumb>
            {/* <Row> */}
            {/* <Col span={5}>
                    <SidebarComponent />
                </Col> */}
            <div style={{ marginBottom: '30px' }}>
                <span style={{ marginRight: '25px' }}>Main Menu</span>
                {productTypes.map((typeItem) => {
                    return (
                        <span style={{ marginRight: '25px' }}>{typeItem}</span>
                    );
                })}
            </div>
            <LoadingComponent isLoading={isLoading || loading}>
                <Row justify='space-between' style={{ margin: '0px 30px' }}>
                    {
                        products?.data?.map((product) => {
                            return (
                                <Col span={5} style={{ marginBottom: '30px' }}>
                                    <CardComponent
                                        key={product._id}
                                        id={product.id}
                                        countInStock={product.countInStock}
                                        description={product.description}
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                        type={product.type}
                                        sold={product.sold}
                                        discount={product.discount}
                                    />
                                </Col>
                            );
                        })
                    }
                </Row>
                <Row justify="center">
                    {((products?.data?.length >= 4 && !searchDebounce) || (products?.data?.length > 4 && searchDebounce)) &&
                        <Button
                            type="primary"
                            style={{ marginBottom: '40px' }}
                            onClick={
                                () => {
                                    setLimitProducts((prev) => products?.total === products?.data?.length ? prev - 4 : prev + 4);
                                }
                            }
                        >
                            {products?.total > products?.data?.length ? 'Hiển Thị Thêm' : 'Ẩn bớt'}
                        </Button>
                    }
                </Row>
            </LoadingComponent>
            {/* </Row> */}
        </div>
    )
};

export default MenuPage
