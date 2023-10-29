import { Breadcrumb, Button, Card, Checkbox, Col, Collapse, Divider, Image, Menu, Popconfirm, Row } from "antd";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";
import { CardWrapper, CollapseWrapper, MyOrdersCard, SidebarMenuWrapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import * as OrderService from '../../services/OrderService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { convertDateType, convertOrderStatus } from "../../utils";
import { useMutationHooks } from '../../hooks/useMutationHook';
import { QuestionCircleOutlined, ShopOutlined } from "@ant-design/icons";
import * as MessagePopup from '../../components/MessagePopupComponent/MessagePopupComponent';
import { getItem } from '../../utils';
import { useState } from "react";
import * as ReviewService from '../../services/ReviewService';

const MyOrdersPage = () => {
   const user = useSelector((state) => state?.user);

   const dispatch = useDispatch();
   const [selectedStatusKey, setSelectedStatusKey] = useState('pending');

   // fetch orders by status
   const fetchMyOrders = async (status) => {
      // const res = await OrderService.getAllOrders(user?.id, user?.accessToken);
      const res = await OrderService.getOrderByStatus(user?.id, user?.accessToken, status);
      return res;
   }
   const queryMyOrders = useQuery(
      {
         queryKey: ['users', selectedStatusKey],
         queryFn: () => fetchMyOrders(selectedStatusKey),
         retry: 3,
         retryDelay: 1000,
         // only use query when user id and user access token are called completely
         enabled: user?.id && user?.accessToken ? true : false,
      }
   );
   const { isLoading, data } = queryMyOrders;
   const orders = data?.data;


   // fetch order filtered by status
   const orderStatus = [
      getItem('Chờ Xác Nhận', 'pending', <ShopOutlined />),
      getItem('Chờ Lấy Hàng', 'pickingup', <ShopOutlined />),
      getItem('Đang giao', 'delivering', <ShopOutlined />),
      getItem('Đã giao', 'delivered', <ShopOutlined />),
      getItem('Đã hủy', 'canceled', <ShopOutlined />),
   ];
   const handleOnClickOrderStatus = ({ key }) => {
      // selectedStatusKey from items
      setSelectedStatusKey(key);
      handleOrderState(key);
   }
   const mutationOrderStatus = useMutationHooks(
      (data) => {
         const { userId, accessToken, status } = data;
         const res = OrderService.getOrderByStatus(userId, accessToken, status);
         return res;
      }
   );
   const handleOrderState = (status) => {
      mutationOrderStatus.mutate({
         userId: user?.id,
         accessToken: user?.accessToken,
         status: status
      },
         {
            onSuccess: () => {
               queryMyOrders.refetch();
            }
         });
   }


   /*** ORDER ITEMS ***/
   const handleNavigateReviewProduct = (orderId, productId) => {
      navigate(`/review/${orderId}/${productId}`);
   }
   const items = (order) => [
      {
         key: '1',
         label: `Chi tiết đơn hàng (${order?.orderItems?.length ? order?.orderItems?.length : 0} sản phẩm)`,
         children:
            order?.orderItems?.map((orderItems, index) => {
               let h = 8;
               return (
                  <>
                     <Row>
                        <Col span={6}>
                           <Image src={orderItems?.image} preview={false} width={130} />
                        </Col>
                        <Col span={12}>
                           <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '8px' }}>
                              {orderItems?.name}
                           </div>
                           <Row>
                              <Col span={4}>
                                 <div>Số lượng:</div>
                                 <div>Đơn giá:</div>
                              </Col>
                              <Col span={10}>
                                 <div>{orderItems?.amount} </div>
                                 <div>{orderItems?.price?.toLocaleString()}  VNĐ</div>
                              </Col>
                           </Row>
                        </Col>
                        <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>

                           {
                              (order?.status === 'delivered') ? (
                                 (orderItems?.isReviewed === false) ?
                                    <Button type="primary" onClick={() => handleNavigateReviewProduct(order?._id, orderItems?.productId)}>
                                       Đánh Giá
                                    </Button>
                                    : <Button type="primary" disabled>Đã Đánh Giá</Button>
                              ) : (
                                 <></>
                              )
                           }
                        </Col>
                     </Row>
                     {index + 1 !== order?.orderItems?.length && (<Divider />)}
                  </>
               )
            })
      },
   ];


   /*** CANCEL ORDER ***/
   const mutation = useMutationHooks(
      (data) => {
         const { orderId, accessToken, order } = data;
         const res = OrderService.cancelOrder(orderId, accessToken, order);
         return res;
      }
   );
   const handleCancelOrder = (order) => {
      mutation.mutate({
         orderId: order?._id,
         accessToken: user?.accessToken,
         order: order
      },
         {
            onSuccess: () => {
               MessagePopup.success("Hủy đơn hàng thành công.");
               queryMyOrders.refetch();
            }
         });
   }


   /*** NAVIGATE ***/
   const navigate = useNavigate();
   const handleNavigateHomePage = () => {
      navigate('/');
   }
   const handleNavigateToEditUserProfile = () => {
      navigate('/user/profile/edit');
   }

   return (
      <LoadingComponent isLoading={isLoading}>
         <div id="container" style={{ padding: '85px 120px 80px 120px', height: '100%', backgroundColor: '#d4e3fa5e' }}>
            <Breadcrumb
               style={{ paddingLeft: '24px', marginTop: '20px', marginBottom: '20px', userSelect: 'none' }}
               items={[
                  {
                     title: <span onClick={handleNavigateHomePage} style={{ cursor: 'pointer' }}>Trang chủ</span>,
                  },
                  {
                     title: <span>Đơn hàng của tôi</span>,
                  },
               ]}
            >
            </Breadcrumb>
            <Row justify="center" style={{ marginBottom: '20px' }}>
               <Divider>
                  <Col style={{ fontSize: '32px' }} >
                     <span style={{ fontWeight: '700' }}>ĐƠN HÀNG CỦA TÔI ({orders?.length ? orders?.length : 0})</span>
                  </Col>
               </Divider>
            </Row>
            <Row>
               <SidebarMenuWrapper span={7} style={{}}>
                  <Row>
                     <Col span={24}>
                        <CardWrapper>
                           <Row>
                              <Col span={6}>
                                 <Image className="user-avatar-info" src={user?.avatar} alt="avatar" preview={false} draggable={false} />
                              </Col>
                              <Col span={18}>
                                 <div style={{ fontWeight: '600', fontSize: '16px' }}>Xin chào, {user?.name ? user?.name : 'user'}!</div>
                                 <div style={{ fontWeight: '300' }}>{user?.address ? user?.address : 'address'}</div>
                              </Col>
                           </Row>
                           <Row style={{ marginTop: '20px' }}>
                              <Col span={24}>
                                 <Button type="primary" danger onClick={handleNavigateToEditUserProfile}>Sửa Thông Tin</Button>
                              </Col>
                           </Row>
                        </CardWrapper>
                     </Col>
                     <Col span={24} style={{ marginTop: '30px' }}>
                        <CardWrapper>
                           <Menu
                              mode="inline"
                              items={orderStatus}
                              onClick={handleOnClickOrderStatus}
                              defaultSelectedKeys={'pending'}
                           />
                        </CardWrapper>
                     </Col>
                  </Row>
               </SidebarMenuWrapper>
               <Col span={17}>
                  {
                     orders?.map((order) => {
                        return (
                           <MyOrdersCard>
                              <Row justify="space-between">
                                 <Col span={10}>
                                    <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '6px' }}>
                                       MÃ ĐƠN #{order?._id}
                                    </div>
                                    <div style={{ fontWeight: '700', fontSize: '16px' }}>
                                       Tổng Tiền: {order?.totalPrice?.toLocaleString()} VNĐ
                                    </div>
                                 </Col>
                                 <Col span={7} style={{ alignItems: 'center' }}>
                                    <div style={{ fontWeight: '500', fontSize: '14px', margin: '2px 0px 6px 0px' }}>
                                       Phương Thức Thanh Toán: {order?.paymentMethod}
                                    </div>
                                    <div style={{ marginBottom: '6px' }}>
                                       Phí Vận Chuyển: {order?.shippingPrice?.toLocaleString()} VNĐ
                                    </div>
                                    <div>
                                       Nơi Giao: {order?.deliveryInformation?.address}
                                    </div>
                                 </Col>
                                 <Col span={5} style={{ alignItems: 'center' }}>
                                    <div style={{ fontWeight: '500', fontSize: '14px', margin: '2px 0px 6px 0px' }}>
                                       Ngày Đặt Hàng: {convertDateType(order?.createdAt)}
                                    </div>
                                    <div style={{ fontSize: '16px' }}>
                                       Trạng Thái: {convertOrderStatus(order?.status)}
                                    </div>
                                    {order?.status === 'pending' && (
                                       <div style={{ marginTop: '10px' }}>
                                          <Popconfirm
                                             placement='topRight'
                                             title="Xác nhận hủy đơn hàng"
                                             description={<span>Bạn chỉ có thể hủy với đơn hàng ở trạng thái <b>Chờ xác nhận</b>.<br />
                                                Bạn chắc chắn muốn hủy đơn hàng này không?</span>}
                                             onConfirm={() => handleCancelOrder(order)}
                                             okText="Chắc chắn"
                                             cancelText="Không"
                                             icon={
                                                <QuestionCircleOutlined
                                                   style={{
                                                      color: 'red',
                                                   }}
                                                />
                                             }
                                          >
                                             <Button type="primary" danger>
                                                Hủy Đơn Hàng
                                             </Button>
                                          </Popconfirm>
                                       </div>
                                    )}
                                 </Col>
                              </Row>
                              <Divider />
                              <CollapseWrapper ghost items={items(order)} />
                           </MyOrdersCard>
                        )
                     })
                  }
               </Col>
            </Row >
         </div >
      </LoadingComponent >
   )
};

export default MyOrdersPage
