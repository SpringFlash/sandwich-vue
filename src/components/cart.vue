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
          <p>{{item.quantity}}</p>
        </div>
      </div>
      <p>Итого: <span>{{price}}</span> руб.</p>
      <button class="btn" :class="{inactive_btn: isInactive}" @click="order">ОФОРМИТЬ ЗАКАЗ</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: ['item'],
  data() {
    return {
      items: {}
    }
  },
  computed: {
    isInactive: function() {
      if (Object.keys(this.items).length > 0) return false;
      else return true;
    },
    price: function() {
      let result = 0;
      for (let key in this.items) {
        result += Number(this.items[key].price * this.items[key].quantity);
      }
      return result;
    }
  },
  watch: {
    item: function() {
      if (Object.keys(this.item).length > 0) {
        const id = this.item.name;
        this.$set(this.items, id, this.item);
        if (this.items[id].$on) this.items[id].$on('changeCount', (x) => {this.items[id].count = x})
        this.$emit('itemDone')
      }
    }
  },
  methods: {
    remove: function(id) {
      if (confirm (`Вы действительно хотите удалить "${this.items[id].name}" из корзины?`)) {
        if (this.items[id].$off) this.items[id].$off('changeCount')
        this.$delete(this.items, id)
      }
    },
    order: function() {
      if (!this.isInactive) {
        let result = 'Ваш заказ:\n'
        for (let key in this.items) {
          let it = this.items[key];
          result += `${it.name} x${it.quantity} шт. - ${it.price*it.quantity} руб.\n`
        }
        result += '---------------------------------------------------\n'
        result += `Итого: ${this.price} руб.`
        alert(result)
      }
    }
  }
}
</script>
