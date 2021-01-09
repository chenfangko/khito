import { commonService, userService } from '@/services/ListooService.js'

export const namespaced = true

export const state = {
    recommandLists: null,
    list: null,
    hotTags: {
        "system_tags": [],
        "user_tags": []
    }
}

export const mutations = {
    SET_RECOMMANDLIST(state, recommandLists) {
        state.recommandLists = recommandLists
    },
    SET_LISTDETAIL(state, list) {
        state.list = list
    },
    MODIFY_LISTDETAIL(state, placeId) {
        const index = state.list.places.map(place => place.id).indexOf(placeId);
        state.list.places.splice(index, 1);
    },
    ADD_PLACE_TO_LISTDETAIL(state, place) {
        state.list.places.unshift(place)
    },
    SET_HOT_TAGS(state, tags) {
        state.hotTags = tags
    },
    DELETE_HOT_TAGS(state, index) {
        state.hotTags.user_tags.splice(index, 1);
    },
    CLEAR_HOT_TAGS(state) {
        state.hotTags.system_tags = []
        state.hotTags.user_tags = []
    }
}


export const actions = {
    getRecommandLists({ commit }, { filter }) {
        commonService.GetRecommandLists({ filter }).then(response => {
            commit('SET_RECOMMANDLIST', response.data.data)
            commit('SET_HOT_TAGS', { user_tags: response.data.data.user_tags, system_tags: response.data.data.system_tags })
        })
    },
    getListDetail({ commit }, { list_id, filter }) {
        commonService.GetListDetail({ list_id, filter }).then(response => {
            commit('SET_LISTDETAIL', response.data.data)
            commit('SET_HOT_TAGS', {
                user_tags: response.data.data.user_tags, system_tags: response.data.data.system_tags
            })
        })
    },
    getHotTags({ commit }, { count, page }) {
        return commonService.GetHotTags({ count, page }).then((response) => {
            commit('SET_HOT_TAGS', response.data.data)
        });
    },
    addListPlaces({ commit }, { list_id, place }) {
        userService.AddListPlaces({ list_id, places: [place.id] }).then(() => commit('ADD_PLACE_TO_LISTDETAIL', place))
    },
}

export const getters = {
    user_tags(state, getters, rootState) {
        if (rootState.selectTags.length) {
            return state.hotTags.user_tags.filter(user_tag => !rootState.selectTags.some(selectTag => selectTag.id == user_tag.id))
        } else {
            return state.hotTags.user_tags
        }
    },
    system_tags(state, getters, rootState) {
        if (rootState.selectTags.length) {
            return state.hotTags.system_tags.filter(system_tag => !rootState.selectTags.some(selectTag => selectTag.id == system_tag.id))
        } else {
            return state.hotTags.system_tags
        }
    },

}
