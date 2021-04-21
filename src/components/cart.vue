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
      </div>
      <p>Итого: <span>{{price}}</span> руб.</p>
      <button class="btn inactive_btn">ОФОРМИТЬ ЗАКАЗ</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      price: 0
    }
  }
}
</script>
