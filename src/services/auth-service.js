import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/users`;
const api = axios.create({ withCredentials: true });

export const login = async ({ username, password }) => {
    // try{
    //     const response = await api.post(`${USERS_URL}/login`, { username, password });
    //     return response.data;
    // } catch (error) {
    //     throw error;
    // }
    const response = await api.post(`${USERS_URL}/login`, { username, password });
    return response.data;
};
export const logout = async () => { 
    const response = await api.post(`${USERS_URL}/logout`);
    return response.data;
};
export const profile = async () => {
    try{
        const response = await api.get(`${USERS_URL}/profile`);
        console.log("profile service: ", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const profileOther = async (userId) => {
    try {
        const response = await api.get(`${USERS_URL}/profile/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (user) => {
    const response = await api.put(`${USERS_URL}`, user); // ${user._id}
    return response.data;
};
export const register = async ({ username, password, email, avatarUrl }) => {
    try{
        console.log(`${USERS_URL}/register`);
        const response = await api.post(`${USERS_URL}/register`, { username, password, email, avatarUrl });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message);
    }  
};