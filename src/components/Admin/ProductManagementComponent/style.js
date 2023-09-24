import { styled } from "styled-components";

export const WrapperProductManagement = styled.div`
    padding: 20px 40px;
    height: 1500px;
    background-color: #d4e3fa5e;

    .add-new-product .add-new-product-button {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        border-style: dashed;
    }

    .add-new-product .add-new-product-button .anticon.anticon-plus {
        font-size: 30px;
    }

    .all-products.all-products-area {
        box-shadow: 0px 0px 4px 3px #cacaca8a;
        margin-top: 30px;
        padding: 30px 25px;
        background-color: #fff;
        border-radius: 10px;
    }

    .all-products.all-products-area .all-products-title {
        padding-bottom: 20px;
        font-size: 17px;
        font-weight: bold;
    }
`

export const WrapperUploadProductImage = styled.div`
    .ant-upload-list.ant-upload-list-text {
        display: none;
    }

    img.uploaded-product-image {
        border-radius: 50%;
        height: 90px;
        width: 90px;
        object-fit: cover;
        margin: 20px;
    }

    .uploaded-default-image {
        height: 90px;
        margin: 20px;
    }

    .product-image-remove-button {
        width: 98px;
        margin-left: 15px;
    }
`