import { hostUrl } from "../utils/urls";

export const fetchUserLogIn = async (loginInfo) => {
    const response = await fetch(`${hostUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
};

export const createUser = async (postBody) => {
    const response = await fetch(`http://localhost:3000/user/create`, {
        method: "POST",
        body: JSON.stringify(postBody),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const json = await response.json();
    return json
}

export const getListingsUser = async (userID) => {
    const response = await fetch(`http://localhost:3000/listing?page=1&limit=100&userId=${userID}`, {
        method: "GET"
    });

    const json = await response.json();
    return json
}