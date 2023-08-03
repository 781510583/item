import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {getUserInfoAPI} from '@/api'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token:'',
    userInfo:{}
  },
  mutations: {
    updateToken(state,newToken){
      state.token = newToken    
    },
    updateUserInfo (state,val) {
      state.userInfo = val
    },
  },
  actions: {
    async getUserInfoActions(store) {
      const { data: res } = await getUserInfoAPI()
      if (res.code === 0) {
        store.commit('updateUserInfo',res.data)
      }

    }
  },
  plugins: [createPersistedState()]
})
