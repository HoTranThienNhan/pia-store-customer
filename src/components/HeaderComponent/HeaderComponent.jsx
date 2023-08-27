import { Col, Row } from "antd";
import { UserOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import React from 'react';
import { WrapperAccountHeader, WrapperHeader, WrapperAuthHeader } from "./style";
import SearchButtonComponent from "../SearchButtonComponent/SearchButtonComponent";
import NavigationComponent from "../NavigationComponent/NavigationComponent";

const HeaderComponent = () => {
   const navItem = ['Trang chủ', 'Tìm hiểu', 'Thức ăn', 'Nước uống', 'Liên hệ']
   return (
      <div>
         <WrapperHeader>
            {/* Branch Name Part Here */}
            <Col span={3}>
               BRANCH NAME
            </Col>
            {/* NavBar Items Part Here */}
            <Col span={12}>
               <Row justify="space-around" align="middle" style={{ height: '100%' }}>
                  {
                     navItem.map((item) => {
                        return (
                           <NavigationComponent name={item} key={item} />
                        )
                     })
                  }
               </Row>
            </Col>
            {/* Right NavBar Part Here */}
            <Col span={9}>
               <Row justify="end">
                  <WrapperAccountHeader style={{ marginRight: '25px' }}>
                     <SearchButtonComponent
                        width='140px'
                        placeholder='Tìm sản phẩm'
                     />
                  </WrapperAccountHeader>
                  <WrapperAccountHeader>
                     <UserOutlined />
                  </WrapperAccountHeader>
                  <WrapperAuthHeader>
                     <span style={{ marginRight: '5px' }}>Đăng nhập</span> /
                     <span style={{ marginLeft: '5px' }}>Đăng ký</span>
                  </WrapperAuthHeader>
                  <WrapperAccountHeader>
                     <HeartOutlined style={{ marginRight: '15px' }} />
                     <ShoppingCartOutlined style={{ marginRight: '15px' }} />
                  </WrapperAccountHeader>
               </Row>
            </Col>
         </WrapperHeader>
      </div>
   )
};

export default HeaderComponent
