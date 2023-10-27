import { Card, Col, Collapse } from "antd";
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

export const MyOrdersCard = styled(Card)`
    box-shadow: 0px 0px 3px 2px #cacaca8a;
    margin-bottom: 30px;
`

export const SidebarMenuWrapper = styled(Col)`
    padding-right: 35px;

    .user-avatar-info {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
`

export const CardWrapper = styled(Card)`
    box-shadow: 0px 0px 3px 2px #cacaca8a;
`