import { Badge, Card, Select } from "antd";
import { styled } from "styled-components";

export const InputNumberCustom = styled.div`
    position: relative; 
    font-size: 16px; 
    line-height: 1.5; 
    display: inline-flex; 
    align-items: center;

    .minus-input-number {
        position: absolute; 
        font-size: 18px; 
        z-index: 1;
        left: 10px;
    }

    .plus-input-number {
        position: absolute; 
        font-size: 18px; 
        z-index: 1;
        right: 10px;
    }

    .ant-input-number-handler-wrap {
        display: none;
    }

    .ant-input-number-input-wrap {
        display: flex;
        align-items: center;
        height: 100%;
        text-align: center;
    }

    .ant-input-number-input {
        text-align: center;
    }

    .input-number-area {
        height: 38px;
        width: 100px;
        border: 1px solid #9a9a9a;
        font-size: 18px;
    }
`

export const InputSelectCustom = styled(Select)`
    .ant-select-selector {
        height: 40px!important;
        padding-top: 5px!important;
        padding-bottom: 5px!important;
        border: 1px solid #9a9a9a!important;
    }
    .ant-select-arrow {
        padding-top: 10px;
    }
`

export const ScrollBarCustom = styled.div`
    overflow-y: auto;
    max-height: 460px;
    padding: 0px 20px;

    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #F5F5F5;
    }

    &::-webkit-scrollbar {
        width: 8px;
        background-color: #F5F5F5;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #888888ab;
    }
`

export const BadgeCheckedPaymentMethod = styled(Badge)`
    .ant-scroll-number.ant-badge-count {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        padding-top: 2%;
    }
`
export const CardPaymentMethod = styled(Card)`
    &.checked {
        background-color: #a5e7ff57;
        border: 2px solid #70d1ff;
    }
`
