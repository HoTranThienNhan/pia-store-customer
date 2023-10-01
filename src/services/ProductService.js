import axios from "axios";

export const axiosJWT = axios.create();

export const getAllProducts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAllProducts`);
    return res.data;
}

export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/createProduct`, data);
    return res.data;
}

export const getProductDetails = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getProductDetails/${id}`);
    return res.data;
}

export const updateProduct = async (id, data, accessToken) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/updateProduct/${id}`, data, {
        headers: {
            token: `Bearer ${accessToken}`
        }
    });
    return res.data;
}

export const updateActiveMultipleProducts = async (data, accessToken) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/updateActiveMultipleProducts`, data, {
        headers: {
            token: `Bearer ${accessToken}`
        }
    });
    return res.data;
}