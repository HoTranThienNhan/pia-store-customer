import React from 'react';
import { Layout, Menu } from 'antd';
const {  Sider } = Layout;

const productType = ['Hamburger', 'Gà rán', 'Khoay tây chiên']

const item = productType.map((value, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        // icon: React.createElement(icon),
        label: value,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});

const SidebarComponent = () => {
    return (
        <div>
            <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '12px',
                paddingLeft: '24px'
            }}>
                Phân loại
            </div>
            <Sider width={200} >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{
                        height: '100%',
                        borderRight: 0,
                    }}
                    items={item}
                />
            </Sider>
        </div>
    )
};

export default SidebarComponent
