import { Breadcrumb, Button, Col, Image, Row, Tabs } from 'antd';
import React from 'react';
import imageProduct from '../../assets/images/hamburger.png'
import imageCalories from '../../assets/images/calories.png'
import { StarFilled } from '@ant-design/icons'
import InputNumberComponent from '../../components/InputNumberComponent/InputNumberComponent';
import { DetailContentDiv, DetailsReviewSection, PriceSpan, StarRating } from './style';

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

   return (
      <div id="container" style={{ padding: '0px 70px', height: '1500px' }}>
         <Breadcrumb style={{ paddingLeft: '24px', marginTop: '20px', marginBottom: '40px' }}>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item>Thực đơn</Breadcrumb.Item>
            <Breadcrumb.Item>Sản Phẩm</Breadcrumb.Item>
         </Breadcrumb>
         <Row justify="space-around">
            <Col span={8}>
               <Image src={imageProduct} alt="product" preview={false} />
            </Col>
            <Col span={12}>
               <div style={{ fontSize: '40px', fontWeight: 'bold' }}>Hamburger Bò</div>
               <StarRating>
                  <StarFilled className="checked"></StarFilled>
                  <StarFilled className="checked"></StarFilled>
                  <StarFilled className="checked"></StarFilled>
                  <StarFilled className="checked"></StarFilled>
                  <StarFilled className="unchecked"></StarFilled>
                  <span>(150)</span>
               </StarRating>
               <DetailContentDiv>
                  Sự kết hợp tuyệt vời giữa miếng thịt bò nguyên chất 100% được tẩm ướp đậm đà cùng với xà lách, cà chua, hành tây xắt nhỏ, sốt và phô mai.
               </DetailContentDiv>
               <DetailContentDiv>
                  <Image src={imageCalories} preview={false} width={60} />
                  <span>
                     <span style={{ fontWeight: 'bold' }}>300</span> calories
                  </span>
               </DetailContentDiv>
               <DetailContentDiv>
                  <InputNumberComponent minValue='1' maxValue='10' />
               </DetailContentDiv>
               <DetailContentDiv>
                  <Button type="primary" style={{ height: '50px', width: '170px', borderRadius: '25px' }} danger>
                     Thêm vào Giỏ Hàng
                  </Button>
                  <PriceSpan>25.000 VNĐ</PriceSpan>
               </DetailContentDiv>
            </Col>
         </Row>
         <DetailsReviewSection justify='center'>
            <Col span={14}>
               <Tabs defaultActiveKey='1' items={items} />
            </Col>
         </DetailsReviewSection>
      </div>
   )
};

export default ProductsPage
