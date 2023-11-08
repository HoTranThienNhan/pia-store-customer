import React from 'react';
import { Card, Image, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import { CardWrapper, NameProduct, PriceProduct } from './style';
import { useNavigate } from "react-router-dom";

const CardComponent = (props) => {
    const { id, countInStock, description, name, price, rating, type, sold, discount, image } = props;

    const navigate = useNavigate();
    const handleNavigateProductDetails = (id) => {
        navigate(`/menu/products/${id}`);
    }

    return (
        <CardWrapper
            hoverable
            style={{
                
            }}
            className='card-item-product'
            onClick={() => handleNavigateProductDetails(id)}
        >
            <Row justify="center" style={{ height: '180px' }}>
                <Image className='card-item-product-image' src={image} preview={false} height={180} draggable={false} />
            </Row>
            <NameProduct style={{ marginTop: '20px' }}>{name}</NameProduct>
            <PriceProduct>{price?.toLocaleString()} VNĐ</PriceProduct>
        </CardWrapper>
    )
};

export default CardComponent
