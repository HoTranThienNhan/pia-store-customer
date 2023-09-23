import axios from "axios";

export const getAllProducts = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAllProducts`);
    return res.data;
}