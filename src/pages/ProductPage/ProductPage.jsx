import { Breadcrumb, Button, Col, Image, Rate, Row, Tabs } from 'antd';
import React from 'react';
import imageProduct from '../../assets/images/hamburger-beef.png'
import imageCalories from '../../assets/images/calories.png'
import { StarFilled } from '@ant-design/icons'
import InputNumberComponent from '../../components/InputNumberComponent/InputNumberComponent';
import { DetailContentDiv, DetailsReviewSection, PriceSpan, StarRating } from './style';
import { useNavigate, useParams } from "react-router-dom";
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const items = [
   {
      key: '1',
      label: 'Chi tiết',
      children: 'Content of Tab Pane 1'
   },
   {
      key: '2',
      label: 'Đánh giá',
      children: 'Content of Tab Pane 2'
   }
]

const ProductsPage = () => {
   const { id } = useParams();

   const onChange = () => { }

   const getActiveProductDetails = async (context) => {
      const id = context?.queryKey && context?.queryKey[1];
      if (id) {
         const res = await ProductService.getActiveProductDetails(id);
         if (res?.status === 'ERR') {
            // navigate('/NotFoundPage');
         }
         return res?.data;
      }
   }

   const { isLoading, data: productDetails } = useQuery(
      {
         queryKey: ['productDetails', id],
         queryFn: getActiveProductDetails,
         enabled: !!id,
      }
   );

   const renderStarsRating = (ratingCount) => {
      const stars = [];
      for (let i = 0; i < ratingCount; i++) {
         stars.push(<StarFilled className="checked" key={i} />);
      }
      for (let i = 4; i >= ratingCount; i--) {
         stars.push(<StarFilled className="unchecked" key={i} />);
      }
      return stars;
   }


   /*** NAVIGATE ***/
   const navigate = useNavigate();
   const handleNavigateHomePage = () => {
      navigate('/');
   }
   const handleNavigateMenuPage = () => {
       navigate('/menu');
   }

   return (
      <LoadingComponent isLoading={isLoading}>
         <div id="container" style={{ padding: '85px 70px 0px 70px', height: '1500px' }}>
            <Breadcrumb
               style={{ paddingLeft: '24px', marginTop: '20px', marginBottom: '40px' }}
               items={[
                  {
                     title: <span onClick={handleNavigateHomePage} style={{ cursor: 'pointer' }}>Trang chủ</span>,
                  },
                  {
                     title: <span onClick={handleNavigateMenuPage} style={{ cursor: 'pointer' }}>Thực đơn</span>,
                  },
                  {
                     title: <span style={{ cursor: 'pointer' }}>Sản phẩm</span>,
                  },
               ]}
            >
            </Breadcrumb>
            <Row justify="space-around">
               <Col span={8}>
                  <Image src={productDetails?.image} alt="product" preview={true} draggable={false} />
               </Col>
               <Col span={12}>
                  <div style={{ fontSize: '40px', fontWeight: 'bold', cursor: 'context-menu' }}>{productDetails?.name}</div>
                  <StarRating>
                     {renderStarsRating(productDetails?.rating)}
                     <span style={{ userSelect: 'none' }}>{productDetails?.rating}/5 (150 đánh giá)</span>
                  </StarRating>
                  <DetailContentDiv style={{ userSelect: 'none' }}>
                     {productDetails?.description}
                  </DetailContentDiv>
                  {/* <DetailContentDiv>
                     <Image src={imageCalories} preview={false} width={60} />
                     <span>
                        <span style={{ fontWeight: 'bold' }}>300</span> calories
                     </span>
                  </DetailContentDiv> */}
                  <DetailContentDiv>
                     <InputNumberComponent minValue='1' maxValue='10' />
                  </DetailContentDiv>
                  <DetailContentDiv>
                     <Button type="primary" style={{ height: '50px', width: '170px', borderRadius: '25px' }} danger>
                        Thêm vào Giỏ Hàng
                     </Button>
                     <PriceSpan>{productDetails?.price?.toLocaleString()} VNĐ</PriceSpan>
                  </DetailContentDiv>
               </Col>
            </Row>
            <DetailsReviewSection justify='center'>
               <Col span={14}>
                  <Tabs defaultActiveKey='1' items={items} />
               </Col>
            </DetailsReviewSection>
         </div>
      </LoadingComponent>
   )
};

export default ProductsPage
