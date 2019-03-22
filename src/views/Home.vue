<template>
  <div class="home">
    <router-link to="/guide">指南</router-link>
    <router-link to="/notice">通知</router-link>
    <router-view class="route-view"></router-view>
  </div>
</template>

<script>
import { Button, Icon } from 'vant'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Button).use(Icon)
export default {
  name: 'HomePage',
  mounted() {},
  methods: {
    async fetchRecommendList() {
      const ERR_OK = 0
      let res = await axios({
        method: 'get',
        url: '/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
        params: {
          g_tk: 2090557760,
          uin: 0,
          format: 'json',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'h5',
          needNewCode: 1
        }
      })
      console.log(res.data)
      if (res.data.code === ERR_OK) {
        console.log(res.data)
      }
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
