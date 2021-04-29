<template>
  <div class="product_card_count">
    <button v-on:click="minCount">-</button>
    <input type="text" :value="quantity" @input="changeQty($event.target.value)">
    <button v-on:click="addCount">+</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: ['idPar', 'type'],
  computed: {
    quantity() { 
      return this.type == 'original' ? this.$store.getters.getQty(this.idPar) : this.$store.getters.getPopQty;
    }
  },
  methods: {
    minCount() {
      if (this.quantity > 1) {
        this.changeQty(this.quantity - 1)
      }
    },
    addCount() {
      this.changeQty(Number(this.quantity) + 1);
    },
    changeQty(val) {
      let result;
      if (this.checkValue(val)) result = 1
      else result = val;
      this.type == 'original' ? this.$store.commit('changeQty', {id:this.idPar, quantity: result}) : this.$store.commit('changePopQty', result)
    },
    checkValue(val) {
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