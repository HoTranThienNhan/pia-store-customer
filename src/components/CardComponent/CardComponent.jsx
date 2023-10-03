import React from 'react';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { NameProduct, PriceProduct } from './style';
import pizza from '../../assets/images/banh-mi-heo-quay.png';

const CardComponent = (props) => {
    const { countInStock, description, name, price, rating, type, sold, discount, image } = props;

    return (
        <Card
            hoverable
            style={{ width: 240, height: 320, padding: '30px 20px', borderColor: '#ccc' }}
            cover={<img alt="product" src={image} />}
        >
            <NameProduct>{name}</NameProduct>
            <PriceProduct>{price.toLocaleString()} VNĐ</PriceProduct>
        </Card>
    )
};

export default CardComponent
