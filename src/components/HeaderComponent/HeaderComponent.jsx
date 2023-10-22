import { Avatar, Badge, Col, Popover, Row } from "antd";
import { UserOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {
   WrapperAccountHeader,
   WrapperHeader,
   WrapperAuthHeader,
   WrapperSignoutPopover,
   WrapperSearchHeader,
   WrapperAuthDiv,
   WrapperAccountPopover,
   WrapperLinePopover
} from "./style";
import SearchButtonComponent from "../SearchButtonComponent/SearchButtonComponent";
import NavigationComponent from "../NavigationComponent/NavigationComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slices/userSlice';
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { searchProduct } from "../../redux/slices/productSlice";
import { createOrderState, resetOrder } from "../../redux/slices/orderSlice";

const HeaderComponent = () => {
   const navItems = [
      {
         "name": "Trang chủ",
         "path": "/",
      },
      {
         "name": "Thực đơn",
         "path": "/menu",
      },
      {
         "name": "Tìm hiểu",
         "path": "/",
      },
      {
         "name": "Khuyến mãi",
         "path": "/",
      },
      {
         "name": "Liên hệ",
         "path": "/",
      }
   ];


   const user = useSelector((state) => state.user);
   // state?.order?.findIndex(prop => prop.user === user?.id) means find index of recent user order state
   const order = useSelector((state) => state?.order[state?.order?.findIndex(prop => prop.user === user?.id)]);
   const dispatch = useDispatch();

   const [loading, setLoading] = useState(false);
   const [username, setUsername] = useState('');
   const [userAvatar, setUserAvatar] = useState('');
   const [search, setSearch] = useState('');
   const [isOpenPopover, setIsOpenPopover] = useState(false);

   useEffect(() => {
      setLoading(true);
      setUsername(user?.name);
      setUserAvatar(user?.avatar);
      setLoading(false);
   }, [user?.name, user?.avatar]);

   // navigation
   const navigate = useNavigate();
   const handleNavigateSignin = () => {
      navigate('/signin');
   }
   const handleNavigateSignup = () => {
      navigate('/signup');
   }
   const handleNavigateMyCart = () => {
      navigate('/mycart');
   }
   const handleNavigateSignout = async () => {
      setLoading(true);
      // clear old access token in local storage
      localStorage.clear();
      await UserService.signoutUser();
      dispatch(resetUser());
      setLoading(false);
      navigate('/');
   }

   // popover item
   const handleOnClickPopoverItem = (item) => {
      if (item === 'profile') {
         navigate('/user/profile');
         setIsOpenPopover(false);
      } else if (item == 'myorders') {
         navigate('/myorders');
         setIsOpenPopover(false);
      } else if (item == 'admin') {
         navigate('/system/admin');
         setIsOpenPopover(false);
      } else if (item == 'signout') {
         handleNavigateSignout();
         setIsOpenPopover(false);
         // reset cart when sign out
         // dispatch(resetOrder());
      }
   }
   const handleOpenPopoverChange = () => {
      setIsOpenPopover(false);
   };
   const userPopoverItems = (
      <div>
         <WrapperAccountPopover onClick={() => handleOnClickPopoverItem('profile')}>Tài Khoản Của Tôi</WrapperAccountPopover>
         <WrapperAccountPopover onClick={() => handleOnClickPopoverItem('myorders')}>Đơn Hàng Của Tôi</WrapperAccountPopover>
         {user?.isAdmin && (
            <WrapperAccountPopover onClick={() => handleOnClickPopoverItem('admin')}>Quản Lý Hệ Thống</WrapperAccountPopover>
         )}
         <WrapperLinePopover></WrapperLinePopover>
         <WrapperSignoutPopover onClick={() => handleOnClickPopoverItem('signout')}>Đăng Xuất</WrapperSignoutPopover>
      </div>
   );

   // search
   const onSearch = (e) => {
      setSearch(e.target.value);
      dispatch(searchProduct(e.target.value));
   }


   return (
      <div>
         <WrapperHeader>
            {/* Branch Name Part Here */}
            <Col span={3}>
               <Row justify="space-around" align="middle" style={{ height: '100%' }}>
                  BRAND NAME
               </Row>
            </Col>
            {/* NavBar Items Part Here */}
            <Col span={12}>
               <Row justify="space-around" align="middle" style={{ height: '100%' }}>
                  {
                     navItems.map((item) => {
                        return (
                           <NavigationComponent name={item.name} navigateTo={item.path} />
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
                        onChange={onSearch}
                     />
                  </WrapperSearchHeader>
                  {/* Auth Part Here */}
                  <WrapperAuthDiv>
                     <LoadingComponent isLoading={loading}>
                        {/* Icon Account Here */}
                        <WrapperAccountHeader>
                           {/* <UserOutlined /> */}
                           {userAvatar ?
                              (<img className="user-avatar-header" src={userAvatar} alt="avatar" />) :
                              <Avatar size={35} icon={<UserOutlined />} />}
                        </WrapperAccountHeader>
                        {/* If user exists, show user email, else show signin and signup */}
                        {user?.accessToken ? (
                           <Popover
                              placement="bottom"
                              content={userPopoverItems}
                              trigger="click"
                              open={isOpenPopover}
                              onOpenChange={handleOpenPopoverChange}
                           >
                              <div
                                 style={{
                                    marginRight: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                 }}
                                 onClick={() => setIsOpenPopover((prev) => !prev)}
                              >
                                 {username?.length ? username : 'Tài khoản'}
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
                        <Badge count={1} showZero>
                           <HeartOutlined style={{ marginRight: '5px', fontSize: '24px' }} />
                        </Badge>
                     </div>
                     <div>
                        <Badge count={order?.orderItems?.length} showZero>
                           <ShoppingCartOutlined style={{ marginRight: '5px', fontSize: '24px', cursor: 'pointer' }} onClick={handleNavigateMyCart} />
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
