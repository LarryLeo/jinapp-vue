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
  </div>
</template>

<script>
import { Button, Icon } from 'vant'
import Vue from 'vue'
Vue.use(Button).use(Icon)
export default {
  name: 'HomePage'
}
</script>

<style></style>
