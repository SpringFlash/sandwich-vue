<template>
  <menu>
    <li v-for="cat of categories" :key="cat">{{cat.name}}</li>
  </menu>
</template>

<script>
export default {
  name: 'Menu',
  props: ['categories'],
}
</script>