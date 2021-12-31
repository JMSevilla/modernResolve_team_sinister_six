import Vue from 'vue'
import Vuex from 'vuex'
import client from "./HTTP/client-common"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    responseObject : {
      response: '',
      responseArray: []
    }
  },
  getters: {
    get_user_response : (state) =>  {
       return state.responseObject.response
    },
    get_array_user_response : (state) => {
      return state.responseObject.responseArray
    }
  },
  mutations: {
    mutate_post_user : (state, data) => {
      state.responseObject.response = data;
    },
    mutate_get_user: (state, data) => {
      state.responseObject.responseArray = data;
    },
    mutate_delete_user : (state, data) => {
      state.responseObject.response = data
    },
    mutate_update_user: (state, data) => {
      state.responseObject.response = data
    }
  },
  actions: {
    action_post_user({commit}, {object}) {
      return new Promise((resolve) => {
        var data = new FormData();
        data.append("firstname", object.firstname)
        data.append("lastname", object.lastname)
        const req = client.post(`/api/post-user/user-post`, data)
        return req.then((resp) => {
          return resolve(commit(`mutate_post_user`, resp))
        })
      })
    },
    action_get_user({commit}) {
      const initialize = new Promise((resolve) => {
        const request = client.get(`/api/post-user/get-user`)
        return request.then((res) => {
          return resolve(commit(`mutate_get_user`, res))
        })
      })
      return initialize;
    },
    async action_delete_user({commit}, {id}) {
      const init = new Promise((resolve) => {
        const request = client.delete(`/api/post-user/delete-user/${id}`)
        return request.then((response) => {
          return resolve(commit(`mutate_delete_user`, response))
        })
      })
      return await init;
    },
    async action_update_user({commit}, {object, id}) {
      const init = new Promise((resolve) => {
        var data = new FormData();
        data.append("firstname", object.firstname)
        data.append("lastname", object.lastname)
        const request = client.put(`/api/post-user/update-user/${id}`, data)
        return request.then(response => {
          resolve(commit(`mutate_update_user`, response))
        })
      })
      return await init;
    }
  },
  modules: {
  }
})
