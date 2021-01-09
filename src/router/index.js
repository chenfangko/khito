import Vue from 'vue'
import VueRouter from 'vue-router'
import ExploreLists from '../views/ExploreLists.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ExploreLists',
    component: ExploreLists
  },
  {
    path: '/EditingDesk',
    name: 'EditingDesk',
    component: () => import('../views/EditingDesk.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/Member',
    name: 'Member',
    component: () => import('../views/Member.vue'),
  },
  {
    path: '/ExplorePlaces',
    name: 'ExplorePlaces',
    component: () => import('../views/ExplorePlaces.vue')

  },
  {
    path: '/EditList/:listId',
    name: 'EditList',
    component: () => import('../views/EditList.vue'),
    meta: { requiresAuth: true }

  },
  {
    path: '/List/:listId',
    name: 'List',
    component: () => import('../views/List.vue')

  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  const userstring = localStorage.getItem('user')
  if (userstring) {
    const userdata = JSON.parse(userstring)
    store.commit('auth/SET_USER_DATA', userdata)
  }

  store.commit('CLEAR_SELECTTAG')
  store.commit('common/CLEAR_HOT_TAGS')

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.

    if (!store.getters['auth/loggedIn']) {
      next({
        path: '/Member',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }

})

export default router
