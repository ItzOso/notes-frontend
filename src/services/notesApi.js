import api from "./axios";

export const getNotesAndCategoriesApi = async (userId, header) => {
    const headers = { Authorization: header };
    return await api.get(`/categories/notes/${userId}`, { headers });
};

export const createCategoryApi = async (payload, header) => {
    // payload = {name, userId}
    const headers = { Authorization: header };
    return await api.post("/categories", payload, { headers });
};

export const changeCategoryNameApi = async (payload, categoryId, header) => {
    // payload = {name}
    const headers = { Authorization: header };
    return await api.put(`/categories/${categoryId}`, payload, { headers });
};

export const deleteCategoryApi = async (categoryId, header) => {
    const headers = { Authorization: header };
    return await api.delete(`/categories/${categoryId}`, { headers });
};
export const createNoteApi = async (payload, header) => {
    // payload = {title, content, categoryId, userId}
    const headers = { Authorization: header };
    return await api.post("/notes", payload, { headers });
};
export const updateNoteApi = async (payload, noteId, header) => {
    // payload = {?title, ?content, ?categoryId, ?isTrashed}
    const headers = { Authorization: header };
    return await api.put(`/notes/${noteId}`, payload, { headers });
};
// export const moveNoteApi = async () => {};
export const deleteNoteApi = async (noteId, header) => {
    const headers = { Authorization: header };
    return await api.delete(`/notes/${noteId}/permtrash`, { headers });
};
