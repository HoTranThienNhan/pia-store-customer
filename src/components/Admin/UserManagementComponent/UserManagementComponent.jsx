import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import React from 'react';
import TableComponent from '../../TableComponent/TableComponent';
import { WrapperUserManagement } from './style';

const UserManagementComponent = () => {
    return (
        <WrapperUserManagement>
            <div>
                <h2 style={{ fontWeight: 'bold' }}>Quản Lý Người Dùng</h2>
                <Breadcrumb
                    items={[
                        {
                            title: <a href="/">Home</a>,
                        },
                        {
                            title: 'Quản lý người dùng',
                        },
                    ]}
                />
            </div>
            <div style={{ padding: '30px 0px' }}>
                <div className='add-new-user'>
                    <Button className='add-new-user-button'>
                        <PlusOutlined />
                    </Button>
                </div>
                <div className='all-users all-users-area'> 
                    <div className='all-users-title'>Tất Cả Người Dùng</div>
                    <TableComponent />
                </div>
            </div>
        </WrapperUserManagement>
    )
};

export default UserManagementComponent;
