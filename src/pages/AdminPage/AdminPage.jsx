import { Col, Menu, Row } from 'antd';
import React, { useState } from 'react';
import { getItem } from '../../utils';
import { ShopOutlined, TeamOutlined } from '@ant-design/icons';
import { WrapperAdminMenuSidebar } from './style';
import UserManagementComponent from '../../components/Admin/UserManagementComponent/UserManagementComponent';
import ProductManagementComponent from '../../components/Admin/ProductManagementComponent/ProductManagementComponent';

const AdminPage = () => {
    const items = [
        getItem('Sản Phẩm', 'products', <ShopOutlined />),
        getItem('Người Dùng', 'users', <TeamOutlined />)
    ];

    const [selectedKey, setSelectedKey] = useState('products');
    const renderPage = (key) => {
        switch (key) {
            case 'products':
                return (<ProductManagementComponent />);
            case 'users':
                return (<UserManagementComponent />);
            default:
                return (<></>);
        }
    }

    const handleOnClick = ({ key }) => {
        // selectedKey from items
        setSelectedKey(key);
    }

    return (
        <div id="container" style={{ height: '100%', backgroundColor: '#d4e3fa5e' }}>
            <Row>
                <Col span={4}>
                    <WrapperAdminMenuSidebar
                        mode="inline"
                        items={items}
                        onClick={handleOnClick}
                        defaultSelectedKeys={'products'}
                    />
                </Col>
                <Col span={20}>
                    {renderPage(selectedKey)}
                </Col>
            </Row>
        </div>
    )
};

export default AdminPage;
