<template>
  <div id= "ProductCard" class="product_card">
      <img v-if="mrk" :src="mrk" alt="market" class="market-logo">
      <img :src="img" alt="image" class="product-pic">
      <div class="product_card_description">
        <h4>{{name}}</h4>
        <p>{{descr}}</p>
        <h5 class="product_card_price">Цена: <span>{{price}}</span> руб.</h5>            
        <h6>КОЛИЧЕСТВО</h6>
        <!-- место для Counter.render() -->
        <div class="product_card_count">
          <button v-on:click="minCount">-</button>
          <input type="text" :value="count">
          <button v-on:click="addCount">+</button>
        </div>
      </div>
      <button class="btn product_card_btn">В КОРЗИНУ</button> 
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['info', 'market'],
  data() {
    return {
      img: require('../assets'+this.info.image),
      name: this.info.name,
      descr: this.info.description,
      price: this.info.price,
      count: 0
    }
  },
  computed: {
    mrk: function() {
      if (this.market) return require('../assets'+this.market.image);
      else return false;
    }
  },
  methods: {
    minCount: function() {
      if (this.count > 0) {
        this.count--
      }
    },
    addCount: function() {
      this.count = Number(this.count) + 1;
    }
  }
}
</script>