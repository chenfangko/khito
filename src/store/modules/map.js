import { mapService } from '@/services/ListooService.js'

export const namespaced = true

export const state = {
    addMarksID: [],
    removeMarksID: [],
    marks: [
        // {
        //     gmap_id: "ChIJSS8sRXmqQjQRB_U7jlAHjZ4",
        //     location: {
        //         lon: 121.57711029052734,
        //         lat: 24.986213616760374,
        //     },
        // },
        // {
        //     gmap_id: "ChIJ-ffZ_VGpQjQRcaEDDIjDQHo",
        //     location: {
        //         lon: 121.52458190917969,
        //         lat: 25.072538763707744,
        //     },
        // },
        // {
        //     gmap_id: "ChIJTamiuZ2pQjQRsmnfkkID6UM",
        //     location: {
        //         lon: 121.52183532714844,
        //         lat: 25.03459428825369,
        //     },
        // },
    ]
}

export const mutations = {
    SET_MARKS(state, data) {
        state.marks = data
    },
    SET_CHANGES(state, data) {
        let set = new Set(state.marks.map(m => m.place_id))
        let newSet = new Set(data.map(m => m.place_id))
        const add = newSet.difference(set)
        state.addMarksID = [...add]
        const remove = set.difference(newSet)
        state.removeMarksID = [...remove]
    },
}

export const actions = {
    getMarks({ commit }, { from, to, filter }) {
        return mapService.GetMarks({ from, to, filter }).then((res) => {
            commit('SET_CHANGES', res.data.data.marks)
            commit('SET_MARKS', res.data.data.marks)
            commit('common/SET_HOT_TAGS', { user_tags: res.data.data.user_tags, system_tags: res.data.data.system_tags }, { root: true })
            return res
        })
    }
}

export const getters = {

}
