import { authService } from '@/services/ListooService.js'
import apiClient from '@/services/ListooService.js'

export const namespaced = true

export const state = {
  user: null
}

export const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
    // apiClient.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
    apiClient.defaults.headers.common['session_id'] = userData.user_id
  },
  CLEAR_USER_DATA() {
    localStorage.removeItem('user')
    location.reload()
  }
}

export const actions = {
  register({ commit }, credentials) {
    authService.Register(credentials).then((response) => {
      if (response.data.status) {
        commit('SET_USER_DATA', { ...response.data.data, email: credentials.email, username: credentials.username })
      }
    })
  },
  login({ commit }, credentials) {
   return authService.Login(credentials).then((response) => {
      if (response.data.status) {
        commit('SET_USER_DATA', { ...response.data.data, email: credentials.email })
      }
      return response
    })
  },
  logout({ commit }) {
    authService.Logout().then(() => {
      commit('CLEAR_USER_DATA')
    })
  },
}

export const getters = {
  loggedIn(state) {
    return !!state.user
  }
}
