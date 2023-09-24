import {
    DeleteOutlined,
    DollarOutlined,
    FieldNumberOutlined,
    FileTextOutlined,
    FormOutlined,
    InboxOutlined,
    PartitionOutlined,
    PlusOutlined,
    TagOutlined,
    UploadOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Col, Form, Input, Modal, Row, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import TableComponent from '../../TableComponent/TableComponent';
import { WrapperProductManagement, WrapperUploadProductImage } from './style';
import FloatingLabelComponent from '../../FloatingLabelComponent/FloatingLabelComponent';
import InputFormComponent from '../../InputFormComponent/InputFormComponent';
import { getBase64 } from '../../../utils';
import * as ProductService from '../../../services/ProductService';
import { useMutationHooks } from '../../../hooks/useMutationHook';
import LoadingComponent from '../../LoadingComponent/LoadingComponent';
import * as MessagePopup from '../../../components/MessagePopupComponent/MessagePopupComponent';
import TextArea from 'antd/es/input/TextArea';
import { useQuery } from '@tanstack/react-query';

const ProductManagementComponent = () => {
    const renderTableAction = () => {
        return (
            <div>
                <FormOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
                {/* <DeleteOutlined /> */}
            </div>
        );
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productState, setProductState] = useState({
        name: '',
        type: '',
        image: '',
        countInStock: '',
        price: '',
        rating: '',
        description: ''
    });

    const getAllProducts = async () => {
        const res = await ProductService.getAllProducts();
        return res;
    }

    const { isLoading: isLoadingAllProducts, data: allProducts } = useQuery({
        queryKey: ['products'], 
        queryFn: getAllProducts
    });

    const columnsProducts = [
        {
            title: 'Mã SP',
            dataIndex: 'id'
        },
        {
            title: 'Tên SP',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Giá SP',
            dataIndex: 'price',
        },
        {
            title: 'Loại SP',
            dataIndex: 'type',
        },
        {
            title: 'Số Lượng',
            dataIndex: 'countInStock',
        },
        // {
        //     title: 'Đánh Giá',
        //     dataIndex: 'rating',
        // },
        // {
        //     title: 'Mô Tả',
        //     dataIndex: 'description',
        // },
        {
            title: 'Chỉnh sửa',
            dataIndex: 'action',
            render: renderTableAction
        }
    ];
    const dataProductsTable = allProducts?.data?.length && allProducts?.data?.map((product) => {
        return {
            ...product, 
            key: product.id
        }
    });

    // mutation
    const mutation = useMutationHooks(
        (data) => {
            const {
                id,
                name,
                type,
                image,
                countInStock,
                price,
                rating,
                description
            } = data;
            const res = ProductService.createProduct({
                id,
                name,
                type,
                image,
                countInStock,
                price,
                rating,
                description
            });
            return res;
        }
    );
    const { data, isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            MessagePopup.success();
            handleCancel();
        } else if (data?.status === "ERR") {
            MessagePopup.error();
        }
    }, [isSuccess, isError]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onFinish = () => {
        mutation.mutate(productState);
    }

    const handleOk = () => {
        onFinish();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setProductState({
            name: '',
            type: '',
            image: '',
            countInStock: '',
            price: '',
            rating: '',
            description: ''
        });
    };

    const handleOnChangeImage = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setProductState({
            ...productState,
            image: file.preview
        });
    }

    const handleRemoveImage = () => {
        setProductState({
            ...productState,
            image: ''
        });
    }

    const handleOnChangeProductState = (e) => {
        console.log(e)
        setProductState({
            ...productState,
            [e.target.name]: e.target.value
        });
    }

    return (
        <WrapperProductManagement>
            <div>
                <h2 style={{ fontWeight: 'bold' }}>Quản Lý Sản Phẩm</h2>
                <Breadcrumb
                    items={[
                        {
                            title: <a href="/">Home</a>,
                        },
                        {
                            title: 'Quản lý sản phẩm',
                        },
                    ]}
                />
            </div>
            <div style={{ padding: '30px 0px' }}>
                <div className='add-new-product'>
                    <Button className='add-new-product-button' onClick={showModal}>
                        <PlusOutlined />
                    </Button>
                    {/* Modal Create New Product */}
                    <Modal title="Thêm Sản Phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width="550px">
                        <LoadingComponent isLoading={isLoading}>
                            <Form autoComplete="off">
                                <Form.Item
                                    label=""
                                    validateStatus={"validating"}
                                    help=""
                                    style={{ marginBottom: '0px' }}
                                    className='auth-form-item-product-id'
                                >
                                    <FloatingLabelComponent
                                        label="Mã sản phẩm"
                                        value={productState.id}
                                        styleBefore={{ left: '37px', top: '31px' }}
                                        styleAfter={{ left: '37px', top: '23px' }}
                                    >
                                        <InputFormComponent
                                            name="id"
                                            placeholder=""
                                            prefix={<FieldNumberOutlined className="site-form-item-icon" />}
                                            className='auth-input-product-id'
                                            value={productState.id}
                                            onChange={handleOnChangeProductState}
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
                                    className='auth-form-item-product-name'
                                >
                                    <FloatingLabelComponent
                                        label="Tên sản phẩm"
                                        value={productState.name}
                                        styleBefore={{ left: '37px', top: '31px' }}
                                        styleAfter={{ left: '37px', top: '23px' }}
                                    >
                                        <InputFormComponent
                                            name="name"
                                            placeholder=""
                                            prefix={<TagOutlined className="site-form-item-icon" />}
                                            className='auth-input-product-name'
                                            value={productState.name}
                                            onChange={handleOnChangeProductState}
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
                                        label="Loại sản phẩm"
                                        value={productState.type}
                                        styleBefore={{ left: '37px', top: '31px' }}
                                        styleAfter={{ left: '37px', top: '23px' }}
                                    >
                                        <InputFormComponent
                                            name="type"
                                            placeholder=""
                                            prefix={<PartitionOutlined className="site-form-item-icon" />}
                                            className='auth-input-product-type'
                                            value={productState.type}
                                            onChange={handleOnChangeProductState}
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
                                <Row justify="space-between">
                                    <Col span={11}>
                                        <Form.Item
                                            label=""
                                            validateStatus={"validating"}
                                            help=""
                                            style={{ marginBottom: '0px' }}
                                            className='auth-form-item-product-count-in-stock'
                                        >
                                            <FloatingLabelComponent
                                                label="Số lượng tồn kho"
                                                value={productState.countInStock}
                                                styleBefore={{ left: '37px', top: '31px' }}
                                                styleAfter={{ left: '37px', top: '23px' }}
                                            >
                                                <InputFormComponent
                                                    name="countInStock"
                                                    placeholder=""
                                                    prefix={<InboxOutlined className="site-form-item-icon" />}
                                                    className='auth-input-product-count-in-stock'
                                                    value={productState.countInStock}
                                                    onChange={handleOnChangeProductState}
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
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label=""
                                            validateStatus={"validating"}
                                            help=""
                                            style={{ marginBottom: '0px' }}
                                            className='auth-form-item-product-price'
                                        >
                                            <FloatingLabelComponent
                                                label="Giá"
                                                value={productState.price}
                                                styleBefore={{ left: '37px', top: '31px' }}
                                                styleAfter={{ left: '37px', top: '23px' }}
                                            >
                                                <InputFormComponent
                                                    name="price"
                                                    placeholder=""
                                                    prefix={<DollarOutlined className="site-form-item-icon" />}
                                                    className='auth-input-product-price'
                                                    value={productState.price}
                                                    onChange={handleOnChangeProductState}
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
                                    </Col>
                                </Row>
                                <Form.Item
                                    label=""
                                    validateStatus={"validating"}
                                    help=""
                                    style={{ marginBottom: '0px' }}
                                    className='auth-form-item-product-description'
                                >
                                    <FloatingLabelComponent
                                        label="Mô tả"
                                        value={productState.description}
                                        styleBefore={{ left: '19px', top: '31px' }}
                                        styleAfter={{ left: '19px', top: '23px' }}
                                    >
                                        <Input.TextArea
                                            name="description"
                                            prefix={<FileTextOutlined className="site-form-item-icon" />}
                                            rows={2}
                                            className='auth-input-product-description'
                                            value={productState.description}
                                            style={{
                                                borderRadius: '10px',
                                                padding: '20px 18px',
                                                marginTop: '20px',
                                                border: '1px solid #000'
                                            }}
                                            onChange={handleOnChangeProductState}
                                        />
                                    </FloatingLabelComponent>
                                </Form.Item>
                                <Form.Item
                                    label=""
                                    validateStatus={"validating"}
                                    help=""
                                    style={{ marginBottom: '0px', width: '450px' }}
                                    className='edit-form-item-avatar'
                                >
                                    <WrapperUploadProductImage>
                                        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>Ảnh sản phẩm</div>
                                        <div style={{ display: 'grid' }}>
                                            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                                                {productState.image &&
                                                    (<img className='uploaded-product-image' src={productState.image} alt='product-image' />)}
                                            </div>
                                            <div>
                                                <Upload onChange={handleOnChangeImage} maxCount={1}>
                                                    <Button className='product-image-upload-button' icon={<UploadOutlined />} type='primary' ghost>
                                                        Upload
                                                    </Button>
                                                </Upload>
                                                {productState.image &&
                                                    <Button className='product-image-remove-button' icon={<DeleteOutlined />} onClick={handleRemoveImage} danger>
                                                        Remove
                                                    </Button>}
                                            </div>
                                        </div>
                                    </WrapperUploadProductImage>
                                </Form.Item>
                            </Form>
                        </LoadingComponent>
                    </Modal>
                </div>
                <div className='all-products all-products-area'>
                    <div className='all-products-title'>Tất Cả Sản Phẩm</div>
                    <TableComponent columns={columnsProducts} data={dataProductsTable} isLoading={isLoadingAllProducts} />
                </div>
            </div>
        </WrapperProductManagement>
    )
};

export default ProductManagementComponent;
