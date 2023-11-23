import { Breadcrumb, Button, Col, Divider, Image, Input, InputNumber, Modal, Popconfirm, Rate, Row, Tabs, Upload } from 'antd';
import React, { useState } from 'react';
import { FileTextOutlined, MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons'
import InputNumberComponent from '../../components/InputNumberComponent/InputNumberComponent';
import { DetailContentDiv, DetailsReviewSection, InputNumberCustom, PriceSpan, StarRating } from './style';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderProduct } from '../../redux/slices/orderSlice';
import { getBase64 } from '../../utils';
import TextArea from 'antd/es/input/TextArea';
import * as ReviewService from '../../services/ReviewService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as MessagePopup from '../../components/MessagePopupComponent/MessagePopupComponent';


const ProductsPage = () => {
    const user = useSelector((state) => state?.user);
    const { orderId, productId } = useParams();


    /*** NAVIGATE ***/
    const navigate = useNavigate();
    const handleNavigateHomePage = () => {
        navigate('/');
    }


    /*** GET PRODUCT DETAILS ***/
    const getActiveProductDetails = async (context) => {
        const productId = context?.queryKey && context?.queryKey[1];
        if (productId) {
            const res = await ProductService.getActiveProductDetails(productId);
            if (res?.status === 'ERR') {
                // navigate('/NotFoundPage');
            }
            return res?.data;
        }
    }
    const { isLoading, data: productDetails } = useQuery(
        {
            queryKey: ['productDetails', productId],
            queryFn: getActiveProductDetails,
            enabled: !!productId,
        }
    );


    /*** IMAGES PREVIEW LIST ***/
    const [previewImageOpen, setPreviewImageOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewImageTitle, setPreviewImageTitle] = useState('');
    const [fileImageList, setFileImageList] = useState([]);
    // uploadedImages contains list of images which are converted to base64 type
    const [uploadedImages, setUploadedImages] = useState([]);
    const handleCancelImagePreview = () => setPreviewImageOpen(false);
    const handleImagePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewImageOpen(true);
        setPreviewImageTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChangeImagePreview = ({ fileList: newFileImagesList }) => {
        setFileImageList(newFileImagesList);
        let imagesList = [];
        newFileImagesList?.map(async (image) => {
            imagesList.push(await getBase64(image.originFileObj));
        });
        setUploadedImages(imagesList);
    }
    const uploadImagePreviewButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Tải lên
            </div>
        </div>
    );


    /*** RATING ***/
    const [ratingValue, setRatingValue] = useState(5);
    const ratingDescription = ['Tệ', 'Không Hài Lòng', 'Bình Thường', 'Tốt', 'Tuyệt Vời'];


    const [reviewComment, setReviewComment] = useState("");
    const handleChangeReviewComment = (e) => {
        setReviewComment(e.target.value);
    }


    /*** SEND REVIEW ***/
    // mutation
    const mutationReview = useMutationHooks(
        data => ReviewService.createReview(data)
    );
    const handleSendReview = async () => {
        const userId = user?.id;
        const productId = productDetails?._id;
        const rating = ratingValue;
        const images = uploadedImages;
        const comment = reviewComment;
        if (!reviewComment) {
            MessagePopup.error("Vui lòng nhập nhận xét sản phẩm");
        } else {
            mutationReview.mutate({
                userId,
                productId,
                orderId,
                comment,
                rating,
                images
            },
                {
                    onSuccess: () => {
                        MessagePopup.success("Đánh giá sản phẩm thành công");
                        handleNavigateHomePage();
                    }
                });
        }
    }


    return (
        // <LoadingComponent isLoading={isLoading}>
        <div id="container" style={{ padding: '85px 70px 50px 70px', height: '100%', backgroundColor: 'whitesmoke' }}>
            {/* {productDetails && <> */}
            <Breadcrumb
                style={{ paddingLeft: '24px', marginTop: '20px', marginBottom: '40px' }}
                items={[
                    {
                        title: <span onClick={handleNavigateHomePage} style={{ cursor: 'pointer' }}>Trang chủ</span>,
                    },
                    {
                        title: <span>Đánh giá sản phẩm</span>,
                    },
                ]}
            >
            </Breadcrumb>
            <Row justify="space-around">
                <Col span={8} style={{ paddingLeft: '30px' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', cursor: 'context-menu', marginBottom: '15px' }}>
                        {productDetails?.name}
                    </div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', cursor: 'context-menu', marginBottom: '30px' }}>
                        {productDetails?.price?.toLocaleString()} VNĐ
                    </div>
                    <Image
                        src={productDetails?.image}
                        width={250}
                        height={320}
                        alt="product"
                        preview={true}
                        draggable={false}
                        style={{
                            filter: 'drop-shadow(2px 5px 5px #666)',
                            WebkitFilter: 'drop-shadow(2px 5px 5px #666)'
                        }}
                    />
                </Col>
                <Col span={12}>
                    <div>
                        <div style={{ fontSize: '20px', fontWeight: '600', cursor: 'context-menu' }}>Chất Lượng Sản Phẩm</div>
                        <StarRating>
                            <span>
                                <Rate tooltips={ratingDescription} onChange={setRatingValue} value={ratingValue} allowClear={false} />
                                {ratingValue ? <span className="ant-rate-text">{ratingDescription[ratingValue - 1]}</span> : ''}
                            </span>
                        </StarRating>
                    </div>
                    <Divider></Divider>
                    <div>
                        <div style={{ fontSize: '20px', fontWeight: '600', cursor: 'context-menu', marginBottom: '15px' }}>Nhận Xét Sản Phẩm</div>
                        <TextArea style={{ height: '100px' }} placeholder="Nhận xét về sản phẩm" allowClear onChange={handleChangeReviewComment} />
                    </div>
                    <Divider></Divider>
                    <DetailContentDiv>
                        <Row>
                            <Col span={24}>
                                <div style={{ fontSize: '20px', fontWeight: '600', cursor: 'context-menu', marginBottom: '15px' }}>Thêm Hình Ảnh</div>
                            </Col>
                            <Col span={24}>
                                <div>
                                    <Upload
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        listType="picture-card"
                                        fileList={fileImageList}
                                        onPreview={handleImagePreview}
                                        onChange={handleChangeImagePreview}
                                    >
                                        {fileImageList.length >= 3 ? null : uploadImagePreviewButton}
                                    </Upload>
                                </div>
                                <Modal open={previewImageOpen} title={previewImageTitle} footer={null} onCancel={handleCancelImagePreview}>
                                    <img
                                        alt="example"
                                        style={{
                                            width: '100%',
                                        }}
                                        src={previewImage}
                                    />
                                </Modal>
                            </Col>
                        </Row>
                    </DetailContentDiv>
                    <div style={{ marginTop: '25px' }}>
                        <Popconfirm
                            placement='topRight'
                            title="Xác nhận đánh giá"
                            description={<span>Bạn chắc chắn muốn đánh giá sản phẩm này?</span>}
                            onConfirm={() => handleSendReview()}
                            okText="Chắc chắn"
                            cancelText="Không"
                        >
                            <Button type='primary' style={{ borderRadius: '25px' }}>
                                Gửi Thông Tin
                            </Button>
                        </Popconfirm>
                    </div>
                </Col>
            </Row>
            {/* </>} */}
        </div>
        // </LoadingComponent>
    )
};

export default ProductsPage
