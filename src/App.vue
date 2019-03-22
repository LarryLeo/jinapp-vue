<template>
  <div id="app">
    <router-view />
    <BottomTabNavigator />
  </div>
</template>
<script>
import BottomTabNavigator from './components/BottomTabNavigator.vue'
export default {
  components: {
    BottomTabNavigator
  }
}
</script>

<style lang="scss" scoped></style>
