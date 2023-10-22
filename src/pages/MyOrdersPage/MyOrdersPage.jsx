import { Breadcrumb, Button, Card, Checkbox, Col, Collapse, Divider, Image, Popconfirm, Row } from "antd";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";
import { CollapseWrapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import * as OrderService from '../../services/OrderService';
import { useMutation, useQuery } from '@tanstack/react-query';
import IMG from '../../assets/images/products/hamburger/hamburger-chicken.png';
import { convertDateType } from "../../utils";
import { useMutationHooks } from '../../hooks/useMutationHook';
import { QuestionCircleOutlined } from "@ant-design/icons";
import * as MessagePopup from '../../components/MessagePopupComponent/MessagePopupComponent';
const MyOrdersPage = () => {
   const user = useSelector((state) => state?.user);

   const dispatch = useDispatch();


   const fetchMyOrders = async () => {
      const res = await OrderService.getAllOrders(user?.id, user?.accessToken);
      return res;
   }
   const queryMyOrders = useQuery(
      {
         queryKey: ['users'],
         queryFn: fetchMyOrders,
         retry: 3,
         retryDelay: 1000,
         // only use query when user id and user access token are called completely
         enabled: user?.id && user?.accessToken ? true : false,
      }
   );
   const { isLoading, data } = queryMyOrders;
   const orders = data?.data;

   const items = (order) => [
      {
         key: '1',
         label: `Chi tiết đơn hàng (${order?.orderItems?.length ? order?.orderItems?.length : 0} sản phẩm)`,
         children:
            order?.orderItems?.map((orderItems, index) => {
               return (
                  <>
                     <Row>
                        <Col span={6}>
                           <Image src={IMG} preview={false} width={130} />
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

   return (
      <LoadingComponent isLoading={isLoading}>
         <div id="container" style={{ padding: '85px 120px 0px 120px', height: '1500px', backgroundColor: '#d4e3fa5e' }}>
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
            {
               orders?.map((order) => {
                  return (
                     <Row style={{ marginBottom: '30px' }}>
                        <Col span={17}>
                           <Card>
                              <Row justify="space-between">
                                 <Col span={6}>
                                    <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '6px' }}>
                                       MÃ ĐƠN HÀNG
                                    </div>
                                    <div style={{ fontWeight: '700', fontSize: '16px' }}>
                                       Tổng Tiền: {order?.totalPrice?.toLocaleString()} VNĐ
                                    </div>
                                 </Col>
                                 <Col span={8} style={{ alignItems: 'center' }}>
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
                                       Trạng Thái: {order?.status}
                                    </div>
                                    {order?.status === 'Chờ xác nhận' && (
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
                           </Card>
                        </Col>
                        <Col span={7}>

                        </Col>
                     </Row >
                  )
               })
            }
         </div >
      </LoadingComponent >
   )
};

export default MyOrdersPage
