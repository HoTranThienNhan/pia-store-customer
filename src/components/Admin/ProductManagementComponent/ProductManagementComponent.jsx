import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import React from 'react';
import TableComponent from '../../TableComponent/TableComponent';
import { WrapperProductManagement } from './style';

const ProductManagementComponent = () => {
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
                    <Button className='add-new-product-button'>
                        <PlusOutlined />
                    </Button>
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
