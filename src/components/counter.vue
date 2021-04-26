<template>
  <div class="product_card_count">
    <button v-on:click="minCount">-</button>
    <input type="text" :value="quantity" @input="changeQty($event)">
    <button v-on:click="addCount">+</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: ['quantity'],
  /* data() {
    return {
      quantity: this.start
    }
  }, */
  model: {
    prop: 'quantity',
    event: 'changeQty'
  },
  methods: {
    minCount: function() {
      if (this.quantity > 1) {
        this.$emit('changeQty', this.quantity - 1)
      }
    },
    addCount: function() {
      this.$emit('changeQty', Number(this.quantity) + 1);
    },
    changeQty: function(e) {
      if (this.checkValue(e.target.value)) this.$emit('changeQty', 1);
      this.$emit('changeQty', Number(e.target.value))
    },
    checkValue: function(val) {
      console.log(val)
      return (
        !Number.isInteger(Number(val)) ||
        String(val).includes(' ') ||
        String(val) == '' ||
        Number(val) <= 0
      )
    }
  }
}
</script>

<style>

</style>