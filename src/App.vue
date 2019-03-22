<template>
  <div id="app">
    <TopNavBar />
    <router-view />
    <BottomTabNavigator />
  </div>
</template>
<script>
import BottomTabNavigator from './components/BottomTabNavigator.vue'
import TopNavBar from './components/TopNavBar.vue'
export default {
  components: {
    BottomTabNavigator,
    TopNavBar
  }
}
</script>

<style lang="scss" scoped></style>
