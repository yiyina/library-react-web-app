import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/users`;
const api = axios.create({ withCredentials: true });


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
export const login = async ({ username, password }) => {
    try{
        const response = await api.post(`${USERS_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
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
export const updateUser = async (user) => {
    const response = await api.put(`${USERS_URL}`, user);
    return response.data;
};
export const profileOther = async (userId) => {
    try {
        const response = await api.get(`${USERS_URL}/profile/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const addFollowToUser = async (userId, currentUser) => {
    const response = await api.post(`${USERS_URL}/follow/${userId}`, { currentUser: currentUser });
    return response.data;
}
export const getBookDetailsByProfile = async (bookId) => {
    const response = await api.get(`${SERVER_API_URL}/books/details/profile/${bookId}`);
    return response.data;
}
export const deleteBookComment = async (bookId, commentId, userId) => {
    const response = await api.delete(`${SERVER_API_URL}/books/${bookId}/comments/${commentId}`, {
        data: { userId: userId }
    });
    return response.data;
}
