export default {
  state: {
    popupItem: {},
    quantity: 0,
    show: false
  },
  mutations: {
    initPop(state, item) {
      state.quantity = item.quantity;
      delete item.quantity;
      state.popupItem = item;
      state.show = true;
    },
    hidePop(state) {
      state.show = false;
    },
    changePopQty(state, val) {
      state.quantity = val;
    }
  },
  getters: {
    getPopShow: state => state.show,
    getPopItem: state => state.popupItem,
    getPopQty: state => state.quantity
  }
}