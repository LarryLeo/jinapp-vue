<template>
  <div class="container">
    <div class="tab-wrapper">
      <van-tabs
        color="#0093ff"
        v-model="activeTabIndex"
        @change="loadHistoryJustOnetime"
      >
        <van-tab title="我的意见">
          <van-pull-refresh
            v-model="pullLoading"
            @refresh="pullRefresh('suggestions')"
          >
            <van-list
              class="list-wrapper"
              @load="fetchHistoryData({ type: historyType })"
              :finished="suggestionsHistory.noMore"
              finished-text="没有更多啦"
            >
              <div
                class="list-item"
                v-for="(item, index) in suggestionsHistory.data"
                :key="index"
              >
                <div class="header flex">
                  <div class="left flex">
                    <span class="key">意见对象</span>
                    <span class="unit">{{ item.unit.unit_name }}</span>
                  </div>
                  <span class="status" :style="statusBg(item.status)">
                    {{ statusDesc(item.status) }}
                  </span>
                </div>
                <div class="row flex">
                  <span class="key">主题</span>
                  <span class="value">{{ item.title }}</span>
                </div>
                <div class="row flex">
                  <span class="key">描述</span>
                  <span class="value">{{ item.content }}</span>
                </div>
                <div class="flex">
                  <span class="key">评分</span>
                  <van-rate
                    v-model="item.star"
                    :count="5"
                    readonly
                    :size="18"
                  />
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="我的咨询">我的咨询</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Tabs, Tab, List, Rate, PullRefresh } from 'vant'
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

Vue.use(Tabs)
  .use(Tab)
  .use(List)
  .use(Rate)
  .use(PullRefresh)
export default {
  name: 'History',
  data() {
    return {
      activeTabIndex: 0,
      starOn: 3,
      historyType: 'suggestions',
      switchAndLoad: true,
      pullLoading: false
    }
  },
  watch: {
    activeTabIndex(newVal) {
      let historyTypes = ['suggestions', 'consultations']
      this.historyType = historyTypes[newVal]
    }
  },
  computed: {
    ...mapGetters(['suggestionsHistory', 'consultationsHistory'])
  },
  created() {
    const {
      params: { type }
    } = this.$route
    if (type === 'suggest') {
      this.activeTabIndex = 0
      this.historyType = 'suggestions'
    } else {
      this.activeTabIndex = 1
      this.historyType = 'consultations'
    }

    this.fetchHistoryData({
      type: this.historyType
    })
  },
  methods: {
    statusDesc(statusCode) {
      const statusDesc = ['待回复', '已回复', '已完成']
      return statusDesc[statusCode]
    },
    statusBg(statusCode) {
      const statusStylesArr = [
        { backgroundColor: '#fd714e' },
        { backgroundColor: '#0093ff' },
        { backgroundColor: 'gray' }
      ]
      return statusStylesArr[statusCode]
    },
    loadHistoryJustOnetime(index) {
      let historyTypes = ['suggestions', 'consultations']
      this.switchAndLoad && this.fetchHistoryData({ type: historyTypes[index] })
      this.switchAndLoad = false
    },
    async pullRefresh(type) {
      await this.refreshHistoryData({ type })
      this.pullLoading = false
    },
    ...mapActions(['fetchHistoryData', 'refreshHistoryData'])
  }
}
</script>
<style lang="scss" scoped>
@import '~common/styles/mixin';
.container {
  @include childRoute;
  background-color: #f5f5f9;
}
.flex {
  display: flex;
}
.list-wrapper {
  padding: 10px;
}
.list-item {
  padding: 10px;
  margin-bottom: 10px;
  height: 120px;
  background-color: #fff;
  .header {
    justify-content: space-between;
    margin-bottom: 15px;
    .unit {
      color: #0093ff;
      font-weight: bold;
    }
  }
  .row {
    margin-bottom: 10px;
  }
  .status {
    display: inline-block;
    padding: 6px;
    border-radius: 12px;
    background-color: #0093ff;
    color: #fff;
    font-size: 10px;
  }
  .key {
    color: #888;
    margin-right: 10px;
  }
  .value {
    max-width: 250px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
