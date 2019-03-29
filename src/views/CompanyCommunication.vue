<template>
  <div class="container">
    <div class="input-area-wrapper">
      <div class="item" style="margin-bottom: 10px;">
        <span class="key">联系企业</span>
        <span
          class="value"
          @click="navigateTo('/company-comunication/company-list')"
          >请选择联系企业</span
        >
      </div>
      <div class="item" style="margin-bottom: 10px;">
        <span class="key">联系人</span>
        <span class="value">请选择联系人</span>
      </div>
      <textarea
        name=""
        id=""
        class="textarea"
        rows="10"
        placeholder="请输入内容"
        v-model="content"
      ></textarea>
    </div>
    <van-uploader style="padding: 10px;">
      <van-icon name="photograph" size="26px" />
    </van-uploader>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, Uploader } from 'vant'

Vue.use(Icon).use(Uploader)
export default {
  name: 'CompanyComunication',
  data() {
    return {
      content: ''
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push({
        path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/styles/mixin';
.container {
  @include childRoute;
  background-color: #f5f5f9;
  input,
  textarea {
    border: none;
  }
}
.input-area-wrapper {
  .item {
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    background-color: #fff;
    color: #8f8f94;
    height: 45px;
    line-height: 45px;
    .key {
      margin-right: 30px;
    }
    input {
      flex: 1;
      text-align: right;
    }
  }
  textarea {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    border-top: 1px solid #d1d1d1;
  }
}
/* 路由切换动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
