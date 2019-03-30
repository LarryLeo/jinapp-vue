<template>
  <div class="container">
    <van-tabs
      color="#0093ff"
      v-model="activeTabIndex"
      @change="fetchChatList"
      sticky
      :offset-top="46"
    >
      <van-tab title="联系企业">
        <div class="input-area-wrapper">
          <div class="item" style="margin-bottom: 10px;">
            <span class="key">联系企业</span>
            <span
              class="value"
              @click="navigateTo('/company-comunication/company-list')"
              >{{ selectedCompany.company }}</span
            >
          </div>
          <div class="item" style="margin-bottom: 10px;">
            <span class="key">联系人</span>
            <span
              class="value"
              @click="navigateTo('/company-comunication/person-list')"
              >{{ selectedPerson.realname }}</span
            >
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
        <!-- 上传图片 -->
        <div class="imgUpload">
          <div
            class="displayImgWrapper"
            v-for="(item, index) in displayImages"
            :key="index"
          >
            <img class="displayImg" :src="item" alt="img" />
            <van-icon name="clear" class="close" @click="removeImage(index)" />
          </div>
          <van-uploader
            style="padding: 10px;"
            :after-read="onRead"
            accept="image/gif, image/jpeg"
            multiple
          >
            <van-icon name="photograph" size="26px" />
          </van-uploader>
        </div>
        <div class="submit-btn">
          <van-button type="info" size="large">提交</van-button>
        </div>
      </van-tab>
      <!-- 消息列表 -->
      <van-tab title="消息列表">
        <van-list
          class="chatList-wrapper"
          finished-text="没有更多数据"
          :finished="noMore"
        >
          <div
            class="chatListItem"
            v-for="(item, index) in chatList"
            :key="index"
          >
            <img :src="item.member.head_img" alt="" class="memberAvatar" />
            <div class="messageContent">
              <div class="userInfo">
                <p class="companyName">
                  {{ item.company ? item.company.company : '未知' }}
                </p>
                <span class="memberName">
                  {{ item.member.realname || '未知' }}
                </span>
              </div>
              <p class="lastMessage">{{ item.last_message_summary }}</p>
            </div>
            <span class="time">
              {{ formatDate(item.last_message_at) }}
            </span>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Icon, Uploader, Toast, Tabs, Tab, List, Button } from 'vant'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { requestGet } from '../utils/index'

const reader = new FileReader()
Vue.use(Icon)
  .use(Uploader)
  .use(Tabs)
  .use(Tab)
  .use(List)
  .use(Button)
  .use(Icon)
export default {
  name: 'CompanyComunication',
  data() {
    return {
      activeTabIndex: 0,
      content: '',
      pn: 1,
      ps: 10,
      loading: false,
      noMore: false,
      chatList: [],
      selectedImages: [],
      displayImages: []
    }
  },
  computed: {
    ...mapState(['selectedPerson', 'selectedCompany'])
  },
  methods: {
    formatDate(date) {
      return moment(date)
        .locale('zh-cn')
        .fromNow()
    },
    async fetchChatList(index) {
      if (index === 0) return
      if (this.noMore || this.loading) return console.log('没有更多数据了')
      let userCredential = JSON.parse(localStorage.getItem('userCredential'))
      let res = await requestGet('/app/v1/chat/myChatList', {
        ...userCredential,
        pn: this.pn,
        ps: this.ps
      })
      let list = res.list
      this.chatList = [...this.chatList, ...list]
      this.pn = list.length < this.ps ? this.pn : ++this.pn
      this.noMore = list.length < this.ps
    },
    navigateTo(path) {
      if (
        path === '/company-comunication/person-list' &&
        this.selectedCompany.id === -1
      ) {
        return Toast('未选择联系企业')
      }
      this.$router.push({
        path
      })
    },
    onRead(payloadFiles) {
      let files = []
      if (Object.prototype.toString.call(payloadFiles) === '[object Object]') {
        files.push(payloadFiles)
      } else {
        files = [...files, ...payloadFiles]
      }
      console.log(files)
      if (this.displayImages.length === 4 || files.length > 4)
        return Toast('最多上传4张图片')
      let displayImages = []
      let fileIndex = 0
      if (!files.length) return
      reader.readAsDataURL(files[fileIndex].file)
      reader.onloadend = () => {
        displayImages.push(reader.result)
        fileIndex++
        if (fileIndex < files.length) {
          reader.readAsDataURL(files[fileIndex].file)
        } else {
          console.log('全部终了')
          this.selectedImages = [...this.selectedImages, ...files]
          this.displayImages = [...this.displayImages, ...displayImages]
        }
      }
    },
    removeImage(index) {
      this.selectedImages = [
        ...this.selectedImages.slice(0, index),
        ...this.selectedImages.slice(index + 1)
      ]
      this.displayImages = [
        ...this.displayImages.slice(0, index),
        ...this.displayImages.slice(index + 1)
      ]
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
  p {
    margin: 0;
    padding: 0;
  }
}
.input-area-wrapper {
  margin-top: 10px;
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
.submit-btn {
  padding: 0 10px;
}
/* 上传图片 */
.imgUpload {
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  flex-wrap: wrap;
  .icon {
    padding: 15px;
    border: 1px solid #d1d1d1;
  }
}
/* 上传图片区样式 */
.displayImgWrapper {
  position: relative;
  margin-right: 12px;
  width: 58px;
  height: 58px;
  box-sizing: border-box;
  background-color: #fff;
  .displayImg {
    width: 100%;
    height: 100%;
  }
  .close {
    position: absolute;
    right: -8px;
    top: -8px;
  }
}
/* 聊天列表 */
.chatList-wrapper {
  margin-top: 10px;
  color: #888;
}
.chatListItem {
  display: flex;
  align-items: center;
  padding: 15px 10px;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.memberAvatar {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
}
.time {
  margin-left: 10;
  font-size: 14px;
}
.messageContent {
  flex: 1;
  .userInfo {
    display: flex;
    align-items: baseline;
  }
  .companyName {
    margin-right: 5px;
    max-width: 150px;
    font-weight: bold;
    font-size: 16px;
    color: #000;
  }
  .memberName {
    font-size: 12px;
  }
  .lastMessage {
    margin-top: 15px;
  }
}
</style>
