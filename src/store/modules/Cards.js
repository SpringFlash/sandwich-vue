export default {
  state: () => ({
    cards: {}
  }),
  mutations: {
    changeQty(state, {id, quantity}) {
      state.cards = {...state.cards, [id]: {...state.cards[id], quantity: quantity}}
    }
  },
  getters: {
    getCards: (state) => Object.values(state.cards),
    getCard: (state) => id => state.cards[id],
    getQty: (state, getters) => id => getters.getCard(id).quantity
  }
}