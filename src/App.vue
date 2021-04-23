<template>
  <div id="app">
    <h1>СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>
    <div class="container">
        <div class="interface">
            <Menu :categories="data.categories" @changeCategory="(key) => {category = key}"/>
            <Cart :item="toCart" @itemDone="toCart = {}"/>
        </div>
        <div id="product-list">
          <ProductCard v-for="(card, key) of cardList" :key = "key"
          :info="card" :market="data.markets[card.market]" 
          @buy="(prod) => {toCart=prod}" @custom="(prod) => {toPopup=prod}"/>
        </div>
    </div>
    <Popup :settings="data.settings" :list="popupList" :item="toPopup" @itemDone="toPopup = {}"/>
  </div>
</template>

<script>
import ProductCard from './components/card.vue';
import Menu from './components/menu.vue';
import Cart from './components/cart.vue';
import Popup from './components/popup.vue'
import json from './data.json';

export default {
  name: 'App',
  data() {
    return {
      cards: json.menu,
      toCart: {},
      toPopup: {},
      category: '',
      data: json
    }
  },
  components: {
    ProductCard,
    Menu,
    Cart,
    Popup
  },
  computed: {
    cardList: function() {
      let result = {};
      for (let key in this.cards) {
        if (this.cards[key].category == this.category) {
          result[key] = json.menu[key]
        }
      }
      return result;
    },
    popupList: function() {
      let result = {};
      for (let key in json.settings) {
        result[key] = json[json.settings[key].object]
      }
      return result;
    }
  }
}
</script>

<style src="@/main.css"></style>
