import Vue from 'vue'
import Vuex from 'vuex'


import * as auth from '@/store/modules/auth.js'
import * as common from '@/store/modules/common.js'
import * as map from '@/store/modules/map.js'
import * as user from '@/store/modules/user.js'
import * as place from '@/store/modules/place.js'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    auth,
    common,
    map,
    user,
    place
  },
  state: {
    selectTags: [],

  },
  mutations: {
    ADD_SELECTTAG(state, tag) {
      state.selectTags.push(tag)
    },
    DELETE_SELECTTAG(state, tag) {
      const index = state.selectTags.map(tag => tag.name).indexOf(tag.name)
      state.selectTags.splice(index, 1);
    },
    CLEAR_SELECTTAG(state) {
      state.selectTags = []
    }
  },
  actions: {

  },
  getters: {
    MenuSelectTags(state) {
      const arr = [101, 102, 103]
      return state.selectTags.filter(selectTag => !arr.includes(selectTag.id))
    }
  }

})
