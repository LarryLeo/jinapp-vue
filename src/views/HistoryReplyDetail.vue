<template>
  <div class="container">
    <div class="list-item">
      <div class="header flex">
        <div class="left flex">
          <span class="key"
            >{{ historyData === 'suggestions' ? '意见' : '咨询' }}对象</span
          >
          <span class="unit">{{ historyData.unit.unit_name }}</span>
        </div>
        <span class="status" :style="statusBg(historyData.status)">
          {{ statusDesc(historyData.status) }}
        </span>
      </div>
      <div class="row flex">
        <span class="key">主题</span>
        <span class="value">{{ historyData.title }}</span>
      </div>
      <div class="row flex">
        <span class="key">描述</span>
        <span class="value">{{ historyData.content }}</span>
      </div>
      <div class="flex">
        <span class="key">评分</span>
        <van-rate v-model="historyData.star" :count="5" readonly :size="18" />
      </div>
    </div>
    <div class="reply-wrapper">
      <van-list>
        <div
          class="itemWrapper itemWrapper-answer flex"
          :class="{ 'itemWrapper-question': item.reply_type === 'question' }"
          v-for="(item, index) in replyList"
          :key="index"
        >
          <img
            style="margin-right: 10px;"
            class="avatar"
            src="../assets/images/avatar_placeholder.png"
            alt=""
            v-if="item.reply_type === 'answer'"
          />
          <p
            class="content"
            :class="{
              'content-answer': item.reply_type === 'answer',
              'content-question': item.reply_type === 'question'
            }"
          >
            {{ item.content }}
          </p>
          <img
            style="margin-right: 10px;"
            class="avatar"
            src="../assets/images/avatar_placeholder.png"
            alt=""
            v-if="item.reply_type === 'question'"
          />
        </div>
      </van-list>
    </div>
    <div class="userOperate">
      <van-button
        @click="toggleRateModal"
        type="info"
        size="large"
        class="button"
        >已解决问题</van-button
      >
      <van-button
        @click="toggleContinueAsk"
        size="large"
        type="info"
        plain
        class="button"
        >继续提问</van-button
      >
    </div>
    <van-dialog
      v-model="showContinueAsk"
      title="继续提问"
      show-cancel-button
      show-confirm-button
    >
      <van-cell-group>
        <van-field v-model="continueAskContent" placeholder="请输入内容" />
      </van-cell-group>
    </van-dialog>
    <van-popup v-model="showRateModal">
      <div class="rateWindow">
        <img
          class="cover"
          src="../assets/images/rate-cover.png"
          alt="coverRate"
        />
        <span class="title">问题已解决</span>
        <span class="desc">感谢您的参与</span>
        <span class="desc">请为我们的服务做出评价</span>
        <div class="star">
          <van-rate v-model="starOn" :count="5" />
        </div>
        <van-button type="info">
          提交评价
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { List, Button, Dialog, Field, CellGroup, Popup, Rate } from 'vant'
import { mapGetters } from 'vuex'
import { requestGet } from '../utils/index'

Vue.use(List)
  .use(Button)
  .use(Dialog)
  .use(Field)
  .use(CellGroup)
  .use(Popup)
  .use(Rate)
export default {
  name: 'HistoryReplyDetail',
  data() {
    return {
      historyType: 'suggestions',
      replyList: [],
      continueAskContent: '',
      showContinueAsk: false,
      showRateModal: false,
      starOn: 5
    }
  },
  created() {
    const {
      params: { type }
    } = this.$route
    if (type === 'suggest') {
      this.historyType = 'suggestions'
    } else {
      this.historyType = 'consultations'
    }
    this.fetchReplyList()
  },
  computed: {
    historyData() {
      if (this.historyType === 'suggestions') {
        return this.suggestionReply
      } else {
        return this.consultationReply
      }
    },
    ...mapGetters(['suggestionReply', 'consultationReply'])
  },
  methods: {
    toggleRateModal() {
      this.showRateModal = !this.showRateModal
    },
    toggleContinueAsk() {
      this.showContinueAsk = !this.showContinueAsk
    },
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
    async fetchReplyList() {
      let userCredential = JSON.parse(localStorage.getItem('userCredential'))
      let apiUrl =
        this.historyType === 'suggestions'
          ? '/app/v1/suggestion/getReplyList'
          : '/app/v1/consult/getReplyList'
      let apiData =
        this.historyType === 'suggestions'
          ? { ...userCredential, suggestion_id: this.historyData.id }
          : { ...userCredential, consult_id: this.historyData.id }
      let res = await requestGet(apiUrl, {
        ...apiData
      })
      this.replyList = res.data.list
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/styles/mixin';
.container {
  @include childRoute;
  background-color: #f5f5f9;
  .van-popup {
    border-radius: 10px;
  }
}
.flex {
  display: flex;
}
.list-item {
  position: fixed;
  top: 46px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 10px;
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
.reply-wrapper {
  margin: 150px 0 65px 0;
  .itemWrapper {
    padding: 0 10px;
    margin-bottom: 30px;
    &-question {
      justify-content: flex-end;
    }
    .content {
      margin: 0 10px 0 0;
      padding: 10px;
      border-radius: 10px;
      background-color: #fff;
      max-width: 60%;
      line-height: 1.2rem;
    }
    .content-question {
      background-color: #007aff;
      color: #fff;
    }
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
}
/* 用户操作 */
.userOperate {
  position: fixed;
  bottom: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #f5f6fa;
  padding: 5px 10px;
  .button {
    width: 40%;
    font-size: 14px;
  }
}
/* 评分 */
.rateWindow {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding-bottom: 10px;
  width: 250px;
  border-radius: 10px;
  overflow: hidden;
}
.cover {
  height: 40%;
  width: 100%;
}
.title {
  font-size: 16px;
  margin: 10px;
}
.desc {
  margin-bottom: 5px;
  font-size: 12px;
}
.star {
  margin: 10px;
}
</style>
