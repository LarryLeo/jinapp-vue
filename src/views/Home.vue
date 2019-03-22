<template>
  <div class="home">
    <van-swipe>
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <router-view class="route-view"></router-view>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
import Vue from 'vue'
Vue.use(Swipe).use(SwipeItem)
// import axios from 'axios'
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
