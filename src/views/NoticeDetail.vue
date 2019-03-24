<template>
  <div class="container">
    <section class="title-wrapper">
      <p class="title">{{ currentNoticeDetail.title }}</p>
      <div class="time-info">
        {{ currentNoticeDetail.updated_at }}
      </div>
    </section>
    <section class="content" v-html="currentNoticeDetail.body"></section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NoticeDetail',
  computed: {
    ...mapGetters(['currentNoticeDetail'])
  }
}
</script>

<style lang="scss" scoped>
@import '~common/styles/variable';
.container {
  position: fixed;
  z-index: 9;
  padding-top: 46px;
  top: 0;
  left: 0;
  width: 100%;
  overflow: auto;
  background-color: #fff;
}
.title-wrapper {
  padding: 10px 15px;
  .title {
    font-size: $font-size-large;
    font-weight: bold;
  }
  .time-info {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 20px;
    border-bottom: 1px solid #d1d1d1;
    font-size: $font-size-medium;
  }
}
.content {
  background-color: #fff;
  line-height: 1.5rem;
  padding: 0 15px;
  color: #3a3a3a;
}
</style>
