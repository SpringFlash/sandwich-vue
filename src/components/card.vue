<template>
  <div id= "ProductCard" class="product_card">
      <img v-if="mrk" :src="mrk" alt="market" class="market-logo">
      <img :src="img" alt="image" class="product-pic" :class="{unloaded: !imgIsLoad}" @load="imgIsLoad=true">
      <div class="product_card_description">
        <h4>{{name}}</h4>
        <p @click="custom" :class="{popupable: popupable}">{{descr}}</p>
        <h5 class="product_card_price">Цена: <span>{{price}}</span> руб.</h5>            
        <h6>КОЛИЧЕСТВО</h6>
        <Counter :idPar="name" :type="'original'"/>
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
      imgIsLoad: false,
      name: this.info.name,
      descr: this.info.description,
      price: this.info.price,
      popupable: this.info.type == "multiple", 
      components: this.info.components
    }
  },
  computed: {
    mrk() {
      if (this.market) return require('../assets'+this.market.image);
      else return false;
    }
  },
  methods: {
    buy: function() {
      let toBuy = {
        name: this.name,
        price: this.price,
        components: this.components,
        type: 'original'
      };
      this.$store.commit('addToCart', toBuy);
    },
    custom: function() {
      let toCust = {
        name: this.name,
        img: this.img,
        price: this.price,
        components: this.components,
        quantity: this.$store.getters.getQty(this.name)
      };
      this.$store.commit('initPop', toCust)
    }
  },
  components: {
    Counter
  }
}
</script>

<style>
.product-pic.unloaded {
  width: 0;
  height: 0;
}
</style>