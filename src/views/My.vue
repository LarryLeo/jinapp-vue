<template>
  <div>
    <router-link to="/my/history">我的记录</router-link>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'My',
  mounted() {
    let userCredential = {
      member_id: 387,
      member_token: '244BA2987F2385B5243C97E6AA7D3AA7'
    }
    localStorage.setItem('userCredential', JSON.stringify(userCredential))
  }
}
</script>
<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
