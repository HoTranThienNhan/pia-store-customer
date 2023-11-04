import { Breadcrumb, Button, Col, Image, InputNumber, Rate, Row, Tabs } from 'antd';
import React, { useState } from 'react';
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons'
import InputNumberComponent from '../../components/InputNumberComponent/InputNumberComponent';
import { DetailContentDiv, DetailsReviewSection, InputNumberCustom, PriceSpan, StarRating } from './style';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderProduct } from '../../redux/slices/orderSlice';
import ProductReviewsComponent from '../../components/ProductReviewsComponent/ProductReviewsComponent';
import * as ReviewService from '../../services/ReviewService';

const ProductsPage = () => {
   const user = useSelector((state) => state?.user);

   const [productCount, setProductCount] = useState(1);

   const location = useLocation();
   const dispatch = useDispatch();
   const { id } = useParams();


   const getActiveProductDetails = async (context) => {
      const id = context?.queryKey && context?.queryKey[1];
      if (id) {
         const res = await ProductService.getActiveProductDetails(id);
         if (res?.status === 'ERR') {
            navigate('/NotFoundPage');
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


   /*** REVIEWS ***/
   const getProductReviews = async (context) => {
      const id = productDetails?._id;
      if (id) {
         const res = await ReviewService.getReviewByProduct(id);
         if (res?.status === 'ERR') {
            // navigate('/NotFoundPage');
         }
         return res?.data;
      }
   }
   const { isProductReviewsLoading, data: productReviews } = useQuery(
      {
         queryKey: ['productReviews', productDetails?._id],
         queryFn: getProductReviews,
         enabled: !!productDetails?._id,
      }
   );

   const items = [
      // {
      //    key: '1',
      //    label: 'Chi tiết',
      //    children: 'Content of Tab Pane 1'
      // },
      {
         key: '1',
         label: 'Đánh giá',
         children: <ProductReviewsComponent productReviewsArray={productReviews} />
      }
   ]


   /*** STARS RATING ***/
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


   /*** PRODUCT COUNT ***/
   const minProductCount = 1;
   const maxProductCount = 10;
   const addProductCount = (e) => {
      if (Number(productCount) < Number(maxProductCount)) {
         setProductCount(Number(productCount) + 1);
      }
   }
   const minusProductCount = (e) => {
      if (Number(productCount) > Number(minProductCount)) {
         setProductCount(Number(productCount) - 1);
      }
   }
   const setProductCountValue = (e) => {
      if (e !== null) {
         setProductCount(`${e}`);
      }
   }


   /*** NAVIGATE ***/
   const navigate = useNavigate();
   const handleNavigateHomePage = () => {
      navigate('/');
   }
   const handleNavigateMenuPage = () => {
      navigate('/menu');
   }
   const handleAddToCart = () => {
      if (!user?.id) {
         // if not signin, navigate to sign in page and store the state of this product page
         // then after sign in, navigate back to this product page (based on stored state)
         navigate('/signin', { state: location?.pathname });
      } else {
         dispatch(addOrderProduct({
            orderProductItems: {
               name: productDetails?.name,
               amount: productCount,
               image: productDetails?.image,
               price: productDetails?.price,
               product: productDetails?._id,
               productId: productDetails?.id,
            },
            userId: user?.id,
         }));
      }
   }

   return (
      <LoadingComponent isLoading={isLoading}>
         <div id="container" style={{ padding: '85px 70px 0px 70px', height: '100%' }}>
            {productDetails && <>
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
                        title: <span>Sản phẩm</span>,
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
                        <InputNumberCustom>
                           <MinusOutlined className='minus-input-number' onClick={minusProductCount} />
                           <InputNumber className='input-number-area' min={minProductCount} max={maxProductCount} value={productCount} onChange={setProductCountValue} />
                           <PlusOutlined className='plus-input-number' onClick={addProductCount} />
                        </InputNumberCustom>
                     </DetailContentDiv>
                     <DetailContentDiv>
                        <Button
                           type="primary"
                           style={{ height: '50px', width: '170px', borderRadius: '25px' }}
                           onClick={handleAddToCart}
                           danger
                        >
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
            </>}
         </div>
      </LoadingComponent>
   )
};

export default ProductsPage
