import { userService } from "@/services/ListooService.js"
import { imageService } from "@/services/ImageService.js"


export const namespaced = true


export const state = {
    userLists: null,
    userPlaces: null,
    listInfo: null,
    photoUrl: null,
    isActive: false,
}
export const mutations = {
    SET_USERLISTS(state, userLists) {
        state.userLists = userLists;
    },
    ADD_LIST_TO_USERLISTS(state, newList) {
        state.userLists.lists.push(newList)
    },
    ADD_PLACES_TO_LIST(state, { list_id, places }) {
        state.userLists.find(userList => userList.list_id == list_id).places.push(places)
    },
    SET_USERPLACES(state, userPlaces) {
        state.userPlaces = userPlaces
    },
    SET_LISTINFO(state, data) {
        state.listInfo = data
    },
    SET_PHOTOURL(state, photoUrl) {
        state.photoUrl = photoUrl
        if (state.photoUrl) state.isActive = true;
        else state.isActive = false
    },
    REMOVE_PHOTOURL(state) {
        state.photoUrl = null
    },
    DISACTIVE(state) {
        state.isActive = false
    },

}

export const actions = {
    getUserLists({ commit }, { filter }) {
        userService.GetUserLists({ filter }).then(response => {
            commit('SET_USERLISTS', response.data.data)
            commit('common/SET_HOT_TAGS', { user_tags: response.data.data.user_tags, system_tags: response.data.data.system_tags }, { root: true })
        })
    },
    getUserPlaces({ commit }, body) {
        userService.GetUserPlaces(body).then(response => {
            commit('SET_USERPLACES', response.data.data)
            commit('common/SET_HOT_TAGS', { user_tags: response.data.data.user_tags, system_tags: response.data.data.system_tags }, { root: true })
        })
    },
    removeListPlaces(context, { list_id, places }) {
        return userService.RemoveListPlaces({ list_id, places })
    },
    createList({ commit }, list) {
        userService.CreateList(list).then(() => commit('ADD_LIST_TO_USERLISTS', list))
    },
    getListInfo({ commit }, { list_id }) {
        return userService.GetListInfo({ list_id }).then(response => commit('SET_LISTINFO', response.data.data))
    },
    // eslint-disable-next-line no-unused-vars
    editList({ commit }, { list_id, name, description, privacy, editors_email }) {
        userService.EditList({ list_id, name, description, privacy, editors_email })
    },
    modifyPlaceTag(context, { place_id, add, remove, newTags }) {
        return userService.ModifyPlaceTag({ place_id, add, remove, newTags })
    },
    // eslint-disable-next-line no-unused-vars
    searchTag({ commit }, { place_id, text }) {
        return userService.SearchTag({ place_id, text })
    },
    searchUserPlaces(context, { list_id, text }) {
        return userService.SearchUserPlaces({ list_id, text })
    },
    saveListPhoto({ commit }, data) {
        return imageService.SaveListPhoto(data).then(response => commit('SET_PHOTOURL', response.data.msg))
    },
    setListCover(context, { list_id, cover_image_url }) {
        return userService.SetListCover({ list_id, cover_image_url })
    },

    // 缺少GetlistTag API 
}