import { Badge, Breadcrumb, Button, Card, Checkbox, Col, Divider, Form, Image, InputNumber, Popconfirm, Result, Row, Steps, Tooltip, message } from "antd";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";
import { BadgeCheckedPaymentMethod, CardPaymentMethod, InputNumberCustom, ScrollBarCustom } from "./style";
import {  HomeOutlined, IdcardOutlined, PhoneOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseAmount, increaseAmount, removeMultipleOrderProducts, removeOrderProduct, selectedOrderProducts, setAmount, setDeliveryInformation, setPaymentMethod } from "../../redux/slices/orderSlice";
import FloatingLabelComponent from "../../components/FloatingLabelComponent/FloatingLabelComponent";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import CodMethodImage from "../../assets/images/checkout-payment/cod-method.png";
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as OrderService from '../../services/OrderService';
import * as MessagePopup from '../../components/MessagePopupComponent/MessagePopupComponent';

const CheckoutPage = () => {
    const user = useSelector((state) => state.user);
   // state?.order?.findIndex(prop => prop.user === user?.id) means find index of recent user order state
   const order = useSelector((state) => state?.order[state?.order?.findIndex(prop => prop.user === user?.id)]);

    const [buyerState, setBuyerState] = useState({
        fullname: user?.name,
        phone: user?.phone,
        address: user?.address,
    });

    const dispatch = useDispatch();


    /*** TOTAL PRICE INFORMATION ***/
    // #region
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
    // #endregion


    /*** HANDLE STATE & SLICE ***/
    // #region
    const [showBadgeCODMethod, setShowBadgeCODMethod] = useState(true);
    const [showBadgeZaloPayMethod, setShowBadgeZaloPayMethod] = useState(false);
    const [cardCODMethodClassName, setCardCODMethodClassName] = useState("card-payment-method checked");
    const [cardZaloPayMethodClassName, setCardZaloPayMethodClassName] = useState("card-payment-method");

    const handleOnChangeBuyerState = (e) => {
        setBuyerState({
            ...buyerState,
            [e.target.name]: e.target.value
        });
    }
    const handlePaymentMethodCOD = (e) => {
        const paymentMethod = "COD";
        dispatch(setPaymentMethod({ paymentMethod, userId: user?.id }));

        const cardPaymentMethodClassList = e.currentTarget.classList;
        const paymentMethodParentRow = e.target.closest(".payment-method-row");
        const cardPaymentMethodNodeList = paymentMethodParentRow.querySelectorAll(".card-payment-method");

        if (!cardPaymentMethodClassList.contains("checked")) {
            // remove all checked classes
            Array.from(cardPaymentMethodNodeList).map(element => {
                element.classList.remove("checked");
            })
            // add checked to this class
            cardPaymentMethodClassList.add("checked");
            setCardCODMethodClassName("card-payment-method checked");
            setCardZaloPayMethodClassName("card-payment-method");
            // set badge
            setShowBadgeCODMethod(true);
            setShowBadgeZaloPayMethod(false);
        }
    }

    const handlePaymentMethodZaloPay = (e) => {
        const paymentMethod = "ZaloPay";
        dispatch(setPaymentMethod({ paymentMethod, userId: user?.id }));

        const cardPaymentMethodClassList = e.currentTarget.classList;
        const paymentMethodParentRow = e.target.closest(".payment-method-row");
        const cardPaymentMethodNodeList = paymentMethodParentRow.querySelectorAll(".card-payment-method");

        if (!cardPaymentMethodClassList.contains("checked")) {
            // remove all checked classes
            Array.from(cardPaymentMethodNodeList).map(element => {
                element.classList.remove("checked");
            })
            // add checked to this class
            cardPaymentMethodClassList.add("checked");
            setCardZaloPayMethodClassName("card-payment-method checked");
            setCardCODMethodClassName("card-payment-method");
            // set badge
            setShowBadgeZaloPayMethod(true);
            setShowBadgeCODMethod(false);
        }
    }
    // #endregion


    /*** ORDER INFORMATION STEPS ***/
    // #region
    const steps = [
        {
            title: 'Thông tin người nhận',
            content:
                <Form autoComplete="off" style={{ padding: '0px 50px 30px 0px' }}>
                    <Form.Item
                        label=""
                        validateStatus={"validating"}
                        help=""
                        style={{ marginBottom: '0px' }}
                        className='auth-form-item-product-id'
                    >
                        <FloatingLabelComponent
                            label="Họ tên"
                            value={buyerState?.fullname}
                            styleBefore={{ left: '37px', top: '31px' }}
                            styleAfter={{ left: '37px', top: '23px' }}
                        >
                            <InputFormComponent
                                name="fullname"
                                placeholder=""
                                prefix={<IdcardOutlined className="site-form-item-icon" />}
                                className='auth-input-product-id'
                                value={buyerState?.fullname}
                                onChange={handleOnChangeBuyerState}
                                style={{
                                    borderRadius: '10px',
                                    padding: '0px 18px',
                                    marginTop: '20px',
                                    border: '1px solid #000',
                                    height: '45px'
                                }}
                            />
                        </FloatingLabelComponent>
                    </Form.Item>
                    <Form.Item
                        label=""
                        validateStatus={"validating"}
                        help=""
                        style={{ marginBottom: '0px' }}
                        className='auth-form-item-product-type'
                    >
                        <FloatingLabelComponent
                            label="Số điện thoại"
                            value={buyerState?.phone}
                            styleBefore={{ left: '37px', top: '31px' }}
                            styleAfter={{ left: '37px', top: '23px' }}
                        >
                            <InputFormComponent
                                name="phone"
                                placeholder=""
                                prefix={<PhoneOutlined className="site-form-item-icon" />}
                                className='auth-input-product-type'
                                value={buyerState?.phone}
                                onChange={handleOnChangeBuyerState}
                                style={{
                                    borderRadius: '10px',
                                    padding: '0px 18px',
                                    marginTop: '20px',
                                    border: '1px solid #000',
                                    height: '45px'
                                }}
                            />
                        </FloatingLabelComponent>
                    </Form.Item>
                    <Form.Item
                        label=""
                        validateStatus={"validating"}
                        help=""
                        style={{ marginBottom: '0px' }}
                        className='auth-form-item-product-count-in-stock'
                    >
                        <FloatingLabelComponent
                            label="Địa chỉ"
                            value={buyerState?.address}
                            styleBefore={{ left: '37px', top: '31px' }}
                            styleAfter={{ left: '37px', top: '23px' }}
                        >
                            <InputFormComponent
                                name="address"
                                placeholder=""
                                prefix={<HomeOutlined className="site-form-item-icon" />}
                                className='auth-input-product-count-in-stock'
                                value={buyerState?.address}
                                onChange={handleOnChangeBuyerState}
                                style={{
                                    borderRadius: '10px',
                                    padding: '0px 18px',
                                    marginTop: '20px',
                                    border: '1px solid #000',
                                    height: '45px'
                                }}
                            />
                        </FloatingLabelComponent>
                    </Form.Item>
                </Form>,
        },
        {
            title: 'Phương thức thanh toán',
            content:
                <Row className="payment-method-row" justify="space-around" style={{ padding: '20px' }}>
                    <Col span={10}>
                        <BadgeCheckedPaymentMethod count={showBadgeCODMethod ? "\u2713" : 0} color="#63b0ff" size="default">
                            <CardPaymentMethod className={cardCODMethodClassName} hoverable onClick={handlePaymentMethodCOD}>
                                <div><Image src={CodMethodImage} preview={false} width='70px' /></div>
                                <div>(COD) Thanh toán khi nhận hàng</div>
                            </CardPaymentMethod>
                        </BadgeCheckedPaymentMethod>
                    </Col>
                    <Col span={10}>
                        <BadgeCheckedPaymentMethod count={showBadgeZaloPayMethod ? "\u2713" : 0} color="#63b0ff" size="default">
                            <CardPaymentMethod className={cardZaloPayMethodClassName} hoverable onClick={handlePaymentMethodZaloPay}>
                                <div><Image src={CodMethodImage} preview={false} width='70px' /></div>
                                <div>Thanh toán qua ZaloPay</div>
                            </CardPaymentMethod>
                        </BadgeCheckedPaymentMethod>
                    </Col>
                </Row>,
        },
        {
            title: 'Last',
            content: <div>hihi</div>,
        },
    ];
    const [currentStep, setCurrentStep] = useState(0);
    const next = () => {
        // finished step 1 (filling delivery information form)
        if (currentStep === 0) {
            dispatch(setDeliveryInformation({ buyerState, userId: user?.id }));
        }
        setCurrentStep(currentStep + 1);
    };
    const prev = () => {
        setCurrentStep(currentStep - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 16,
    };
    // #endregion


    /*** MUTATION ***/
    // #region
    const mutationCreateOrder = useMutationHooks(
        ({ data, accessToken } = data) => {
            const res = OrderService.createOrder(data, accessToken);
            return res;
        }
    );
    const {
        data: dataCreateOrder,
        isLoading: isLoadingCreateOrder,
        isSuccess: isSuccessCreateOrder,
        isError: isErrorCreateOrder
    } = mutationCreateOrder;

    const handleCheckout = () => {
        if (order?.selectedOrderItems &&
            order?.deliveryInformation?.fullname &&
            order?.deliveryInformation?.phone &&
            order?.deliveryInformation?.address &&
            order?.paymentMethod &&
            order?.shippingPrice &&
            order?.subtotalPrice &&
            order?.totalPrice &&
            user?.id) {
            // eslint-disable-next-line no-unused-expressions
            mutationCreateOrder.mutate(
                {
                    data: {
                        orderItems: order?.selectedOrderItems,
                        fullname: order?.deliveryInformation?.fullname,
                        phone: order?.deliveryInformation?.phone,
                        address: order?.deliveryInformation?.address,
                        paymentMethod: order?.paymentMethod,
                        shippingPrice: order?.shippingPrice,
                        subtotalPrice: order?.subtotalPrice,
                        totalPrice: order?.totalPrice,
                        user: user?.id,
                    },
                    accessToken: user?.accessToken,
                },
            );
        }
    }
    // use effect
    useEffect(() => {
        if (isSuccessCreateOrder && dataCreateOrder?.status === "OK") {
            // remove all selected order items out of cart after ordering successful
            const selectedOrderItemsList = [];
            order?.selectedOrderItems?.forEach((element) => {
                selectedOrderItemsList.push(element.product);
            });
            dispatch(removeMultipleOrderProducts({ listCheckedProducts: selectedOrderItemsList, userId: user?.id }));
            MessagePopup.success("Đặt hàng thành công");
            navigate('/mycart/checkout/order-success', {
                state: {
                    selectedOrderItems: order?.selectedOrderItems,
                    deliveryInformation: order?.deliveryInformation,
                    paymentMethod: order?.paymentMethod,
                    subtotalPrice: order?.subtotalPrice,
                    shippingPrice: order?.shippingPrice,
                    totalPrice: order?.totalPrice,
                }
            });
        } else if (dataCreateOrder?.status === "ERR") {
            MessagePopup.error();
        }
    }, [isSuccessCreateOrder, isErrorCreateOrder]);
    // #endregion


    /*** NAVIGATE ***/
    // #region
    const navigate = useNavigate();
    const handleNavigateHomePage = () => {
        navigate('/');
    }
    const handleNavigateMyCart = () => {
        navigate('/mycart');
    }
    // #endregion

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
                        title: <span onClick={handleNavigateMyCart} style={{ cursor: 'pointer' }}>Giỏ hàng</span>,
                    },
                    {
                        title: <span>Thanh toán</span>,
                    },
                ]}
            >
            </Breadcrumb>
            <Row justify="center">
                <Divider>
                    <Col style={{ fontSize: '32px' }} >
                        <span style={{ fontWeight: '700' }}>Checkout </span>
                        <span>({order?.orderItems?.length})</span>
                    </Col>
                </Divider>
            </Row>
            {/* </LoadingComponent> */}

            <LoadingComponent isLoading={isLoadingCreateOrder}>
                <Row justify="space-between">
                    <Col span={16}>
                        <Row justify="center">
                            <Col span={24}>
                                <Card style={{ padding: '10px' }}>
                                    <Steps current={currentStep} items={items} />
                                    <div style={contentStyle}>
                                        {steps[currentStep].content}
                                    </div>
                                    <div
                                        style={{
                                            marginTop: 24,
                                        }}
                                    >
                                        {currentStep < steps.length - 1 && (
                                            <Button
                                                type="primary"
                                                onClick={() => next()}
                                                disabled={!buyerState.fullname.length || !buyerState.phone.length || !buyerState.address.length}>
                                                Next
                                            </Button>
                                        )}
                                        {currentStep === steps.length - 1 && (
                                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                                Done
                                            </Button>
                                        )}
                                        {currentStep > 0 && (
                                            <Button
                                                style={{
                                                    margin: '0 8px',
                                                }}
                                                onClick={() => prev()}
                                            >
                                                Previous
                                            </Button>
                                        )}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={7}>
                        <Row justify="center" style={{ marginBottom: '20px' }}>
                            <Col span={24}>
                                <Card style={{ padding: '0px 10px', fontSize: '18px' }}>
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
                            <Col span={24}>
                                <Popconfirm
                                    placement='bottom'
                                    title="Xác nhận đặt hàng"
                                    onConfirm={handleCheckout}
                                    okText="Chắc chắn"
                                    cancelText="Không"
                                    disabled={currentStep === 1 ? false : true}
                                >
                                    <Button
                                        type="primary"
                                        style={{ height: '40px', width: '100%', borderRadius: '20px', display: 'block' }}
                                        disabled={currentStep === 1 ? false : true}
                                    >
                                        <span>Đặt hàng</span>
                                    </Button>
                                </Popconfirm>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </LoadingComponent>
        </div>
    )
};

export default CheckoutPage
