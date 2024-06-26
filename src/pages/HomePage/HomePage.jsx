import React, { useEffect, useState } from 'react';
import CardComponent from '../../components/CardComponent/CardComponent';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/images/banhpia-cover-slider-1.png';
import slider2 from '../../assets/images/banhpia-cover-slider-1.png';
import slider3 from '../../assets/images/banhpia-cover-slider-1.png';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { Button, Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useDebounce } from '../../hooks/useDebounce';

const HomePage = () => {
   const [productState, setProductState] = useState([]);
   const [loading, setLoading] = useState(false);
   const [limitProducts, setLimitProducts] = useState(4);
   const searchProduct = useSelector((state) => state?.product?.search);
   const searchDebounce = useDebounce(searchProduct, 1000);
   const refSearch = useRef();

   const fetchAllProducts = async (context) => {
      setLoading(true);
      const limitProducts = context?.queryKey && context?.queryKey[1];
      const search = context?.queryKey && context?.queryKey[2];
      const onlyActive = 'true';
      const type = "";
      const res = await ProductService.getAllProducts(search, limitProducts, type, onlyActive);
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

   return (
      <div>
         <div style={{ paddingTop: '85px' }}>
            <SliderComponent arrImages={[slider1, slider2, slider3]} />
         </div>
         <div id="container" style={{ padding: '0px 70px 50px 70px', height: 'maxContent' }}>
            <Row justify="center" style={{ marginTop: '40px' }}>
               <span style={{ fontSize: '24px', fontWeight: '700' }}>SẢN PHẨM CỦA CHÚNG TÔI</span>
            </Row>
            <div style={{ marginTop: '40px' }}>
               <LoadingComponent isLoading={isLoading || loading}>
                  <Row>
                     {
                        products?.data?.map((product) => {
                           return (
                              <Col span={6} style={{ marginBottom: '30px' }}>
                                 <CardComponent
                                    key={product._id}
                                    id={product._id}
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
         </div>
      </div>
   )
};

export default HomePage
