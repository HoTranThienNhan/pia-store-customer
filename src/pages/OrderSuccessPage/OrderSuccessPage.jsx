import { Breadcrumb, Button, Col, Divider, Drawer, Image, Result, Row, Tooltip } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';

const OrderSuccessPage = () => {
    const order = useSelector((state) => state?.order);
    const user = useSelector((state) => state?.user);

    const location = useLocation();
    // state contains order information
    const { state } = location;


    /*** PDF CONVERTER ***/
    const options = {
        // default is `save`
        method: 'open',
        // default is Resolution.MEDIUM = 3, which should be enough, higher values
        // increases the image quality but also the size of the PDF, so be careful
        // using values higher than 10 when having multiple pages generated, it
        // might cause the page to crash or hang.
        resolution: Resolution.MEDIUM,
        page: {
            // margin is in MM, default is Margin.NONE = 0
            margin: Margin.MEDIUM,
            // default is 'A4'
            format: 'A4',
            // default is 'portrait'
            orientation: 'portrait',
        },
        canvas: {
            // default is 'image/jpeg' for better size performance
            mimeType: 'image/png',
            qualityRatio: 1
        },
        // Customize any value passed to the jsPDF instance and html2canvas
        // function. You probably will not need this and things can break, 
        // so use with caution.
        overrides: {
            // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
            pdf: {
                compress: true
            },
            // see https://html2canvas.hertzen.com/configuration for more options
            canvas: {
                useCORS: true
            }
        },
    };
    const getAllOrderInformationPart = () => document.getElementsByClassName('all-order-information')[0];


    /*** NAVIGATE ***/
    const navigate = useNavigate();
    const handleNavigateHomePage = () => {
        navigate('/');
    }
    const handleNavigateMenuPage = () => {
        navigate('/menu');
    }
    // if (order?.selectedOrderItems?.length === 0) {
    //     navigate('/');
    // }
    

    return (
        <div id="container" style={{ padding: '85px 120px 0px 120px', height: '100%' }}>
            <Breadcrumb
                style={{ paddingLeft: '24px', marginTop: '20px', marginBottom: '20px', userSelect: 'none' }}
                items={[
                    {
                        title: <span onClick={handleNavigateHomePage} style={{ cursor: 'pointer' }}>Trang chủ</span>,
                    },
                    {
                        title: <span>Đặt hàng thành công</span>,
                    },
                ]}
            >
            </Breadcrumb>
            <div>
                <Row justify="space-between">
                    <Col span={17} style={{ borderRight: '2px solid #dcdcdc4d' }}>
                        <Result
                            status="success"
                            title={<span style={{ fontWeight: 'bold', fontSize: '32px' }}>Đơn đặt hàng đã được xác nhận!</span>}
                            subTitle={
                                <span style={{ fontSize: '16px' }}>
                                    Cảm ơn bạn đã tin tưởng và lựa chọn sản phẩm của BRAND NAME để có được những trải nghiệm tuyệt vời.
                                    <br />
                                    Đơn hàng của bạn sẽ được giao đến tay sớm nhất có thể.
                                </span>
                            }
                            extra={[
                                <Button type="primary" onClick={handleNavigateHomePage}>
                                    Về Trang Chủ
                                </Button>,
                                <Button onClick={handleNavigateMenuPage}>Mua Sản Phẩm Khác</Button>,
                            ]}
                        />
                    </Col>
                    <Col span={6}>
                        <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
                            <Col style={{ fontSize: '20px', fontWeight: '700' }}>
                                ĐƠN HÀNG
                            </Col>
                            <Col>
                                <Button style={{ fontSize: '12px' }} onClick={() => generatePDF(getAllOrderInformationPart, options)}>
                                    Xem Dưới Dạng PDF
                                </Button>
                            </Col>
                        </Row>
                        <div className="all-order-information">
                            <div style={{ fontSize: '16px' }}>
                                <Divider style={{ fontSize: '18px' }}>THÔNG TIN LIÊN HỆ</Divider>
                                <Row justify="space-between" style={{ marginBottom: '5px', fontWeight: '600' }}>
                                    <Col>Họ Tên Người Nhận:</Col>
                                    <Col>{state?.deliveryInformation?.fullname}</Col>
                                </Row>
                                <Row justify="space-between" style={{ marginBottom: '5px', fontWeight: '600' }}>
                                    <Col>Số Điện Thoại:</Col>
                                    <Col>{state?.deliveryInformation?.phone}</Col>
                                </Row>
                                <Row justify="space-between" style={{ marginBottom: '5px', fontWeight: '600' }}>
                                    <Col>Địa Chỉ Nhận Hàng:</Col>
                                    <Col>{state?.deliveryInformation?.address}</Col>
                                </Row>
                            </div>
                            <div style={{ marginTop: '30px' }}>
                                <Divider style={{ fontSize: '18px' }}>THÔNG TIN ĐƠN HÀNG</Divider>
                                <Row justify="space-between" style={{ marginBottom: '5px', fontWeight: '600' }}>
                                    <Col>Tổng Số Lượng:</Col>
                                    <Col>{state?.selectedOrderItems?.length} mặt hàng</Col>
                                </Row>
                                <Row justify="space-between" style={{ marginBottom: '5px', fontWeight: '600' }}>
                                    <Col>Phương thức thanh toán:</Col>
                                    <Col>{state?.paymentMethod}</Col>
                                </Row>
                                <Row justify="space-between" style={{ marginBottom: '5px', fontWeight: '600' }}>
                                    <Col>Tạm Tính:</Col>
                                    <Col>{state?.subtotalPrice?.toLocaleString()} VNĐ</Col>
                                </Row>
                                <Row justify="space-between" style={{ marginBottom: '5px', fontWeight: '600' }}>
                                    <Col>
                                        <span style={{ marginRight: '3px' }}>Phí Vận Chuyển: </span>
                                        <Tooltip title="Giảm còn 12.000 VNĐ khi tổng giá trị sản phẩm từ 100.000 VNĐ" color="black">
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    </Col>
                                    <Col>{state?.shippingPrice?.toLocaleString()} VNĐ</Col>
                                </Row>
                                <Row justify="space-between" style={{ marginBottom: '5px', fontWeight: '600' }}>
                                    <Col>Giảm Voucher:</Col>
                                    <Col>- 0 VNĐ</Col>
                                </Row>
                                <Row justify="space-between" style={{ marginBottom: '5px', marginTop: '10px', fontWeight: '600' }}>
                                    <Col style={{ fontSize: '18px' }}>Tổng Tiền:</Col>
                                    <Col style={{ fontSize: '18px' }}>{state?.totalPrice?.toLocaleString()} VNĐ</Col>
                                </Row>
                            </div>
                            <div style={{ margin: '30px 0px 40px 0px' }}>
                                <Divider style={{ fontSize: '18px' }}>CHI TIẾT SẢN PHẨM ({state?.selectedOrderItems?.length})</Divider>
                                {state?.selectedOrderItems?.map((item) => (
                                    <Row justify="space-between" style={{ marginBottom: '15px', fontWeight: '600' }}>
                                        <Col span={7}>
                                            <Image src={item.image} preview={false} draggable={false} />
                                        </Col>
                                        <Col span={15}>
                                            <Row style={{ marginBottom: '5px', fontWeight: '600' }}>{item.name}</Row>
                                            <Row style={{ marginBottom: '5px', fontWeight: '600' }}>{item.price.toLocaleString()} VNĐ</Row>
                                            <Row style={{ marginBottom: '5px', fontWeight: '600' }}>x {item.amount}</Row>
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default OrderSuccessPage
