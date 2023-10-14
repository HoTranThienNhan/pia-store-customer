import axios from "axios";

export const axiosJWT = axios.create();

export const createOrder = async (data, accessToken) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/createOrder`, data, {
        headers: {
            token: `Bearer ${accessToken}`
        }
    });
    return res.data;
}

export const getAllOrders = async (userId, accessToken) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/getAllOrders/${userId}`, {
        headers: {
            token: `Bearer ${accessToken}`
        }
    });
    return res.data;
}

