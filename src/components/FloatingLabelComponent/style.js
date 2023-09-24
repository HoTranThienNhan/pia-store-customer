import { styled } from "styled-components";

export const FloatLabelDiv = styled.div`
    .float-label {
        position: relative;
        margin-bottom: 12px;
    }
  
    .label {
        font-size: 14px;
        font-weight: lighter;
        position: absolute;
        pointer-events: none;
        z-index: 10;
        // left: 37px;
        // top: 31px;
        color: #c4c4c4;
        transition: 0.2s ease all;
    }
  
    .label-float {
        font-weight: normal;
        // top: 23px;
        // left: 37px;
        color: #a4a4a4;
        font-size: 10px;
    }
`

