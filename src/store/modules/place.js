import { mapService, userService } from '@/services/ListooService.js'

export const namespaced = true

export const state = {
    placeInfo: {
        place_id: "string",
        name: "string",
        phone: "string",
        address: "string",
        type: "string",
        photo_url: "string"
    },
    king_tags: [],
    my_tags: null,
    place_tags: null,
    all_tags: null
}

export const mutations = {
    SET_PLACEINFO(state, data) {
        state.placeInfo = data
    },
    SET_KING_TAG(state, king_tags) {
        state.king_tags = king_tags
    },
    CLEAR_KING_TAG(state) {
        state.king_tags = []
    },
    ADD_KING_TAG(state, king_tags) {
        state.king_tags.push(king_tags)
    },
    DELETE_KING_TAG(state, tag) {
        state.king_tags = state.king_tags.filter(king_tag => king_tag.id != tag.id)
    },
    SET_MY_TAGS(state, my_tags) {
        state.my_tags = my_tags
    },
    ADD_MY_TAG(state, my_tags) {
        state.my_tags.push(my_tags)
    },
    DELETE_MY_TAG(state, index) {
        state.my_tags.splice(index, 1);
    },
    SET_PLACE_TAGS(state, place_tags) {
        state.place_tags = place_tags
    },
    DELETE_PLACE_TAG(state, index) {
        state.place_tags.splice(index, 1);
    },
    ADD_PLACE_TAG(state, place_tags) {
        state.place_tags.push(place_tags)
    },
    SET_ALL_TAGS(state, all_tags) {
        state.all_tags = all_tags
    },
    CLEAR_ON_CLOSE(state) {
        state.king_tags = [];
        state.my_tags = null;
        state.place_tags = null;
        state.all_tags = null;
    }
}

export const actions = {
    getDialogDetail({ commit }, { place_id }) {
        const placeInfo = mapService.GetPlaceInfo({ place_id }).then((response) => {
            commit('SET_PLACEINFO', Object.assign({}, response.data.data, { place_id }))
        })
        const placeTags = userService.GetPlaceTags({ place_id }).then(response => {
            const king_tags = response.data.data.my_tags.filter(tag => tag.type == 1)
            const my_tags = response.data.data.my_tags.filter(tag => tag.type == 2)
            const place_tags = response.data.data.place_tags.filter(tag => !response.data.data.my_tags.map(tag => tag.id).includes(tag.id))
            commit('SET_MY_TAGS', my_tags)
            commit('SET_PLACE_TAGS', place_tags)
            commit('SET_KING_TAG', king_tags)
            commit('SET_ALL_TAGS', response.data.data)
        })
        return Promise.all([placeInfo, placeTags])
    },
    modifyPlaceTag({ state }) {
        // const place_id = state.placeInfo.place_id
        const all_tags_id = state.all_tags.my_tags.map(tag => tag.id)
        const select_tags = state.king_tags.concat(state.my_tags)
        const select_tags_id = state.king_tags.concat(state.my_tags).map(tag => tag.id)

        const place_id = state.placeInfo.place_id
        let add = select_tags.filter(tag => !all_tags_id.includes(tag.id)).map(tag => tag.id);
        const remove = state.all_tags.my_tags.filter(tag => !select_tags_id.includes(tag.id)).map(tag => tag.id);
        const newTags = state.my_tags.filter(tag => tag.id == -1).map(tag => tag.name)

        userService.ModifyPlaceTag({ place_id, add, remove, newTags })
    },
    addNewPlace(context, placeDetail) {
        return userService.AddNewPlace(placeDetail)
    }

}

export const getters = {


    GetterKingTag(state) {
        const base = [
            {
                id: 101,
                type: 1,
                name: "想去",
            },
            {
                id: 102,
                type: 1,
                name: "喜歡",
            },
            {
                id: 103,
                type: 1,
                name: "暫存",
            },
        ]

        const result = base.map(base_tag => {
            let isActive = false
            if (state.king_tags) {
                isActive = state.king_tags.some(king_tag => king_tag.id == base_tag.id) ? true : false
            }
            return { id: base_tag.id, type: base_tag.type, name: base_tag.name, isActive }

        })

        return result
    }
}
