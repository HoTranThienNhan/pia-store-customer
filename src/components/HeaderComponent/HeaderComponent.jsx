import { Badge, Button, Col, Popover, Row } from "antd";
import { UserOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { WrapperAccountHeader, WrapperHeader, WrapperAuthHeader, WrapperSignoutPopover, WrapperSearchHeader, WrapperAuthDiv } from "./style";
import SearchButtonComponent from "../SearchButtonComponent/SearchButtonComponent";
import NavigationComponent from "../NavigationComponent/NavigationComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slices/userSlice';
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const HeaderComponent = () => {
   const navItem = ['Trang chủ', 'Tìm hiểu', 'Thực đơn', 'Khuyến mãi', 'Liên hệ'];

   const user = useSelector((state) => state.user);
   const dispatch = useDispatch();

   const [loading, setLoading] = useState(false);

   // navigation
   const navigate = useNavigate();
   const handleNavigateSignin = () => {
      navigate('/signin');
   }
   const handleNavigateSignup = () => {
      navigate('/signup');
   }
   const handleNavigateSignout = async () => {
      setLoading(true);
      await UserService.signoutUser();
      dispatch(resetUser());
      setLoading(false);
   }

   const signoutUserPopoverItem = (
      <div style={{ padding: '7px' }}>
         <p>Tài Khoản Của Tôi</p>
         <WrapperSignoutPopover onClick={handleNavigateSignout}>Đăng Xuất</WrapperSignoutPopover>
      </div>
   );

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
                  {/* Search Part Here */}
                  <WrapperSearchHeader style={{ marginRight: '25px' }}>
                     <SearchButtonComponent
                        width='140px'
                        placeholder='Tìm sản phẩm'
                     />
                  </WrapperSearchHeader>
                  {/* Auth Part Here */}
                  <WrapperAuthDiv>
                     <LoadingComponent isLoading={loading}>
                        {/* Icon Account Here */}
                        <WrapperAccountHeader>
                           <UserOutlined />
                        </WrapperAccountHeader>
                        {/* If user exists, show user email, else show signin and signup */}
                        {user?.name ? (
                           <Popover placement="bottom" content={signoutUserPopoverItem} trigger="click">
                              <div style={{
                                 marginRight: '20px',
                                 display: 'flex',
                                 alignItems: 'center',
                                 fontWeight: 'bold',
                                 cursor: 'pointer'
                              }}>
                                 {user.name}
                              </div>
                           </Popover>
                        ) : (
                           <WrapperAuthHeader>
                              <span onClick={handleNavigateSignin} style={{ marginRight: '5px', cursor: 'pointer' }}>Đăng nhập</span>
                              <span style={{ userSelect: 'none' }}>/</span>
                              <span onClick={handleNavigateSignup} style={{ marginLeft: '5px', cursor: 'pointer' }}>Đăng ký</span>
                           </WrapperAuthHeader>
                        )}
                     </LoadingComponent>
                  </WrapperAuthDiv>
                  {/* Favorite Products And Cart Here */}
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
