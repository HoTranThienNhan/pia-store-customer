import axios from "axios";

export const axiosJWT = axios.create();

export const getProvinces = async () => {
    // const res = await axios.get(`https://provinces.open-api.vn/api/p/?depth=1`);     
    const res = await axios.get(`https://vietnam-administrative-division-json-server-swart.vercel.app/province`);
    return res.data;
}

export const getDistricts = async (provinceCode) => {
    // const res = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
    const res = await axios.get(`https://vietnam-administrative-division-json-server-swart.vercel.app/district/?idProvince=${provinceCode}`);
    return res.data;
}

export const getWards = async (districtCode) => {
    // const res = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
    const res = await axios.get(`https://vietnam-administrative-division-json-server-swart.vercel.app/commune/?idDistrict=${districtCode}`);
    return res.data;
}