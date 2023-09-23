import React from 'react';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { NameProduct, PriceProduct } from './style';
import hamburger from '../../assets/images/hamburger.png'

const CardComponent = (props) => {
    const { countInStock, description, name, price, rating, type, sold, discount } = props;

    return (
        <Card
            hoverable
            style={{ width: 240, padding: '30px', borderColor: '#ccc' }}
            cover={<img alt="example" src={hamburger} />}
        >
            <NameProduct>{name}</NameProduct>
            <PriceProduct>{price} VNĐ</PriceProduct>
        </Card>
    )
};

export default CardComponent
