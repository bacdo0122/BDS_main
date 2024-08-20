import axios from "axios";

import { hostUrl } from "../utils/urls";

export const HOME_API = axios.create({
    baseURL: `${hostUrl}`,
});

export const fetchAllHomes = (pageNumber, type) => {
    return fetch(`${hostUrl}/listing?page=${pageNumber}&limit=12&type_id=${type}`)
        .then((resp) => resp.json())
        .then((json) => {
            return json.data;
        });
};

export const fetchPaginatedHomes = (page, rowsPerPage) => {
    return fetch(`${hostUrl}/homes/${page}/${rowsPerPage}`)
        .then((resp) => resp.json())
        .then((json) => {
            return json;
        });
};

export const postHome = async (homeInfo, userId) => {
    const postBody = { ...homeInfo, owner_id: userId };
    try {
        const res = await HOME_API.post(`/home`, postBody);
        console.log(res);
        return { error: null, ...res };
    } catch (error) {
        console.log(error);
        return { error };
    }
};

export const fetchHomeDetails = async (homeId) => {
    const resp = await fetch(`${hostUrl}/listing/getOne?id=${homeId}`);
    return resp;
};

export const fetchUserDetails = async (accessToken) => {
    const resp = await fetch(`${hostUrl}/user`, {
        method: 'GET', // hoặc 'POST' tùy thuộc vào yêu cầu của API
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json' // nếu cần thiết, tùy thuộc vào API
        }
    });
    // Kiểm tra nếu yêu cầu thành công, sau đó chuyển đổi phản hồi thành JSON
    if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
    }

    const data = await resp.json();
    return data;
};
export const fetchProperty = async () => {
    const resp = await fetch(`${hostUrl}/listing?page=1&limit=1000`);
    return resp;
};
