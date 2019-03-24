<template>
  <div class="container">
    <div class="to-history">
      <span v-if="currentPageName === 'suggest'">意见历史</span>
      <span v-if="currentPageName === 'consult'">咨询历史</span>
    </div>
    <div class="input-area-wrapper">
      <div class="item" style="margin-bottom: 10px;">
        <span class="key"
          >{{ currentPageName === 'suggest' ? '意见' : '咨询' }}对象</span
        >
        <span class="value">请选择单位名称</span>
      </div>
      <div
        class="item"
        style="margin-bottom: 10px;"
        v-if="currentPageName === 'consult'"
      >
        <span class="key">咨询事项</span>
        <span class="value">请选择事项</span>
      </div>
      <div class="item">
        <span class="key">建议主题</span>
        <input type="text" maxlength="20" placeholder="请输入主题" />
      </div>
      <textarea
        name=""
        id=""
        class="textarea"
        rows="10"
        placeholder="请输入内容"
      ></textarea>
    </div>
    <div class="submit-btn">
      <van-button type="info" size="large">提交</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'vant'
Vue.use(Button)
export default {
  name: 'MakeCenter',
  data() {
    return {
      currentPageName: ''
    }
  },
  mounted() {
    const {
      params: { type }
    } = this.$route
    this.currentPageName = type
  }
}
</script>

<style lang="scss" scoped>
@import '~common/styles/mixin';
.container {
  @include childRoute;
  input,
  textarea {
    padding: 0;
    border: none;
  }
}
.to-history {
  padding: 10px;
  text-align: right;
  span {
    font-size: 14px;
    color: #8f8f94;
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
.submit-btn {
  margin-top: 20px;
  padding: 0 10px;
}
</style>
