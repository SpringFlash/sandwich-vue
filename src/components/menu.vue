<template>
  <menu>
    <li
      v-for="(cat, key) in categories"
      :key="key"
      v-on:click="changeCategory(key)"
      v-bind:category="key"
      :class="{ active: key == $route.params.category }"
    >
      {{ cat.name }}
    </li>
  </menu>
</template>

<script>
export default {
  name: "Menu",
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },
  },
  methods: {
    changeCategory(key) {
      this.$router.push({ path: `/${key}` }).catch(() => {});
    },
  },
};
</script>
