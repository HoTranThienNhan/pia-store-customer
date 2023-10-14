export const isJsonString = (data) => {
    try {
        JSON.parse(data);
    } catch (error) {
        return false;
    }
    return true;
}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export const convertDateType = (date) => {
    try {
        // date default type as 2023-10-14T11:07:42.289Z
        // convert to 14-10-2023
        const year = date.substr(0, 4);
        const month = date.substr(5, 2);
        const day = date.substr(8, 2);
        const result = day + '-' + month + '-' + year;
        return result;
    } catch (e) {
        return null;
    }
}