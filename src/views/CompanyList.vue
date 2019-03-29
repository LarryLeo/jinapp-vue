<template>
  <div class="container">企业列表</div>
</template>

<script>
export default {
  name: 'CompanyList'
}
</script>

<style lang="scss" scoped>
@import '~common/styles/mixin';
.container {
  @include childRoute;
  background-color: #f5f5f9;
  height: 100%;
  width: 100%;
}
</style>
