<template>
  <div id="app">
    <TopNavBar />
    <keep-alive>
      <router-view />
    </keep-alive>
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

<style lang="scss" scoped>
#app {
  padding-top: 46px;
}
</style>
