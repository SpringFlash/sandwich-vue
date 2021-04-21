<template>
  <div id="app">
    <h1>СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>
    <div class="container">
        <div class="interface">
            <Menu :categories="data.categories"/>
            <Cart/>
        </div>
        <div id="product-list">
          <ProductCard v-for="card of cards" :key = "card"
          :info="card" :market="data.markets[card.market]"/>
        </div>
    </div>
  </div>
</template>

<script>
import ProductCard from './components/card.vue';
import Menu from './components/menu.vue';
import Cart from './components/cart.vue';
import json from './data.json';

export default {
  name: 'App',
  data() {
    return {
      cards: json.menu,
      data: json
    }
  },
  components: {
    ProductCard,
    Menu,
    Cart
  }
}
</script>

<style src="@/main.css"></style>
