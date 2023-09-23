import { Col, Menu, Row } from 'antd';
import React, { useState } from 'react';
import { getItem } from '../../utils';
import { ShopOutlined, TeamOutlined } from '@ant-design/icons';
import { WrapperAdminMenuSidebar } from './style';
import UserManagementComponent from '../../components/Admin/UserManagementComponent/UserManagementComponent';
import ProductManagementComponent from '../../components/Admin/ProductManagementComponent/ProductManagementComponent';

const AdminPage = () => {
    const items = [
        getItem('Người Dùng', 'users', <TeamOutlined />),
        getItem('Sản Phẩm', 'products', <ShopOutlined />)
    ];

    const [selectedKey, setSelectedKey] = useState('users');
    const renderPage = (key) => {
        switch (key) {
            case 'users':
                return (<UserManagementComponent />);
            case 'products':
                return (<ProductManagementComponent />);
            default:
                return (<></>);
        }
    }

    const handleOnClick = ({ key }) => {
        // selectedKey from items
        setSelectedKey(key);
    }

    return (
        <div id="container" style={{ height: '1500px', backgroundColor: '#d4e3fa5e' }}>
            <Row>
                <Col span={4}>
                    <WrapperAdminMenuSidebar
                        mode="inline"
                        items={items}
                        onClick={handleOnClick}
                        defaultSelectedKeys={'users'}
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
