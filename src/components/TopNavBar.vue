<template>
  <van-nav-bar
    :title="title"
    :left-arrow="showBackBtn"
    fixed
    :z-index="999"
    class="navbar"
    @click-left="back"
  />
</template>

<script>
import Vue from 'vue'
import { NavBar } from 'vant'
Vue.use(NavBar)
export default {
  name: 'TopNavBar',
  data() {
    return {
      title: '警企e通',
      showBackBtn: false
    }
  },
  computed: {},
  watch: {
    $route(updatedRoute) {
      let { name, path } = updatedRoute
      if (path === '/make/suggest') {
        this.title = '意见建议'
      } else if (path === '/make/consult') {
        this.title = '政务咨询'
      } else {
        this.title = name || '默认'
      }
      switch (path) {
        case '/':
          return (this.showBackBtn = false)
        case '/politic':
          return (this.showBackBtn = false)
        case '/my':
          return (this.showBackBtn = false)
        default:
          return (this.showBackBtn = true)
      }
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/styles/variable';
.navbar {
  background-color: $theme-color;
  .van-icon {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
}
</style>
