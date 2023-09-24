import {
    DeleteOutlined,
    DollarOutlined,
    FileTextOutlined,
    InboxOutlined,
    PartitionOutlined,
    PlusOutlined,
    TagOutlined,
    UploadOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Form, Modal, Upload } from 'antd';
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

const ProductManagementComponent = () => {
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
                    <Modal title="Thêm Sản Phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <LoadingComponent isLoading={isLoading}>
                            <Form autoComplete="off">
                                <Form.Item
                                    label=""
                                    validateStatus={"validating"}
                                    help=""
                                    style={{ marginBottom: '0px' }}
                                    className='auth-form-item-product-id'
                                >
                                    <FloatingLabelComponent label="Mã sản phẩm" value={productState.id}>
                                        <InputFormComponent
                                            name="id"
                                            placeholder=""
                                            prefix={<TagOutlined className="site-form-item-icon" />}
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
                                    <FloatingLabelComponent label="Tên sản phẩm" value={productState.name}>
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
                                    <FloatingLabelComponent label="Loại sản phẩm" value={productState.type}>
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
                                <Form.Item
                                    label=""
                                    validateStatus={"validating"}
                                    help=""
                                    style={{ marginBottom: '0px' }}
                                    className='auth-form-item-product-count-in-stock'
                                >
                                    <FloatingLabelComponent label="Số lượng tồn kho" value={productState.countInStock}>
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
                                <Form.Item
                                    label=""
                                    validateStatus={"validating"}
                                    help=""
                                    style={{ marginBottom: '0px' }}
                                    className='auth-form-item-product-price'
                                >
                                    <FloatingLabelComponent label="Giá" value={productState.price}>
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
                                <Form.Item
                                    label=""
                                    validateStatus={"validating"}
                                    help=""
                                    style={{ marginBottom: '0px' }}
                                    className='auth-form-item-product-description'
                                >
                                    <FloatingLabelComponent label="Mô tả" value={productState.description}>
                                        <InputFormComponent
                                            name="description"
                                            placeholder=""
                                            prefix={<FileTextOutlined className="site-form-item-icon" />}
                                            className='auth-input-product-description'
                                            value={productState.description}
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
                                    style={{ marginBottom: '0px', width: '450px' }}
                                    className='edit-form-item-avatar'
                                >
                                    <WrapperUploadProductImage>
                                        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>Ảnh sản phẩm</div>
                                        <div style={{ display: 'grid' }}>
                                            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                                                {productState.image ?
                                                    (<img className='uploaded-product-image' src={productState.image} alt='product-image' />) :
                                                    <Avatar className='uploaded-default-image' size={90} icon={<UserOutlined />} />}
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
                    <TableComponent />
                </div>
            </div>
        </WrapperProductManagement>
    )
};

export default ProductManagementComponent;
