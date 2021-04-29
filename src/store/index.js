import Vue from 'vue';
import Vuex from 'vuex';

import Menu from './modules/Menu';
import Cart from './modules/Cart';
import Cards from './modules/Cards';
import Popup from './modules/Popup';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Cart,
    Menu,
    Cards,
    Popup
  },
  state: {
    json: {}
  },
  mutations: {
    updateData(state, json) {
      state.json = json;
      state.Menu.category = Object.keys(state.json.categories)[0];
      for (let card of json.menu)
        state.Cards.cards[card.name] = {...card, quantity: 1};
    }
  },
  actions: {
    async getJson(ctx) {
      const res = await fetch('/data.json');
      const data = await res.json();
      ctx.commit('updateData', data);
    }
  },
  getters: {
    getData(state) { 
      return state.json 
    }
  }
});