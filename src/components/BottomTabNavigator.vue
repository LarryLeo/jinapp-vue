<template>
  <van-tabbar v-model="active">
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
      active: 0
    }
  }
}
</script>
<style lang="scss" scoped>
.iconfont {
  font-size: 24px;
}
</style>
