<template>
  <div class="notice">
    <van-pull-refresh v-model="refreshing" @refresh="fetchNotice('refresh')">
      <van-list
        @load="fetchNotice"
        :finished="noMore"
        finished-text="没有更多啦"
      >
        <van-cell v-for="(item, index) in noticeList" :key="index">
          <div class="item" @click="goToDetail(index)">
            <img src="../assets/images/notice-icon.jpg" alt="" class="icon" />
            <p class="title">{{ item.title }}</p>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Vue from 'vue'
import { List, Cell, PullRefresh } from 'vant'
import { mapMutations, mapState } from 'vuex'
import { requestGet } from '../utils/index'
import * as types from '../mutations/mutationTypes'

Vue.use(List)
  .use(Cell)
  .use(PullRefresh)
export default {
  name: 'Notice',
  data() {
    return {
      noticeList: [],
      pn: 1,
      ps: 10,
      loading: false,
      refreshing: false,
      noMore: false
    }
  },
  computed: {
    ...mapState(['notice'])
  },
  created() {
    if (this.notice.data.length) {
      this.noticeList = this.notice.data
      this.noMore = this.notice.noMore
    } else {
      this.fetchNotice()
    }
  },
  beforeDestroy() {},
  methods: {
    goToDetail(selectIndex) {
      this.$router.push({
        path: '/notice/detail'
      })
      this.cacheNoticeList({
        data: this.noticeList,
        selectIndex,
        noMore: this.noMore
      })
    },
    async fetchNotice(refresh) {
      if (refresh) {
        this.noMore = false
        this.noticeList = []
      }
      if (this.noMore || this.loading) return
      this.loading = true
      let res = await requestGet('/app/v1/index/articleList', {
        type_id: 3,
        pn: this.pn,
        ps: this.ps
      })
      let list = res.data.list
      this.noticeList = [...this.noticeList, ...list]
      this.pn = list.length < this.ps ? this.pn : ++this.pn
      this.noMore = list.length < this.ps
      this.loading = false
      this.refreshing = false
    },
    ...mapMutations({
      cacheNoticeList: types.CACHE_NOTICE_DATA
    })
  }
}
</script>

<style lang="scss" scoped>
.notice {
  position: fixed;
  z-index: 9;
  padding-top: 46px;
  top: 0;
  left: 0;
  width: 100%;
  overflow: auto;
}
.item {
  display: flex;
  .icon {
    margin-right: 20px;
    width: 50px;
    height: 50px;
  }
  .title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 250px;
  }
}
</style>
