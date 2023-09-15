import { Badge, Col, Row } from "antd";
import { UserOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import React from 'react';
import { WrapperAccountHeader, WrapperHeader, WrapperAuthHeader } from "./style";
import SearchButtonComponent from "../SearchButtonComponent/SearchButtonComponent";
import NavigationComponent from "../NavigationComponent/NavigationComponent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderComponent = () => {
   const navItem = ['Trang chủ', 'Tìm hiểu', 'Thực đơn', 'Khuyến mãi', 'Liên hệ'];
   const user = useSelector((state) => state.user);

   // navigation
   const navigate = useNavigate();
   const handleNavigateSignin = () => {
      navigate('/signin');
   }
   const handleNavigateSignup = () => {
      navigate('/signup');
   }

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
                  {user?.name ? (
                     <div style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>{user.name}</div>
                  ) : (
                     <WrapperAuthHeader>
                     <span onClick={handleNavigateSignin} style={{ marginRight: '5px', cursor: 'pointer' }}>Đăng nhập</span> 
                     <span style={{ userSelect: 'none' }}>/</span>
                     <span onClick={handleNavigateSignup} style={{ marginLeft: '5px', cursor: 'pointer' }}>Đăng ký</span>
                  </WrapperAuthHeader>
                  )}
                  <WrapperAccountHeader>
                     <div style={{ marginRight: '15px' }}>
                        <Badge count={1}>
                           <HeartOutlined style={{ marginRight: '5px', fontSize: '24px' }} />
                        </Badge>
                     </div>
                     <div>
                        <Badge count={1}>
                           <ShoppingCartOutlined style={{ marginRight: '5px', fontSize: '24px' }} />
                        </Badge>
                     </div>
                  </WrapperAccountHeader>
               </Row>
            </Col>
         </WrapperHeader>
      </div>
   )
};

export default HeaderComponent
