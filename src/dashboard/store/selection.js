import { MODAL_STATE } from "~/utils/data/constants";

export const UPDATE_SELECTION = "UPDATE_SELECTION";
export const UPDATE_MODALSTATE = "UPDATE_MODALSTATE";

export const state = () => ({
    modalState: MODAL_STATE.HIDDEN,
    selected: null
})

export const getters = {
    modalState: (state) => state.books,
    selected: (state) => state.selected,
    isShown: (state) => state.modalState !== MODAL_STATE.HIDDEN,
};



export const actions = {
    async hideModal({ commit }) {
        commit(UPDATE_MODALSTATE, MODAL_STATE.HIDDEN)
    },
    async showModal({ commit }, selection) {
        if (selection) {
            // Editing an existing selection
            commit(UPDATE_SELECTION, selection.id);
            commit(UPDATE_MODALSTATE, MODAL_STATE.SHOWN_UPDATE);
        } else {
            // Adding a new selection
            commit(UPDATE_SELECTION, null);
            commit(UPDATE_MODALSTATE, MODAL_STATE.SHOWN_CREATE);
        }
    }
}
export const mutations = {
    [UPDATE_SELECTION](state, selection) { state.selected = selection },
    [UPDATE_MODALSTATE](state, modalState) {
        state.modalState = modalState
    }
}