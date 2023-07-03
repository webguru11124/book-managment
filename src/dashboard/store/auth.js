import { Api } from "~/api";
import { apiSearch, getUserInfoUrl } from "~/api/cloud.axios";
import { getStoreItem, setStoreItem } from "~/services/localstorage.service";

export const SET_AUTH = "SET_AUTH";
export const REMOVE_AUTH = "REMOVE_AUTH";

export function state() {
    return {
        auth: getStoreItem("auth") ?? null,
    };
}

export const getters = {
    auth: (state) => {
        return state.auth;
    },
    getJWT: (state) => {
        return state.auth?.jwt;
    },
};

export const actions = {
    setAuth: function ({ commit }, payload) {
        commit(SET_AUTH, payload);
    },
    removeAuth: function ({ commit }, payload) {
        commit(REMOVE_AUTH, payload);
    },

    getUserInfo: function ({ commit, state }, payload) {
        Api.post(`${apiSearch}${getUserInfoUrl}`).then(({ data }) => {
            const { first_name, last_name, email } = data.message;
            const authData = { ...state.auth, first_name, last_name, email };
            commit(SET_AUTH, authData);
        });
    },
};

export const mutations = {
    [SET_AUTH](state, payload) {
        state.auth = payload;
        setStoreItem("auth", state.auth);
    },
    [REMOVE_AUTH](state) {
        state.auth = null;
        setStoreItem("auth", null);
    },
};
