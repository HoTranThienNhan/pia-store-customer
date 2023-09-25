import {
    DeleteOutlined,
    DollarOutlined,
    FieldNumberOutlined,
    FileTextOutlined,
    FormOutlined,
    InboxOutlined,
    PartitionOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    TagOutlined,
    UploadOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Col, Form, Input, Modal, Popconfirm, Row, Select, Switch, Upload } from 'antd';
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
import DrawerComponent from '../../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';

const ProductManagementComponent = () => {
    // useState
    const user = useSelector((state) => state?.user);
    const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
    const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState(false);
    const [isLoadingUpdateProduct, setIsLoadingUpdateProduct] = useState(false);
    const [productState, setProductState] = useState({
        id: '',
        name: '',
        type: '',
        image: '',
        countInStock: '',
        price: '',
        rating: '',
        description: '',
        active: true
    });
    const [updateProductState, setUpdateProductState] = useState({
        id: '',
        name: '',
        type: '',
        image: '',
        countInStock: '',
        price: '',
        rating: '',
        description: ''
    });
    const [activeProductState, setActiveProductState] = useState({
        active: true
    });


    const [selectedRow, setSelectedRow] = useState('');
    // get update product details
    const getUpdateProductDetails = async (id) => {
        const res = await ProductService.getProductDetails(id);
        if (res?.data) {
            setUpdateProductState({
                id: res?.data?.id,
                name: res?.data?.name,
                type: res?.data?.type,
                image: res?.data?.image,
                countInStock: res?.data?.countInStock,
                price: res?.data?.price,
                rating: res?.data?.rating,
                description: res?.data?.description
            });
        }
        setIsLoadingUpdateProduct(false);
    }
    const handleUpdateProductDetails = () => {
        setIsLoadingUpdateProduct(true);
        if (selectedRow) {
            getUpdateProductDetails(selectedRow);
        }
        showUpdateProductModal();
    }


    const handleActiveProductDetails = () => {
        // setIsLoadingUpdateProduct(true);
        if (selectedRow) {
            // getUpdateProductDetails(selectedRow);
            // console.log(selectedRow)
        }
        // setIsUpdateProductModalOpen(true);
    }



    // render table
    const renderTableUpdate = () => {
        return (
            <div>
                <FormOutlined style={{ fontSize: '24px', cursor: 'pointer' }} onClick={handleUpdateProductDetails} />
            </div>
        );
    }
    const renderTableActive = (isChecked) => {
        return (
            <div>
                {/* <FormOutlined style={{ fontSize: '24px', cursor: 'pointer' }} onClick={handleUpdateProductDetails} /> */}
                <Switch checked={isChecked} onChange={handleActiveProductDetails} />
            </div>
        );
    }

    // get all products
    const getAllProducts = async () => {
        const res = await ProductService.getAllProducts();
        return res;
    }
    const queryAllProducts = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts
    });
    const { isLoading: isLoadingAllProducts, data: allProducts } = queryAllProducts;

    // column of products table and products table
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
            title: 'Cập Nhật',
            dataIndex: 'update',
            render: renderTableUpdate
        },
        {
            title: 'Hoạt Động',
            dataIndex: 'active',
            render: (active) => {
                return renderTableActive(active);
            },
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
                description,
                active
            } = data;
            const res = ProductService.createProduct({
                id,
                name,
                type,
                image,
                countInStock,
                price,
                rating,
                description,
                active
            });
            return res;
        }
    );
    const { data, isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            MessagePopup.success();
            handleCreateProductCancel();
        } else if (data?.status === "ERR") {
            MessagePopup.error();
        }
    }, [isSuccess, isError]);


    // handle create product modals
    const showCreateProductModal = () => {
        setIsCreateProductModalOpen(true);
    };
    const onCreateProductFinish = () => {
        mutation.mutate(
            productState,
            {
                onSettled: () => {
                    queryAllProducts.refetch();
                }
            }
        );
    }
    const handleCreateProductOk = () => {
        onCreateProductFinish();
    };
    const handleCreateProductCancel = () => {
        setIsCreateProductModalOpen(false);
        setProductState({
            id: '',
            name: '',
            type: '',
            image: '',
            countInStock: '',
            price: '',
            rating: '',
            description: ''
        });
    };
    const handleCreateProductOnChangeImage = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setProductState({
            ...productState,
            image: file.preview
        });
    }
    const handleCreateProductRemoveImage = () => {
        setProductState({
            ...productState,
            image: ''
        });
    }
    const handleOnChangeProductState = (e) => {
        setProductState({
            ...productState,
            [e.target.name]: e.target.value
        });
    }


    // mutation update product
    const mutationUpdateProduct = useMutationHooks(
        ({ id, accessToken, updatedData } = data) =>
            ProductService.updateProduct(id, updatedData, accessToken)
    );
    const { data: dataUpdate, isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate } = mutationUpdateProduct;

    // use effect selected row on table
    useEffect(() => {
        if (selectedRow) {
            getUpdateProductDetails(selectedRow);
        }
    }, [selectedRow]);

    // use effect
    useEffect(() => {
        if (isSuccessUpdate && dataUpdate?.status === "OK") {
            MessagePopup.success();
            handleUpdateProductCancel();
            getAllProducts();
        } else if (dataUpdate?.status === "ERR") {
            MessagePopup.error();
        }
    }, [isSuccessUpdate, isErrorUpdate]);

    // handle update product modals
    const showUpdateProductModal = () => {
        setIsUpdateProductModalOpen(true);
    };
    const handleUpdateProductCancel = () => {
        setIsUpdateProductModalOpen(false);
        setSelectedRow(null);
        setUpdateProductState({
            id: '',
            name: '',
            type: '',
            image: '',
            countInStock: '',
            price: '',
            rating: '',
            description: ''
        });
    };
    const handleUpdateProductRemoveImage = () => {
        setUpdateProductState({
            ...updateProductState,
            image: ''
        });
    }
    const handleUpdateProductOnChangeImage = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setUpdateProductState({
            ...updateProductState,
            image: file.preview
        });
    }
    const handleOnChangeUpdateProductState = (e) => {
        setUpdateProductState({
            ...updateProductState,
            [e.target.name]: e.target.value
        });
    }
    const onUpdateProductFinish = () => {
        mutationUpdateProduct.mutate(
            {
                id: selectedRow,
                accessToken: user?.accessToken,
                updatedData: updateProductState
            },
            {
                onSettled: () => {
                    queryAllProducts.refetch();
                }
            }
        );
    }
    const handleUpdateProductOk = () => {
        onUpdateProductFinish();
    };

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
                    <Button className='add-new-product-button' onClick={showCreateProductModal} >
                        <PlusOutlined />
                    </Button>
                    {/* Modal Create New Product */}
                    <Modal
                        title="Thêm Sản Phẩm"
                        open={isCreateProductModalOpen}
                        maskClosable={false}
                        width="550px"
                        closeIcon={null}
                        footer={[
                            <Popconfirm
                                placement='topRight'
                                title="Xác nhận hủy"
                                description="Bạn chắc chắn muốn hủy thao tác?"
                                onConfirm={handleCreateProductCancel}
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
                                <Button key="back">
                                    Hủy
                                </Button>
                            </Popconfirm>,
                            <Popconfirm
                                placement='topLeft'
                                title="Xác nhận thêm sản phẩm"
                                description="Bạn chắc chắn muốn thêm sản phẩm này?"
                                onConfirm={handleCreateProductOk}
                                okText="Chắc chắn"
                                cancelText="Không"
                            >
                                <Button key="submit" type="primary">
                                    Thêm
                                </Button>
                            </Popconfirm>,
                        ]}>
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
                                                <Upload onChange={handleCreateProductOnChangeImage} maxCount={1}>
                                                    <Button className='product-image-upload-button' icon={<UploadOutlined />} type='primary' ghost>
                                                        Upload
                                                    </Button>
                                                </Upload>
                                                {productState.image &&
                                                    <Button
                                                        className='product-image-remove-button'
                                                        icon={<DeleteOutlined />}
                                                        onClick={handleCreateProductRemoveImage}
                                                        danger
                                                    >
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

                <div>
                    {/* Modal Update New Product */}
                    <Modal
                        title="Cập Nhật Sản Phẩm"
                        open={isUpdateProductModalOpen}
                        maskClosable={false}
                        width="550px"
                        closeIcon={null}
                        footer={[
                            <Popconfirm
                                placement='topRight'
                                title="Xác nhận hủy"
                                description="Bạn chắc chắn muốn hủy thao tác?"
                                onConfirm={handleUpdateProductCancel}
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
                                <Button key="back">
                                    Hủy
                                </Button>
                            </Popconfirm>,
                            <Popconfirm
                                placement='topLeft'
                                title="Xác nhận cập nhật sản phẩm"
                                description="Bạn chắc chắn muốn cập nhật sản phẩm này?"
                                onConfirm={handleUpdateProductOk}
                                okText="Chắc chắn"
                                cancelText="Không"
                            >
                                <Button key="submit" type="primary">
                                    Cập Nhật
                                </Button>
                            </Popconfirm>,
                        ]}>
                        <LoadingComponent isLoading={isLoadingUpdateProduct}>
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
                                        value={updateProductState.id}
                                        styleBefore={{ left: '37px', top: '31px' }}
                                        styleAfter={{ left: '37px', top: '23px' }}
                                    >
                                        <InputFormComponent
                                            name="id"
                                            placeholder=""
                                            prefix={<FieldNumberOutlined className="site-form-item-icon" />}
                                            className='auth-input-product-id'
                                            value={updateProductState.id}
                                            onChange={handleOnChangeUpdateProductState}
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
                                        value={updateProductState.name}
                                        styleBefore={{ left: '37px', top: '31px' }}
                                        styleAfter={{ left: '37px', top: '23px' }}
                                    >
                                        <InputFormComponent
                                            name="name"
                                            placeholder=""
                                            prefix={<TagOutlined className="site-form-item-icon" />}
                                            className='auth-input-product-name'
                                            value={updateProductState.name}
                                            onChange={handleOnChangeUpdateProductState}
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
                                        value={updateProductState.type}
                                        styleBefore={{ left: '37px', top: '31px' }}
                                        styleAfter={{ left: '37px', top: '23px' }}
                                    >
                                        <InputFormComponent
                                            name="type"
                                            placeholder=""
                                            prefix={<PartitionOutlined className="site-form-item-icon" />}
                                            className='auth-input-product-type'
                                            value={updateProductState.type}
                                            onChange={handleOnChangeUpdateProductState}
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
                                                value={updateProductState.countInStock}
                                                styleBefore={{ left: '37px', top: '31px' }}
                                                styleAfter={{ left: '37px', top: '23px' }}
                                            >
                                                <InputFormComponent
                                                    name="countInStock"
                                                    placeholder=""
                                                    prefix={<InboxOutlined className="site-form-item-icon" />}
                                                    className='auth-input-product-count-in-stock'
                                                    value={updateProductState.countInStock}
                                                    onChange={handleOnChangeUpdateProductState}
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
                                                value={updateProductState.price}
                                                styleBefore={{ left: '37px', top: '31px' }}
                                                styleAfter={{ left: '37px', top: '23px' }}
                                            >
                                                <InputFormComponent
                                                    name="price"
                                                    placeholder=""
                                                    prefix={<DollarOutlined className="site-form-item-icon" />}
                                                    className='auth-input-product-price'
                                                    value={updateProductState.price}
                                                    onChange={handleOnChangeUpdateProductState}
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
                                        value={updateProductState.description}
                                        styleBefore={{ left: '19px', top: '31px' }}
                                        styleAfter={{ left: '19px', top: '23px' }}
                                    >
                                        <Input.TextArea
                                            name="description"
                                            prefix={<FileTextOutlined className="site-form-item-icon" />}
                                            rows={2}
                                            className='auth-input-product-description'
                                            value={updateProductState.description}
                                            style={{
                                                borderRadius: '10px',
                                                padding: '20px 18px',
                                                marginTop: '20px',
                                                border: '1px solid #000'
                                            }}
                                            onChange={handleOnChangeUpdateProductState}
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
                                                {updateProductState.image &&
                                                    (<img className='uploaded-product-image' src={updateProductState.image} alt='product-image' />)}
                                            </div>
                                            <div>
                                                <Upload onChange={handleUpdateProductOnChangeImage} maxCount={1}>
                                                    <Button className='product-image-upload-button' icon={<UploadOutlined />} type='primary' ghost>
                                                        Upload
                                                    </Button>
                                                </Upload>
                                                {updateProductState.image &&
                                                    <Button
                                                        className='product-image-remove-button'
                                                        icon={<DeleteOutlined />}
                                                        onClick={handleUpdateProductRemoveImage}
                                                        danger
                                                    >
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
                    <TableComponent
                        columns={columnsProducts}
                        data={dataProductsTable}
                        isLoading={isLoadingAllProducts}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {
                                    setSelectedRow(record?._id)
                                },
                                onChange: event => {
                                    setSelectedRow(record?._id)
                                },
                            };
                        }}
                    />
                </div>
            </div>
        </WrapperProductManagement>
    )
};

export default ProductManagementComponent;
