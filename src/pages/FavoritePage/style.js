import { styled } from "styled-components";

export const WrapperMenuProducts = styled.div`
    margin-bottom: 30px;
    margin-left: 24px;
    font-weight: 600;
    user-select: none;

    .product-main-menu {
        margin-right: 40px;
        cursor: pointer;
        font-size: 17px;
    }

    .product-main-menu:hover {
        color: #ff222ec7;
    }

    .active {
        font-weight: 600;
        color: #ff222ec7;
    }
`