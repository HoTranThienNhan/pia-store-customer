import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import CardComponent from '../../components/CardComponent/CardComponent';
import SidebarComponent from '../../components/SidebarComponent/SidebarComponent';
import { Breadcrumb, Button, Col, Row, Tabs } from 'antd';
import * as ProductService from '../../services/ProductService';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import MenuTabsComponent from '../../components/MenuTabsComponent/MenuTabsComponent';
import { WrapperMenuProducts } from './style';

const MenuPage = () => {
    const [productState, setProductState] = useState([]);
    const [loading, setLoading] = useState(false);
    const [limitProducts, setLimitProducts] = useState(4);
    const [productType, setProductType] = useState('');
    const [productAllTypes, setProductAllTypes] = useState([]);
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 1000);
    const refSearch = useRef();

    /*** ALL PRODUCTS ***/
    const fetchAllProducts = async (context) => {
        setLoading(true);
        const limitProducts = context?.queryKey && context?.queryKey[1];
        const search = context?.queryKey && context?.queryKey[2];
        const type = context?.queryKey && context?.queryKey[3];
        const onlyActive = 'true';
        const res = await ProductService.getAllProducts(search, limitProducts, type, onlyActive);
        setLoading(false);
        return res;
    }

    const queryAllProducts = useQuery(
        {
            queryKey: ['products', limitProducts, searchDebounce, productType],
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
            setProductAllTypes(res?.data);
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
    const handleNavigateProductType = (e) => {
        const productType = e.target.textContent;
        if (productType !== "Main Menu") {
            navigate(`/menu/${productType}`);
            setProductType(productType);
        } else {
            navigate("/menu");
            setProductType('');
        }

        const productTypesList = document.getElementsByClassName('product-types-list')[0].childNodes;
        for (var i = 0; i < productTypesList.length; i++) {
            productTypesList[i].classList.remove("active")
        }

        const eventTargetClassName = e.target.className;
        if (!eventTargetClassName.includes("active")) {
            e.target.className += " active";
        }
    }

    return (
        <div id="container" style={{ padding: '85px 90px 80px 90px', height: '100%' }}>
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
            />
            <WrapperMenuProducts className='product-types-list'>
                <span
                    onClick={handleNavigateProductType}
                    className="product-main-menu active"
                >
                    Main Menu
                </span>
                {productAllTypes.map((typeItem, index) => {
                    const checkedTypeClassName = "product-type-" + index.toString();
                    return (
                        <MenuTabsComponent onClick={handleNavigateProductType} className={checkedTypeClassName}>
                            {typeItem}
                        </MenuTabsComponent>
                    );
                })}
            </WrapperMenuProducts>
            <LoadingComponent isLoading={isLoading || loading}>
                <Row style={{ margin: '0px 30px' }}>
                    {
                        products?.data?.map((product, index) => {
                            return (
                                <Col span={5} offset={(index % 4 == 0) ? 0 : 1} style={{ marginBottom: '30px' }}>
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
        </div>
    )
};

export default MenuPage
