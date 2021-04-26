<template>
  <div id= "ProductCard" class="product_card">
      <img v-if="mrk" :src="mrk" alt="market" class="market-logo">
      <img :src="img" alt="image" class="product-pic">
      <div class="product_card_description">
        <h4>{{name}}</h4>
        <p @click="custom" :class="{popupable: popupable}">{{descr}}</p>
        <h5 class="product_card_price">Цена: <span>{{price}}</span> руб.</h5>            
        <h6>КОЛИЧЕСТВО</h6>
        <Counter v-model="quantity"/>
      </div>
      <button class="btn product_card_btn" @click="buy">В КОРЗИНУ</button> 
  </div>
</template>

<script>
import Counter from '@/components/counter.vue'
export default {
  name: 'ProductCard',
  props: ['info', 'market'],
  data() {
    return {
      img: require('../assets'+this.info.image),
      name: this.info.name,
      descr: this.info.description,
      price: this.info.price,
      popupable: this.info.type == "multiple", 
      components: this.info.components,
      quantity: 1
    }
  },
  computed: {
    mrk: function() {
      if (this.market) return require('../assets'+this.market.image);
      else return false;
    }
  },
  methods: {
    buy: function() {
      this.$emit('buy', this);
    },
    custom: function() {
      this.$emit('custom', this)
    }
  },
  
  components: {
    Counter
  }
}
</script>