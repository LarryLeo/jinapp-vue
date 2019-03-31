<template>
  <div class="container">
    <div class="chatList">
      <div
        class="itemWrapper itemWrapper-receive"
        :class="{ 'itemWrapper-send': item.direction === 'send' }"
        v-for="(item, index) in chatDetail"
        :key="index"
      >
        <img
          class="avatar"
          src="http://img.ecyss.com/character/201704/b042bcea67ec4bcf8a8939d3422df0ec.jpg"
          alt=""
          style="margin-right: 10px;"
          v-if="item.direction === 'receive'"
        />
        <div
          class="contentWrapper content-receive"
          :class="{ 'content-send': item.direction === 'send' }"
        >
          <p class="chatContent">{{ item.content }}</p>
          <!-- 聊天图片 -->
          <div class="chatImgWrapper">
            <img
              :src="img"
              alt=""
              v-for="(img, index) in item.imgs"
              :key="index"
              class="chatImage"
              @click="previewImage(img)"
            />
          </div>
        </div>
        <img
          class="avatar"
          src="http://img.ecyss.com/character/201704/b042bcea67ec4bcf8a8939d3422df0ec.jpg"
          alt=""
          v-if="item.direction === 'send'"
        />
      </div>
    </div>
    <div class="replybar">
      <van-uploader
        style="padding: 10px;"
        :after-read="onRead"
        accept="image/gif, image/jpeg"
        multiple
      >
        <van-icon name="photograph" size="26px" />
      </van-uploader>
      <input class="input" type="text" placeholder="回复..." />
      <div class="button">
        <van-button type="info" size="small">发送</van-button>
      </div>
    </div>
    <!-- 上传图片预览 -->
    <div class="uploadImagePreview" v-show="displayImages.length">
      <div
        class="uploadImgWrapper"
        v-for="(item, index) in displayImages"
        :key="index"
      >
        <img :src="item" alt="previewImage" />
        <van-icon name="clear" class="close" @click="removeImage(index)" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { List, Icon, Button, Uploader, ImagePreview, Toast } from 'vant'
import { requestGet } from '../utils/index'

Vue.use(List)
  .use(Icon)
  .use(Button)
  .use(Uploader)
  .use(ImagePreview)
  .use(Toast)
const reader = new FileReader()
export default {
  name: 'ChatDetail',
  data() {
    return {
      chatDetail: [],
      loading: false,
      noMore: false,
      pn: 1,
      ps: 10,
      selectedImages: [],
      displayImages: []
    }
  },
  created() {
    this.fetchChatDetail()
  },
  methods: {
    previewImage(img) {
      ImagePreview([img])
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
    },
    onRead(payloadFiles) {
      let files = []
      if (Object.prototype.toString.call(payloadFiles) === '[object Object]') {
        files.push(payloadFiles)
      } else {
        files = [...files, ...payloadFiles]
      }
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
    async fetchChatDetail() {
      if (this.loading || this.noMore) return console.log('没有更多或加载中')
      const {
        query: { chat_id }
      } = this.$route
      let userCredential = JSON.parse(localStorage.getItem('userCredential'))
      let res = await requestGet('/app/v1/chat/messageList', {
        ...userCredential,
        pn: this.pn,
        ps: this.ps,
        chat_id
      })
      // 筛选所需的chatDetail数据
      let chatDetailRaw = res.list
      let chatDetailMap = chatDetailRaw.map(item => ({
        head_img: item.member.head_img,
        imgs: item.imgs,
        content: item.content,
        direction: item.direction
      }))
      let combinedData = [...chatDetailMap.reverse(), ...this.chatDetail]
      this.chatDetail = combinedData
      this.pn = res.list.length >= this.ps ? ++this.pn : this.pn
      this.noMore = res.list.length < this.ps
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/styles/mixin';
.container {
  @include childRoute;
  height: calc(100% - 46px);
  z-index: 999;
  p {
    margin: 0;
  }
}
.chatList {
  margin-bottom: 70px;
  background-color: #f5f6fa;
  position: relative;
  .am-list-body {
    background-color: #f5f6fa;
  }
  .itemWrapper {
    display: flex;
    padding: 0 10px;
    margin-bottom: 30px;
    &-send {
      justify-content: flex-end;
    }
    .contentWrapper {
      margin-right: 10px;
      padding: 10px;
      border-radius: 10px;
      background-color: #fff;
      max-width: 75%;
      line-height: 1.2rem;
    }
    .content-send {
      background-color: #007aff;
      color: #fff;
    }
  }
  .chatImage {
    width: 100px;
    height: 100px;
    margin-top: 5px;
    margin-right: 5px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
  .am-list-body {
    border: none;
    padding-bottom: 60px;
    &::after {
      display: none;
    }
  }
}
/* 回复区 */
.replybar {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  padding: 10px;
  box-shadow: 0px -1px 2px 1px #bfb9b966;
  box-sizing: border-box;
  background-color: #eeeeee;
  align-items: center;
  .input {
    flex: 1;
    border: none;
    height: 30px;
    padding: 0 5px;
    margin: 0 10px;
  }
}
/* 上传图片预览 */
.uploadImagePreview {
  position: fixed;
  bottom: 55px;
  display: flex;
  background-color: #007aff8c;
  padding: 5px;
  border-radius: 10px;
  .uploadImgWrapper {
    position: relative;
    padding: 5px;
    width: 60px;
    height: 60px;
    img {
      width: 100%;
      height: 100%;
    }
    .close {
      position: absolute;
      right: -6px;
      top: -6px;
    }
  }
}
</style>
