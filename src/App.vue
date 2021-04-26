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
          @buy="(prod) => {toCart=prod}" @custom="(prod) => {toPopup=prod}" />
        </div>
    </div>
    <Popup :settings="data.settings" :list="popupList" :item="toPopup" 
    @itemDone="toPopup = {}" @buy ="(prod) => {toCart=prod}" />
  </div>
</template>

<script>
import ProductCard from '@/components/card.vue';
import Menu from '@/components/menu.vue';
import Cart from '@/components/cart.vue';
import Popup from '@/components/popup.vue'
// import json from '@/data.json';

export default {
  name: 'App',
  data() {
    return {
      toCart: {},
      toPopup: {},
      category: '',
      data: {}
    }
  },
  components: {
    ProductCard,
    Menu,
    Cart,
    Popup
  },
  computed: {
    cards: function() {
      return this.data.menu
    },
    cardList: function() {
      let result = {};
      for (let key in this.cards) {
        if (this.cards[key].category == this.category) {
          result[key] = this.data.menu[key]
        }
      }
      return result;
    },
    popupList: function() {
      let result = {};
      for (let key in this.data.settings) {
        result[key] = this.data[this.data.settings[key].object]
      }
      return result;
    }
  },
  beforeCreate() {
    fetch('/data.json')
      .then(response => response.json())
      .then(json => this.data = json);
  }
}
</script>

<style src="@/main.css"></style>
