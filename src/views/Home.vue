<template>
  <div>
    <div class="van-ellipsis">
      这是一段宽度限制 250px 的文字，后面的内容会省略
    </div>
    <van-button type="primary">按钮</van-button>
    <van-icon
      class-prefix="iconfont"
      name="home"
      size="40px"
      info="12"
      color="#108ee9"
    />
    <div class="testvar"></div>
  </div>
</template>

<script>
import { Button, Icon } from 'vant'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Button).use(Icon)
export default {
  name: 'HomePage',
  mounted() {
    this.fetchRecommendList()
  },
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
.testvar {
  width: 200px;
  height: 100px;
  background-color: $theme-color;
}
</style>
