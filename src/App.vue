<template>
  <div id="app">
    <h1>СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>
    <div class="container">
      <div class="interface">
        <Menu />
        <Cart />
      </div>
      <div id="product-list">
        <ProductCard
          v-for="card of cardList"
          :key="card.name"
          :info="card"
          :market="data.markets[card.market]"
        />
      </div>
    </div>
    <Popup />
  </div>
</template>

<script>
import ProductCard from "@/components/card.vue";
import Menu from "@/components/menu.vue";
import Cart from "@/components/cart.vue";
import Popup from "@/components/popup.vue";

export default {
  name: "App",
  data() {
    return {
      hasData: false,
    };
  },
  components: {
    ProductCard,
    Menu,
    Cart,
    Popup,
  },
  computed: {
    data() {
      return this.$store.getters.getData;
    },
    category() {
      return this.$route.params.category;
    },
    cards() {
      return this.$store.getters.getCards;
    },
    cardList() {
      return this.hasData
        ? this.cards.filter((card) => card.category == this.category)
        : [];
    },
  },
  async mounted() {
    this.$store.dispatch("getJson").then(() => {
      this.hasData = true;
      if (!Object.keys(this.data.categories).includes(this.$route.params.category))
        this.$router.push(`/${Object.keys(this.data.categories)[0]}`);
    });
  },
};
</script>

<style src="@/main.css"></style>
