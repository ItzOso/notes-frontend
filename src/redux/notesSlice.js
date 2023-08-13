import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    notes: [],
};

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        getNotesAndCategories: (state, action) => {
            const { categories, notes } = action.payload;
            state.categories = categories;
            state.notes = notes;
        },
        createCategory: (state, action) => {
            state.categories.push(action.payload);
        },
        changeCategoryName: (state, action) => {
            const { name, categoryId } = action.payload;
            const index = state.categories.findIndex((category) => category._id === categoryId);

            state.categories[index].name = name;
        },
        deleteCategory: (state, action) => {
            const { categoryId } = action.payload;
            state.categories = state.categories.filter((category) => category._id !== categoryId);
        },
        createNote: (state, action) => {
            state.notes.push(action.payload);
        },
        updateNote: (state, action) => {
            // action.payload = {updatedNote, noteId}
            const { noteId } = action.payload;
            const index = state.notes.findIndex((note) => note._id === noteId);
            state.notes[index] = action.payload.updatedNote;
        },
        // moveNote: (state, action) => {
        //     const {isTrashed, noteId} = action.payload
        //     const index = state.notes.findIndex(note => note._id === noteId)
        //     state.notes[index].isTrashed = isTrashed
        // },
        deleteNote: (state, action) => {
            const { noteId } = action.payload;
            state.notes = state.notes.filter((note) => note._id !== noteId);
        },
    },
});

export const { getNotesAndCategories, createCategory,changeCategoryName, deleteCategory, createNote, updateNote, moveNote, deleteNote } =
    notesSlice.actions;

export default notesSlice.reducer;
