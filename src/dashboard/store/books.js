import Api, { apiSearch } from "~/api";
// Define mutation types
export const SET_BOOKS = "SET_BOOKS";
export const ADD_BOOK = "ADD_BOOK";
export const EDIT_BOOK = "EDIT_BOOK";
export const REMOVE_BOOK = "REMOVE_BOOK";

export const state = () => ({
    books: [],
});

export const getters = {
    books: (state) => state.books,
};

export const actions = {
    async fetchBooks({ commit }) {
        try {
            const response = await Api.get(`${apiSearch}/books`); // Replace with your API endpoint for fetching books
            commit(SET_BOOKS, response.data);
        } catch (error) {
            console.error(error);
        }
    },
    async addBook({ commit }, book) {
        try {
            const response = await Api.post(`${apiSearch}/users/${book.owner_id}/books`, book); // Replace with your API endpoint for adding a book
            commit(ADD_BOOK, response.data);
        } catch (error) {
            console.error(error);
        }
    },
    async editBook({ commit }, book) {
        try {
            const response = await Api.put(`${apiSearch}/books/${book.id}`, book); // Replace with your API endpoint for editing a book
            commit(EDIT_BOOK, response.data);
        } catch (error) {
            console.error(error);
        }
    },
    async deleteBook({ commit }, bookId) {
        try {
            await Api.delete(`${apiSearch}/books/${bookId}`); // Replace with your API endpoint for deleting a book
            commit(REMOVE_BOOK, bookId);
        } catch (error) {
            console.error(error);
        }
    },
};

export const mutations = {
    [SET_BOOKS](state, books) { state.books = books },
    [ADD_BOOK](state, book) { state.books.push(book) },
    [EDIT_BOOK](state, updatedBook) {
        const index = state.books.findIndex((book) => book.id === updatedBook.id);
        if (index !== -1) {
            state.books.splice(index, 1, updatedBook);
        }
    },
    [REMOVE_BOOK](state, bookId) {
        state.books = state.books.filter((book) => book.id !== bookId);
    },
};
