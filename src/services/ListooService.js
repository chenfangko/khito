import axios from 'axios'
import { url } from './Const'

const apiClient = axios.create({
    baseURL: url.baseUrl,

    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 2000
})
export default apiClient

export const commonService = {
    GetRecommandLists({ filter }) {
        return apiClient.post(`/common/get_recommand_lists/`, JSON.stringify({ filter }))
    },
    GetHotTags({ count, page }) {
        return apiClient.get(`/common/get_hot_tags/?count=${count}&page=${page}`)
    },
    GetListDetail({ list_id, filter }) {
        return apiClient.post(`/common/get_list_detail/`, JSON.stringify({ list_id, filter }))
    }
}
export const authService = {
    Register({ email, username, password }) {
        return apiClient.post('/auth/register/', JSON.stringify({ email, username, password }))
    },
    Login({ email, password }) {
        return apiClient.post(`/auth/login/`, JSON.stringify({ email, password }))
    },
    Logout() {
        return apiClient.post(`/auth/logout/`)
    },
}
export const userService = {
    GetUserPlaces({ filter }) {
        return apiClient.post(`/user/get_user_places`, JSON.stringify({ filter }))
    },
    GetUserLists({ filter }) {
        return apiClient.post(`/user/get_user_lists/`, JSON.stringify({ filter }))
    },
    GetListInfo({ list_id }) {
        return apiClient.post(`/user/get_list_info/`, JSON.stringify({ list_id }))
    },
    CreateList({ name, description, privacy, places, editors_email }) {
        return apiClient.post(`/user/create_list/`, JSON.stringify({ name, description, privacy, places, editors_email }))
    },
    SetListCover({ list_id, cover_image_url }) {
        return apiClient.post(`/user/set_list_cover/`, JSON.stringify({ list_id, cover_image_url }))
    },
    SearchUserPlaces({ list_id, text }) {
        return apiClient.post(`/user/search_user_places`, JSON.stringify({ list_id, text }))
    },
    AddListPlaces({ list_id, places }) {
        return apiClient.post(`/user/add_list_places/`, JSON.stringify({ list_id, places }))
    },
    RemoveListPlaces({ list_id, places }) {
        return apiClient.post(`/user/remove_list_places/`, JSON.stringify({ list_id, places }))
    },
    EditList({ list_id, name, description, privacy, editors_email }) {
        return apiClient.post(`/user/edit_list/`, JSON.stringify({ list_id, name, description, privacy, editors_email }))
    },
    ModifyPlaceTag({ place_id, add, remove, newTags }) {
        return apiClient.post(`/user/modify_place_tag/`, JSON.stringify({ place_id, add, remove, newTags }))
    },
    SearchTag({ place_id, text }) {
        return apiClient.post(`/user/search_tag/`, JSON.stringify({ place_id, text }))
    },
    GetPlaceTags({ place_id }) {
        return apiClient.post(`/user/get_place_tags/`, JSON.stringify({ place_id }))
    },
    SendTagEvent({ tag_id, action }) {
        return apiClient.post(`/user/send_tag_event/`, JSON.stringify({ tag_id, action }))
    },
    AddNewPlace(placeDetail) {
        return apiClient.post(`/user/add_new_place/`, JSON.stringify(placeDetail))
    }
}

export const mapService = {
    GetMarks({ from, to, filter }) {
        return apiClient.post(`/map/get_marks/`, JSON.stringify({ from, to, filter }))
    },
    GetPlaceInfo({ place_id }) {
        return apiClient.post(`/map/get_place_info/`, JSON.stringify({ place_id }))
    },
}

