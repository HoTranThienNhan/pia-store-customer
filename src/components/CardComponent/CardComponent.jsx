import React from 'react';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { NameProduct, PriceProduct } from './style';
import hamburger from '../../assets/images/hamburger.png'

const CardComponent = (product) => {
    
    return (
        <Card
            hoverable
            style={{ width: 240, padding: '30px', borderColor: '#ccc' }}
            cover={<img alt="example" src={hamburger} />}
        >
            <NameProduct>Hamburger Bò</NameProduct>
            <PriceProduct>30.000 VNĐ</PriceProduct>
        </Card>
    )
};

export default CardComponent
