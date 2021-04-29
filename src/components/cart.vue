<template>
  <div class="cart">
    <div class="cart_header">
      <img src="@/assets/i/shopping-basket.svg" alt="cart">
      <h3>Корзина</h3>
    </div>
    <div class="cart_order">
      <div class="cart_order_table">
        <div class="cart_order_table_product">
          <p>Название</p>
          <p>Количество</p>
        </div>
        <div class="cart_order_table_product" v-for="(item, key) in items" :key = "key" :id="key"
        @click="remove(key)">
          <p>{{item.name}}</p>
          <p>{{getQty(item.name)}}</p>
        </div>
      </div>
      <p>Итого: <span>{{price}}</span> руб.</p>
      <button class="btn" :class="{inactive_btn: isInactive}" @click="order">ОФОРМИТЬ ЗАКАЗ</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'Cart',
  computed: {
    items() { return this.$store.getters.getCart },
    isInactive: function() {
      if (Object.keys(this.items).length > 0) return false;
      else return true;
    },
    price() {
      let result = 0;
      
      for (let key in this.items) {
        result += Number(this.items[key].price * this.getQty(key));
      }
      return result;
    }
  },
  methods: {
    ...mapMutations({
      remove: 'removeFromCart'
    }),
    getQty(id) {
      if (this.items[id].type == 'original') return this.$store.getters.getQty(id)
      else return this.items[id].quantity;
    },
    order: function() {
      if (!this.isInactive) {
        let result = 'Ваш заказ:\n'
        for (let key in this.items) {
          let it = this.items[key];
          let qty = this.getQty(key);
          result += `${it.name} x${qty} шт. - ${it.price*qty} руб.\n`
        }
        result += '---------------------------------------------------\n'
        result += `Итого: ${this.price} руб.`
        alert(result)
      }
    }
  }
}
</script>
