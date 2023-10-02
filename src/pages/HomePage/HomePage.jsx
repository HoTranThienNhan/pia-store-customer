import React, { useEffect, useState } from 'react';
import CardComponent from '../../components/CardComponent/CardComponent';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/images/slider-banner-1.png';
import slider2 from '../../assets/images/slider-banner-1.png';
import slider3 from '../../assets/images/slider-banner-1.png';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useDebounce } from '../../hooks/useDebounce';

const HomePage = () => {
   const [productState, setProductState] = useState([]);
   const [loading, setLoading] = useState(false);
   const searchProduct = useSelector((state) => state?.product?.search);
   const searchDebounce = useDebounce(searchProduct, 1000);
   const refSearch = useRef();

   const fetchAllProducts = async (search) => {
      const res = await ProductService.getAllProducts(search);
      if (search?.length > 0 || refSearch.current) {
         setProductState(res?.data);
      } else {
         return res;
      }
   }

   const { isLoading, data: products } = useQuery(
      {
         queryKey: ['products'],
         queryFn: fetchAllProducts
      },
      { retry: 3, retryDelay: 1000 }
   );

   useEffect(() => {
      if (refSearch.current) {
         setLoading(true);
         fetchAllProducts(searchDebounce);
      }
      refSearch.current = true;
      setLoading(false);
   }, [searchDebounce]);

   useEffect(() => {
      if (products?.data?.length > 0) {
         setProductState(products?.data);
      }
   }, [products])

   return (
      <div id="container" style={{ padding: '85px 70px 0px 70px', height: '1500px' }}>
         <SliderComponent arrImages={[slider1, slider2, slider3]} />
         <div style={{ marginTop: '40px' }}>
            <LoadingComponent isLoading={isLoading || loading}>
               <Row>
                  {
                     productState?.map((product) => {
                        return (
                           <Col span={6} style={{ marginBottom: '30px' }}>
                              <CardComponent
                                 key={product._id}
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
            </LoadingComponent>
         </div>
      </div>
   )
};

export default HomePage
