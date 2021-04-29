import Vue from 'vue'
export default {
  state: {
    items: {}
  },
  mutations: {
    addToCart(state, item) {
      const id = item.name;
      Vue.set(state.items, id, item);
    },
    removeFromCart(state, id) {
      if (confirm (`Вы действительно хотите удалить "${state.items[id].name}" из корзины?`)) {
        Vue.delete(state.items, id)
      }
    },
  },
  getters: {
    getCart(state) { return state.items }
  }
}