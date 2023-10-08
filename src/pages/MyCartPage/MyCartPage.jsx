import { Breadcrumb, Button, Card, Checkbox, Col, Divider, Image, InputNumber, Popconfirm, Row } from "antd";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";
import { InputNumberCustom } from "./style";
import { DeleteOutlined, MinusCircleOutlined, MinusOutlined, PlusCircleOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import img from "../../assets/images/hamburger-beef.png";
import { useDispatch, useSelector } from "react-redux";
import { decreaseAmount, increaseAmount, removeMultipleOrderProducts, removeOrderProduct } from "../../redux/slices/orderSlice";

const OrderPage = () => {
   const order = useSelector((state) => state?.order);

   const [listCheckedProducts, setListCheckedProducts] = useState([]);

   const dispatch = useDispatch();

   const minProductCount = 1;
   const maxProductCount = 10;
   const addProductCount = (productId) => {
      dispatch(increaseAmount({ productId }));
   }
   const minusProductCount = (productId) => {
      dispatch(decreaseAmount({ productId }));
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
      }
   }


   /*** NAVIGATE ***/
   const navigate = useNavigate();
   const handleNavigateHomePage = () => {
      navigate('/');
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
         <Row style={{ marginTop: '30px', fontSize: '16px', height: '30px' }} justify="space-between">
            {order?.orderItems?.length > 0 &&
               <Col style={{ paddingLeft: '24px' }}>
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
         {order?.orderItems?.map((orderProduct) => {
            return (
               <Card style={{ marginTop: '20px', borderRadius: '10px' }} hoverable>
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
                                 <MinusOutlined className='minus-input-number' onClick={() => minusProductCount(orderProduct?.product)} />
                                 <InputNumber
                                    className='input-number-area'
                                    min={minProductCount}
                                    max={maxProductCount}
                                    value={orderProduct?.amount}
                                 />
                                 <PlusOutlined className='plus-input-number' onClick={() => addProductCount(orderProduct?.product)} />
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
         {/* </LoadingComponent> */}
      </div>
   )
};

export default OrderPage
