import { styled } from "styled-components";

export const WrapperUserManagement = styled.div`
    padding: 20px 40px;
    height: 1500px;
    background-color: #d4e3fa5e;

    .add-new-user .add-new-user-button {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        border-style: dashed;
    }

    .add-new-user .add-new-user-button .anticon.anticon-plus {
        font-size: 30px;
    }

    .all-users.all-users-area {
        box-shadow: 0px 0px 4px 3px #cacaca8a;
        margin-top: 30px;
        padding: 30px 25px;
        background-color: #fff;
        border-radius: 10px;
    }

    .all-users.all-users-area .all-users-title {
        padding-bottom: 20px;
        font-size: 17px;
        font-weight: bold;
    }
`