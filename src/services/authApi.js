import api from "./axios";

export const signup = async (credentials) => {
    return await api.post("/signup", credentials);
};

export const login = async (credentials) => {
    return await api.post("/login", credentials);
};
