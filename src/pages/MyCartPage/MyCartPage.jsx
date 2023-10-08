import { Breadcrumb, Button, Card, Checkbox, Col, Divider, Image, InputNumber, Popconfirm, Result, Row, Tooltip } from "antd";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";
import { InputNumberCustom, ScrollBarCustom } from "./style";
import { DeleteOutlined, MinusCircleOutlined, MinusOutlined, PlusCircleOutlined, PlusOutlined, QuestionCircleOutlined, SmileOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseAmount, increaseAmount, removeMultipleOrderProducts, removeOrderProduct, selectedOrderProducts, setAmount } from "../../redux/slices/orderSlice";

const OrderPage = () => {
   const order = useSelector((state) => state?.order);

   const [listCheckedProducts, setListCheckedProducts] = useState([]);

   const dispatch = useDispatch();


   /*** MANAGE PRODUCT IN CART ***/
   const minProductCount = 1;
   const maxProductCount = 10;
   const setProductCount = (productId, value) => {
      if (value && value >= minProductCount && value <= maxProductCount) {
         dispatch(setAmount({ productId, value }));
      }
   }
   const addProductCount = (productId) => {
      dispatch(increaseAmount({ productId, maxProductCount }));
   }
   const minusProductCount = (productId) => {
      dispatch(decreaseAmount({ productId, minProductCount }));
   }
   const deleteProductOut = (productId) => {
      dispatch(removeOrderProduct({ productId }));
   }
   const checkProduct = (e) => {
      const checkedProduct = e.target.value;
      if (listCheckedProducts.includes(checkedProduct)) {
         // if unchecked (means checkedProduct exists in listCheckedProducts)
         // remove checkedProduct out of listCheckedProducts
         const newListCheckedProducts = listCheckedProducts.filter((item) => item !== checkedProduct);
         setListCheckedProducts(newListCheckedProducts);
      } else {
         // else if checked (means checkedProduct does not exist in listCheckedProducts)
         // push checkedProduct to listCheckedProducts
         setListCheckedProducts([...listCheckedProducts, checkedProduct]);
      }
   }
   const checkAllProducts = (e) => {
      const checkedAllProducts = e.target.checked;
      if (checkedAllProducts) {
         // if checkbox all products is true
         // push all product ids to listCheckedProducts
         const newListCheckedProducts = [];
         order?.orderItems?.forEach((item) => {
            newListCheckedProducts.push(item.product);
         });
         setListCheckedProducts(newListCheckedProducts)
      } else {
         // if checkbox all products is false
         // listCheckedProducts turns to be empty
         setListCheckedProducts([]);
      }
   }
   const deleteMultipleProductsOut = () => {
      if (listCheckedProducts?.length > 0) {
         dispatch(removeMultipleOrderProducts({ listCheckedProducts }));
         setListCheckedProducts([]);
      }
   }

   useEffect(() => {
      dispatch(selectedOrderProducts({ listCheckedProducts }));
   }, [listCheckedProducts]);


   /*** TOTAL PRICE INFORMATION ***/
   const subtotalMemo = useMemo(() => {
      const result = order?.selectedOrderItems?.reduce((total, cur) => {
         return total + ((cur.price * cur.amount));
      }, 0)
      return result;
   }, [order]);

   const deliveryFeeMemo = useMemo(() => {
      if (subtotalMemo == 0) {
         return 0;
      } else if (subtotalMemo < 100000) {
         return 25000;
      } else {
         return 12000;
      }
   }, [subtotalMemo]);

   const discountVoucherMemo = useMemo(() => {
      return 0;
   }, []);

   const totalMemo = useMemo(() => {
      return subtotalMemo + deliveryFeeMemo - discountVoucherMemo;
   }, [subtotalMemo, deliveryFeeMemo, discountVoucherMemo]);


   /*** NAVIGATE ***/
   const navigate = useNavigate();
   const handleNavigateHomePage = () => {
      navigate('/');
   }
   const handleNavigateMenuPage = () => {
      navigate('/menu');
   }

   return (
      // <LoadingComponent isLoading={isLoading}>
      <div id="container" style={{ padding: '85px 120px 0px 120px', height: '1500px' }}>
         <Breadcrumb
            style={{ paddingLeft: '24px', marginTop: '20px', marginBottom: '20px', userSelect: 'none' }}
            items={[
               {
                  title: <span onClick={handleNavigateHomePage} style={{ cursor: 'pointer' }}>Trang chủ</span>,
               },
               {
                  title: <span>Giỏ hàng của tôi</span>,
               },
            ]}
         >
         </Breadcrumb>
         <Row justify="center">
            <Divider>
               <Col style={{ fontSize: '32px' }} >
                  <span style={{ fontWeight: '700' }}>My Cart </span>
                  <span>({order?.orderItems?.length})</span>
               </Col>
            </Divider>
         </Row>

         {order?.orderItems?.length > 0 ? (
            <div>
               <Row style={{ margin: '20px 0px', fontSize: '16px', height: '30px' }} justify="space-between">
                  {order?.orderItems?.length > 0 &&
                     <Col style={{ paddingLeft: '44px' }}>
                        <Checkbox onChange={checkAllProducts} checked={listCheckedProducts?.length === order?.orderItems?.length} />
                        <span style={{ marginLeft: '10px' }}>Chọn tất cả</span>
                     </Col>
                  }
                  {listCheckedProducts?.length > 0 &&
                     <Col>
                        <Popconfirm
                           placement='topRight'
                           title="Xác nhận xóa"
                           description="Bạn chắc chắn muốn xóa những sản phẩm này?"
                           onConfirm={deleteMultipleProductsOut}
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
                           <Button style={{ marginLeft: '50px' }} type="primary" danger>Xóa khỏi Giỏ Hàng</Button>
                        </Popconfirm>
                     </Col>
                  }
               </Row>
               <ScrollBarCustom>
                  {order?.orderItems?.map((orderProduct) => {
                     return (
                        <Card style={{ margin: '5px 0px 20px 0px', borderRadius: '10px' }} hoverable>
                           <Row>
                              <Col span={24}>
                                 <Row justify="space-between" align="middle">
                                    <Col span={1}>
                                       <Checkbox
                                          onChange={checkProduct}
                                          value={orderProduct?.product}
                                          checked={listCheckedProducts?.includes(orderProduct?.product)}
                                       />
                                    </Col>
                                    <Col span={4} style={{ padding: '0px 10px' }}>
                                       <Image src={orderProduct?.image} alt="product" preview={true} draggable={false} style={{ width: '120px' }} />
                                    </Col>
                                    <Col span={6} style={{ fontWeight: "bold", fontSize: '18px' }}>{orderProduct?.name}</Col>
                                    <Col span={5} style={{ fontWeight: "bold", fontSize: '18px' }}>{orderProduct?.price?.toLocaleString()} VNĐ</Col>
                                    <Col span={3}>
                                       <InputNumberCustom>
                                          <MinusOutlined className='minus-input-number' onClick={() => minusProductCount(orderProduct?.product, minProductCount)} />
                                          <InputNumber
                                             className='input-number-area'
                                             min={minProductCount}
                                             max={maxProductCount}
                                             value={orderProduct?.amount}
                                             onChange={(value) => setProductCount(orderProduct?.product, value)}
                                          />
                                          <PlusOutlined className='plus-input-number' onClick={() => addProductCount(orderProduct?.product, maxProductCount)} />
                                       </InputNumberCustom>
                                    </Col>
                                    <Col span={1}>
                                       <Popconfirm
                                          placement='topRight'
                                          title="Xác nhận xóa"
                                          description="Bạn chắc chắn muốn xóa sản phẩm này?"
                                          onConfirm={() => deleteProductOut(orderProduct?.product)}
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
                                          <DeleteOutlined style={{ fontWeight: "bold", fontSize: '24px', cursor: 'pointer' }} />
                                       </Popconfirm>
                                    </Col>
                                 </Row>
                              </Col>
                           </Row>
                        </Card>
                     )
                  })}
               </ScrollBarCustom>
            </div>
         ) : (
            <Result
               icon={<SmileOutlined />}
               title="Hmm, có vẻ như chưa có gì trong giỏ hàng!"
               extra={<Button type="primary" onClick={handleNavigateMenuPage}>Đi tới Menu</Button>}
            />
         )}

         {/* </LoadingComponent> */}
         <Divider style={{ marginTop: '40px' }}></Divider>
         <Row justify="center" style={{ marginBottom: '20px' }}>
            <Col>
               <Card style={{ padding: '0px 10px', width: '450px', fontSize: '18px' }}>
                  <Row justify="space-between">
                     <Col>Tạm tính</Col>
                     <Col>{subtotalMemo?.toLocaleString()} VNĐ</Col>
                  </Row>
                  <Row justify="space-between">
                     <Col>
                        <span style={{ marginRight: '5px' }}>
                           Phí vận chuyển
                        </span>
                        <Tooltip title="12.000 VNĐ khi tổng giá trị sản phẩm từ 100.000 VNĐ, còn lại phí 25.000 VNĐ" color="black">
                           <QuestionCircleOutlined />
                        </Tooltip>
                     </Col>
                     <Col>{deliveryFeeMemo?.toLocaleString()} VNĐ</Col>
                  </Row>
                  <Row justify="space-between">
                     <Col>Giảm voucher</Col>
                     <Col>- {discountVoucherMemo?.toLocaleString()} VNĐ</Col>
                  </Row>
                  <Divider style={{ margin: '15px 0px' }} />
                  <Row justify="space-between">
                     <Col style={{ fontSize: '20px', fontWeight: '600' }}>Tổng tiền</Col>
                     <Col style={{ fontSize: '20px', fontWeight: '600' }}>{totalMemo?.toLocaleString()} VNĐ</Col>
                  </Row>
               </Card>
            </Col>
         </Row>
         <Row justify="center">
            <Col>
               <Button type="primary" style={{ width: '450px', height: '40px', borderRadius: '20px' }}>
                  <span>Mua hàng</span>
               </Button>
            </Col>
         </Row>
      </div>
   )
};

export default OrderPage
