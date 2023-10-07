import { Breadcrumb, Card, Checkbox, Col, Image, InputNumber, Row } from "antd";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";
import { InputNumberCustom } from "./style";
import { DeleteOutlined, MinusCircleOutlined, MinusOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import img from "../../assets/images/hamburger-beef.png";
import { useSelector } from "react-redux";

const OrderPage = () => {

   const order = useSelector((state) => state?.order);

   const [productCount, setProductCount] = useState(1);

   const minProductCount = 1;
   const maxProductCount = 10;
   const addProductCount = (e) => {
      if (Number(productCount) < Number(maxProductCount)) {
         setProductCount(Number(productCount) + 1);
      }
   }
   const minusProductCount = (e) => {
      if (Number(productCount) > Number(minProductCount)) {
         setProductCount(Number(productCount) - 1);
      }
   }
   const setProductCountValue = (e) => {
      if (e !== null) {
         setProductCount(`${e}`);
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
            style={{ paddingLeft: '24px', marginTop: '20px', marginBottom: '40px', userSelect: 'none' }}
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
         <div>
            My Cart ({order?.orderItems?.length})
         </div>
         {order?.orderItems?.map((orderProduct) => {
            return (
               <Card style={{ marginTop: '30px', borderRadius: '10px' }} hoverable>
                  <Row>
                     <Col span={24}>
                        <Row justify="space-between" align="middle">
                           <Col span={2}>
                              <Checkbox checked={true} disabled={false} />
                           </Col>
                           <Col span={4} style={{ padding: '0px 10px' }}>
                              <Image src={orderProduct?.image} alt="product" preview={true} draggable={false} style={{ width: '120px' }} />
                           </Col>
                           <Col span={4} style={{ fontWeight: "bold", fontSize: '16px' }}>{orderProduct?.name}</Col>
                           <Col span={4} style={{ fontWeight: "bold", fontSize: '16px' }}>{orderProduct?.price.toLocaleString()} VNĐ</Col>
                           <Col span={4}>
                              <InputNumberCustom>
                                 <MinusOutlined className='minus-input-number' onClick={minusProductCount} />
                                 <InputNumber className='input-number-area' min={minProductCount} max={maxProductCount} value={productCount} onChange={setProductCountValue} />
                                 <PlusOutlined className='plus-input-number' onClick={addProductCount} />
                              </InputNumberCustom>
                           </Col>
                           <Col span={4}>
                              <DeleteOutlined style={{ fontWeight: "bold", fontSize: '24px' }} />
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
