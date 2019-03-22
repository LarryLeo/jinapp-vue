<template>
  <div>
    <p>江津政务</p>
    <router-link to="/politic/contacts">联系人</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Politic',
  mounted() {
    console.log('江津政务')
  }
}
</script>
<style lang="scss" scoped></style>
