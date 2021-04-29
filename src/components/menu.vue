<template>
  <menu>
    <li v-for="(cat, key) in categories" :key="key" v-on:click="changeCategory(key)"
    v-bind:category="key" :class="{active: key == $store.getters.getCategory}">{{cat.name}}</li>
  </menu>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Menu',
  computed: {
    active() {return this.$store.getters.getCategory},
    categories() {return this.$store.state.json.categories}
  },
  methods: {
    ...mapMutations(['changeCategory'])
  }
}
</script>