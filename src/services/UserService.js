import axios from "axios";

export const signinUser = async (data) => {
    console.log('data', data)
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/signin`);
    return res.data;
}