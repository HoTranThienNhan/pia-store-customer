import React from 'react';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { NameProduct, PriceProduct } from './style';
import { useNavigate } from "react-router-dom";

const CardComponent = (props) => {
    const { id, countInStock, description, name, price, rating, type, sold, discount, image } = props;

    const navigate = useNavigate();
    const handleNavigateProductDetails = (id) => {
        navigate(`/menu/products/${id}`);
    }

    return (
        <Card
            hoverable
            style={{ width: 240, height: 320, padding: '30px 20px', borderColor: '#ccc' }}
            cover={<img alt="product" src={image} />}
            onClick={() => handleNavigateProductDetails(id)}
        >
            <NameProduct>{name}</NameProduct>
            <PriceProduct>{price.toLocaleString()} VNĐ</PriceProduct>
        </Card>
    )
};

export default CardComponent
