export default {
  state: {
    category: ''
  },
  mutations: {
    changeCategory(state, key) {
      state.category = key;
    }
  },
  getters: {
    getCategory (state) {
      return state.category;
    }
  },
  devtools: true
}