<template>
  <menu>
    <li v-for="(cat, key) in categories" :key="key" v-on:click="changeActive(key)"
    v-bind:category="key" :class="{active: checkActive(key)}">{{cat.name}}</li>
  </menu>
</template>

<script>
export default {
  name: 'Menu',
  props: ['categories'],
  data() {
    return {
      active: undefined
    }
  },
  methods: {
    checkActive(key) {
      if (this.active == key) {
        return true;
      } else if (!this.active) {
        this.changeActive(key);
        return true;
      } else return false;
    },
    changeActive(key) {
      this.active = key;
      this.$emit('changeCategory', key);
    }
  }
}
</script>