import { MODAL_STATE } from "~/utils/data/constants";

export const state = () => ({
    modalState: MODAL_STATE.HIDDEN,
    selected: null
})
export const actions = {
    async hideModal({ commit }) {
        commit('updateModalState', MODAL_STATE.HIDDEN)
    },
    async showMoal({ commit }, selection) {
        if (selection) {
            // Editing an existing selection
            commit('updateSelection', selection.id);
            commit('updateModalState', MODAL_STATE.SHOWN_UPDATE);
        } else {
            // Adding a new selection
            commit('updateSelection', null);
            commit('updateModalState', MODAL_STATE.SHOWN_CREATE);
        }
    },
}
export const mutation = {
    updateSelection: (state, selection) => state.selection = selection,
    updateModalState: (state, modalState) => state.modalState = modalState
}