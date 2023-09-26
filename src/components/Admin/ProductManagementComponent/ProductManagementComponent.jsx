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
    SearchOutlined,
    TagOutlined,
    UploadOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Col, Form, Input, Modal, Popconfirm, Row, Select, Space, Switch, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
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
    /*** USE STATE ***/
    const user = useSelector((state) => state?.user);

    const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
    const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState(false);

    const [isLoadingUpdateProduct, setIsLoadingUpdateProduct] = useState(false);
    const [isLoadingActiveProduct, setIsLoadingActiveProduct] = useState(false);

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
    const [selectedActiveRow, setSelectedActiveRow] = useState('');

    // const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);


    /*** RENDER TABLE ***/
    const renderTableUpdate = () => {
        return (
            <div>
                <FormOutlined className='all-products-update' style={{ fontSize: '24px', cursor: 'pointer' }} onClick={handleUpdateProductDetails} />
            </div>
        );
    }
    const renderTableActive = (isActive) => {
        return (
            <div>
                <Form>
                    <Popconfirm
                        placement='topRight'
                        title="Xác nhận ẩn/hiện sản phẩm"
                        description={<span>Bạn chắc chắn muốn thực hiện<br /> thao tác này?</span>}
                        onConfirm={handleActiveProductConfirm}
                        onCancel={handleActiveProductCancel}
                        okText="Chắc chắn"
                        cancelText="Không"
                    >
                        <Switch
                            className='all-products-active'
                            checked={isActive}
                            loading={isLoadingActiveProduct}
                            onChange={handleOnChangeActiveProductState}
                        />
                    </Popconfirm>
                </Form>
            </div>
        );
    }


    /*** GET ALL PRODUCTS ***/
    const getAllProducts = async () => {
        const res = await ProductService.getAllProducts();
        return res;
    }
    const queryAllProducts = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts
    });
    const { isLoading: isLoadingAllProducts, data: allProducts } = queryAllProducts;


    /*** SEARCH ***/
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputFormComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{
        //                 backgroundColor: '#ffc069',
        //                 padding: 0,
        //             }}
        //             searchWords={[searchText]}
        //             autoEscape
        //             textToHighlight={text ? text.toString() : ''}
        //         />
        //     ) : (
        //         text
        //     ),
    });


    /** COLUMNS TABLE AND TABLE DATA ***/
    const columnsProducts = [
        {
            title: 'Mã SP',
            dataIndex: 'id',
            className: 'all-products-id',
            sorter: (a, b) => a.id.localeCompare(b.id),
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Tên SP',
            dataIndex: 'name',
            className: 'all-products-name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Giá SP',
            dataIndex: 'price',
            className: 'all-products-price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: 'Tất Cả',
                    value: 'all',
                },
                {
                    text: '< 30.000 VNĐ',
                    value: '< 30.000',
                },
                {
                    text: '>= 30.000VNĐ',
                    value: '>= 30.000',
                },
            ],
            onFilter: (value, record) => {
                if (value === 'all') {
                    return record.price;
                } else if (value === '< 30.000') {
                    return record.price < 30000;
                } else if (value === '>= 30.000') {
                    return record.price >= 30000;
                }
            },
        },
        {
            title: 'Loại SP',
            dataIndex: 'type',
            className: 'all-products-type',
            filters: [
                {
                    text: 'Tất Cả',
                    value: 'all',
                },
                {
                    text: 'Hamburger',
                    value: 'Hamburger',
                },
                {
                    text: 'Pizza',
                    value: 'Pizza',
                },
                {
                    text: 'Fried Chicken',
                    value: 'Fried Chicken',
                },
            ],
            onFilter: (value, record) => {
                if (value === 'all') {
                    return record.type;
                } else {
                    return record.type === value;
                }
            },
        },
        {
            title: 'Số Lượng',
            dataIndex: 'countInStock',
            className: 'all-products-count-in-stock',
            sorter: (a, b) => a.countInStock - b.countInStock,
            filters: [
                {
                    text: 'Tất Cả',
                    value: 'all',
                },
                {
                    text: '< 20',
                    value: '< 20',
                },
                {
                    text: '>= 20',
                    value: '>= 20',
                },
                {
                    text: 'Hết Hàng',
                    value: '= 0',
                },
            ],
            onFilter: (value, record) => {
                if (value === 'all') {
                    return record.countInStock;
                } else if (value === '< 20') {
                    return record.countInStock < 20;
                } else if (value === '>= 20') {
                    return record.countInStock >= 20;
                } else if (value === '= 0') {
                    return record.countInStock == 0;
                }
            },
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
            render: (isActive) => {
                return renderTableActive(isActive);
            },
            filters: [
                {
                    text: 'Tất Cả',
                    value: 'all',
                },
                {
                    text: 'Hiện',
                    value: 'show',
                },
                {
                    text: 'Ẩn',
                    value: 'hide',
                },
            ],
            onFilter: (value, record) => {
                if (value === 'all') {
                    return record.active == true || record.active == false;
                } else if (value === 'show') {
                    return record.active == true;
                    
                } else if (value === 'hide') {
                    return record.active == false;
                } 
            },
        }
    ];
    const dataProductsTable = allProducts?.data?.length && allProducts?.data?.map((product) => {
        return {
            ...product,
            key: product.id
        }
    });


    /*** CREATE PRODUCT ***/
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

    // use effect
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


    /*** UPDATE PRODUCT ***/
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

    // get update product details and fill into the update product modal
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


    /*** ACTIVE PRODUCT ***/
    // mutation 
    const mutationActiveProduct = useMutationHooks(
        ({ id, accessToken, updatedData } = data) =>
            ProductService.updateProduct(id, updatedData, accessToken)
    );
    const { data: dataActive, isLoading: isLoadingActive, isSuccess: isSuccessActive, isError: isErrorActive } = mutationActiveProduct;

    // use effect selected row on table
    useEffect(() => {
        if (selectedActiveRow) {
            getUpdateProductDetails(selectedActiveRow);
        }
    }, [selectedRow]);

    // use effect
    useEffect(() => {
        if (isSuccessActive && dataActive?.status === "OK") {
            MessagePopup.success();
            getAllProducts();
        } else if (dataActive?.status === "ERR") {
            MessagePopup.error();
        }
    }, [isSuccessActive, isErrorActive]);

    // handle active product switches
    const handleOnChangeActiveProductState = (value) => {
        // setIsLoadingActiveProduct(true);
        setActiveProductState({
            ...activeProductState,
            ['active']: value
        });
    }
    const handleActiveProductConfirm = () => {
        mutationActiveProduct.mutate(
            {
                id: selectedActiveRow,
                accessToken: user?.accessToken,
                updatedData: activeProductState
            },
            {
                onSettled: () => {
                    queryAllProducts.refetch();
                }
            }
        );
        // setIsLoadingActiveProduct(false);
    }
    const handleActiveProductCancel = () => {
        // setIsLoadingActiveProduct(false);
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
                                onClick: (event) => {
                                    // - event.target.parentElement.className 
                                    // contains class name of parent of the svg (ant-design icon which is rendered in dataProductsTable)
                                    // - only pressing the update button on every row can set setSelectedRow
                                    if (event.target.tagName === 'svg') {   // if click on svg tag (children of class 'all-products-update')
                                        if (event.target.parentElement.className.includes("all-products-update")) {
                                            setSelectedRow(record?._id)
                                        }
                                    } else if (event.target.tagName === 'path') {   // if click on path tag (children of svg tag)
                                        if (event.target.parentElement.parentElement.className.includes("all-products-update")) {
                                            setSelectedRow(record?._id)
                                        }
                                    }
                                    // - same with setSelectedActiveRow
                                    // if click on switch span (children of class 'all-products-active')
                                    else if (event.target.parentElement.className.includes("all-products-active")) {
                                        setSelectedActiveRow(record?._id)
                                    }
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