<template>
  <div class="home">
    <router-link to="/guide">指南</router-link>
    <router-link to="/notice">通知</router-link>
    <van-button type="primary" @click="navigate">我要跳转</van-button>
    <router-view class="route-view"></router-view>
  </div>
</template>

<script>
import { Button, Icon } from 'vant'
import Vue from 'vue'
// import axios from 'axios'
Vue.use(Button).use(Icon)
export default {
  name: 'HomePage',
  mounted() {},
  methods: {
    navigate() {
      this.$router.push({
        path: 'guide/我的传输',
        query: {
          post_id: 12
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/styles/variable';
/* .home {
  position: fixed;
  top: 0;
  left: 0;
} */
.testvar {
  width: 200px;
  height: 100px;
  background-color: $theme-color;
}
.route-view {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: slateblue;
}
</style>
