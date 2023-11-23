import { Breadcrumb, Button, Card, Checkbox, Col, Divider, Image, InputNumber, Popconfirm, Result, Row, Tooltip, message } from "antd";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";
import { InputNumberCustom, ScrollBarCustom } from "./style";
import { DeleteOutlined, MinusCircleOutlined, MinusOutlined, PlusCircleOutlined, PlusOutlined, QuestionCircleOutlined, SmileOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ProductService from '../../services/ProductService';
import {
   decreaseAmount,
   increaseAmount,
   removeMultipleOrderProducts,
   removeOrderProduct,
   selectedOrderProducts,
   setAmount,
   setCosts
} from "../../redux/slices/orderSlice";
import { useQuery } from "@tanstack/react-query";
import * as MessagePopup from '../../components/MessagePopupComponent/MessagePopupComponent';

const MyCartPage = () => {
   const user = useSelector((state) => state?.user);
   // state?.order?.findIndex(prop => prop.user === user?.id) means find index of recent user order state
   const order = useSelector((state) => state?.order[state?.order?.findIndex(prop => prop.user === user?.id)]);

   const [listCheckedProducts, setListCheckedProducts] = useState([]);

   const dispatch = useDispatch();


   /*** GET ALL PRODUCTS ***/
   const getAllProducts = async () => {
      const res = await ProductService.getAllProducts();
      return res.data;
   }
   const queryAllProducts = useQuery({
      queryKey: ['products'],
      queryFn: getAllProducts
   });
   const { isLoading: isLoadingAllProducts, data: allProducts } = queryAllProducts;


   /*** MANAGE PRODUCT IN CART ***/
   const minProductCount = 1;
   const maxProductCount = 10;
   const setProductCount = (productId, value) => {
      allProducts?.map((product) => {
         if (product._id === productId) {
            if (product.countInStock < value) {
               MessagePopup.warning('Số lượng sản phẩm tồn kho còn lại là ' + product.countInStock);
            } else if (value && value >= minProductCount && value <= maxProductCount) {
               dispatch(setAmount({ productId, value, userId: user?.id }));
            }
         }
      });
   }
   const addProductCount = (productId, productAmount) => {
      allProducts?.map((product) => {
         if (product._id === productId) {
            if (productAmount + 1 > product.countInStock) {
               MessagePopup.warning('Số lượng sản phẩm tồn kho còn lại là ' + product.countInStock);
            } else {
               if (productAmount + 1 > 10) {
                  MessagePopup.warning('Tối đa 10 đơn vị cho mỗi sản phẩm');
               } else {
                  dispatch(increaseAmount({ productId, maxProductCount, userId: user?.id }));
               }
            }
         }
      });
   }
   const minusProductCount = (productId) => {
      dispatch(decreaseAmount({ productId, minProductCount, userId: user?.id }));
   }
   const deleteProductOut = (productId) => {
      dispatch(removeOrderProduct({ productId, userId: user?.id }));
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
         dispatch(removeMultipleOrderProducts({ listCheckedProducts, userId: user?.id }));
         setListCheckedProducts([]);
      }
   }

   useEffect(() => {
      dispatch(selectedOrderProducts({ listCheckedProducts, userId: user?.id }));
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
   const handleNavigateCheckout = () => {
      if (!order?.selectedOrderItems?.length) {
         message.error('Vui lòng chọn sản phẩm');
      } else {
         dispatch(setCosts({ subtotalMemo, totalMemo, deliveryFeeMemo, userId: user?.id }));
         navigate('/mycart/checkout')
      }
   }

   return (
      // <LoadingComponent isLoading={isLoading}>
      <div id="container" style={{ padding: '85px 120px 80px 120px', height: '100%', backgroundColor: 'whitesmoke' }}>
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
                  <span>({order?.orderItems?.length ? order?.orderItems?.length : 0})</span>
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
                        <Card style={{ margin: '5px 0px 20px 0px', borderRadius: '10px', backgroundColor: 'whitesmoke', border: '2px solid #b9b9b8bf' }} hoverable>
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
                                       <Image
                                          src={orderProduct?.image}
                                          alt="product"
                                          preview={true}
                                          draggable={false}
                                          style={{
                                             width: '100px',
                                             height: '120px',
                                             WebkitFilter: 'drop-shadow(2px 2px 3px #666)',
                                             filter: 'drop-shadow(2px 2px 3px #666)'
                                          }}
                                       />
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
                                          <PlusOutlined className='plus-input-number' onClick={() => addProductCount(orderProduct?.product, orderProduct?.amount, maxProductCount)} />
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

               <Divider style={{ marginTop: '40px' }}></Divider>
               <Row justify="center" style={{ marginBottom: '20px' }}>
                  <Col>
                     <Card style={{ padding: '0px 10px', width: '450px', fontSize: '18px', border: '2px solid #cacaca' }}>
                        <Row justify="space-between">
                           <Col>Tạm tính</Col>
                           <Col>{subtotalMemo ? subtotalMemo?.toLocaleString() : 0} VNĐ</Col>
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
                           <Col>{order?.orderItems?.length ? deliveryFeeMemo?.toLocaleString() : 0} VNĐ</Col>
                        </Row>
                        <Row justify="space-between">
                           <Col>Giảm voucher</Col>
                           <Col>- {discountVoucherMemo?.toLocaleString()} VNĐ</Col>
                        </Row>
                        <Divider style={{ margin: '15px 0px' }} />
                        <Row justify="space-between">
                           <Col style={{ fontSize: '20px', fontWeight: '600' }}>Tổng tiền</Col>
                           <Col style={{ fontSize: '20px', fontWeight: '600' }}>{totalMemo ? totalMemo?.toLocaleString() : 0} VNĐ</Col>
                        </Row>
                     </Card>
                  </Col>
               </Row>
               <Row justify="center">
                  <Col>
                     <Button type="primary" style={{ width: '450px', height: '40px', borderRadius: '20px' }} onClick={handleNavigateCheckout}>
                        <span>Mua hàng</span>
                     </Button>
                  </Col>
               </Row>
            </div>

         ) : (
            <Result
               icon={<SmileOutlined />}
               title="Hmm, có vẻ như chưa có gì trong giỏ hàng!"
               extra={<Button type="primary" onClick={handleNavigateMenuPage}>Đi tới Menu</Button>}
            />
         )}
         {/* </LoadingComponent> */}
      </div>
   )
};

export default MyCartPage
