import React from 'react';
import CardComponent from '../../components/CardComponent/CardComponent';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/images/slider-banner-1.png';
import slider2 from '../../assets/images/slider-banner-1.png';
import slider3 from '../../assets/images/slider-banner-1.png';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { Col, Row } from 'antd';

const HomePage = () => {
   const fetchAllProducts = async () => {
      const res = await ProductService.getAllProducts();
      return res;
   }
   const { isLoading, data: products } = useQuery(
      {
         queryKey: ['products'],
         queryFn: fetchAllProducts
      },
      { retry: 3, retryDelay: 1000 }
   );

   return (
      <div id="container" style={{ padding: '0px 70px', height: '1500px' }}>
         <SliderComponent arrImages={[slider1, slider2, slider3]} />
         <div style={{ marginTop: '40px' }}>
            <Row>
               {
                  products?.data.map((product) => {
                     return (
                        <Col span={6}>
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
         </div>
      </div>
   )
};

export default HomePage
