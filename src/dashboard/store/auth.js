
import { getStoreItem, setStoreItem } from "~/services/localstorage.service";

import Api, { apiSearch, loginUrl } from "~/api";
import { LOCALSTORAGE_KEYS } from "~/utils/data/constants";
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
    loginAction: ({ commit }, credentials) => {
        const { username, password } = credentials;
        const res = Api.post(`${apiSearch}${loginUrl}`, { username, password });

        res.then(({ data }) => {
            commit(SET_AUTH, { ...data.message, username });

        })
            .catch((error) => {
                console.log(error);
            })
        return res;
    },
    setAuth: function ({ commit }, payload) {
        commit(SET_AUTH, payload);
    },
    removeAuth: function ({ commit }, payload) {
        commit(REMOVE_AUTH, payload);
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
