import { Collapse } from "antd";
import { styled } from "styled-components";

export const CollapseWrapper = styled(Collapse)`
    .ant-collapse-header-text {
        user-select: none;
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