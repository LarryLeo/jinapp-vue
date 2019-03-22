<template>
  <van-tabbar v-model="active" v-show="showTabbar">
    <van-tabbar-item to="/">
      <span>首页</span>
      <i class="iconfont iconfont-home" slot="icon"></i>
    </van-tabbar-item>
    <van-tabbar-item to="/politic">
      <span>江津政务</span>
      <i class="iconfont iconfont-politic" slot="icon"></i>
    </van-tabbar-item>
    <van-tabbar-item to="/my">
      <span>我的</span>
      <i class="iconfont iconfont-user" slot="icon"></i>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant'
Vue.use(Tabbar).use(TabbarItem)
export default {
  name: 'BottomTabNavigator',
  data() {
    return {
      active: 0,
      showTabbar: true
    }
  },
  watch: {
    $route(updatedRoute) {
      let { path } = updatedRoute
      switch (path) {
        case '/':
          return (this.showTabbar = true)
        case '/politic':
          return (this.showTabbar = true)
        case '/my':
          return (this.showTabbar = true)
        default:
          return (this.showTabbar = false)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.iconfont {
  font-size: 24px;
}
</style>
