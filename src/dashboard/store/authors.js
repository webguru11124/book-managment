import Api, { apiSearch } from "~/api";

// Define mutation types
export const SET_AUTHORS = "SET_AUTHORS";
export const ADD_AUTHOR = "ADD_AUTHOR";
export const EDIT_AUTHOR = "EDIT_AUTHOR";

export const state = () => ({
    authors: [],
});

export const getters = {
    authors: (state) => state.authors,
};
export const actions = {
    async fetchAuthors({ commit }) {
        try {
            // Make API request to fetch authors
            const response = await Api.get(`${apiSearch}/authors`);
            commit(SET_AUTHORS, response.data);
        } catch (error) {
            console.error("Error fetching authors:", error);
        }
    },
    async addAuthor({ commit }, authorData) {
        try {
            // Make API request to add author
            const response = await Api.post(`${apiSearch}/authors`, { name: authorData.name });
            commit(ADD_AUTHOR, response.data);
        } catch (error) {
            console.error("Error adding author:", error);
        }
    },
    async editAuthor({ commit }, updatedAuthor) {
        try {
            // Make API request to edit author
            await Api.put(`${apiSearch}/authors/${updatedAuthor.id}`, { id: updatedAuthor.id, name: updatedAuthor.name });
            commit(EDIT_AUTHOR, updatedAuthor);
        } catch (error) {
            console.error("Error editing author:", error);
        }
    },
};

export const mutations = {
    [SET_AUTHORS](state, authors) {
        state.authors = authors;
    },
    [ADD_AUTHOR](state, author) {
        state.authors.push(author);
    },
    [EDIT_AUTHOR](state, updatedAuthor) {
        const index = state.authors.findIndex((author) => author.id === updatedAuthor.id);
        if (index !== -1) {
            state.authors.splice(index, 1, updatedAuthor);
        }
    },
};