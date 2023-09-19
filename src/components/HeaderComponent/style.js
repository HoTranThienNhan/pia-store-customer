import { Row } from "antd";
import { styled } from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 25px 70px;
    background-color: #ddd;
`

export const WrapperSearchHeader = styled.div`
    font-size: 20px;
    margin-right: 10px;
    display: flex;
    align-items: center;
`

export const WrapperAccountHeader = styled.div`
    font-size: 20px;
    margin-right: 10px;
    display: flex;
    align-items: center;
`

export const WrapperAuthDiv = styled.div`
    display: flex;

    .ant-spin-nested-loading{
        display: flex;
    }
    
    .ant-spin-container {
        display: flex;
    }
`

export const WrapperAuthHeader = styled.span`
    font-size: 13px;
    display: flex;
    align-items: center;
    margin-right: 20px;
`

export const WrapperSignoutPopover = styled.p`
    cursor: pointer;
    margin-bottom: 0px;
    padding-top: 10px;
    border-top: 1px solid #c2c2c2;
`




