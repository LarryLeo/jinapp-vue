<template>
  <div class="container">
    <div class="to-history">
      <span v-if="currentPageName === 'suggest'" @click="goToHistory"
        >意见历史</span
      >
      <span v-if="currentPageName === 'consult'" @click="goToHistory"
        >咨询历史</span
      >
    </div>
    <div class="input-area-wrapper">
      <div class="item" style="margin-bottom: 10px;">
        <span class="key"
          >{{ currentPageName === 'suggest' ? '意见' : '咨询' }}对象</span
        >
        <span class="value" @click="toggleUnitPicker">{{ selectedUnit }}</span>
      </div>
      <div
        class="item"
        style="margin-bottom: 10px;"
        v-if="currentPageName === 'consult'"
      >
        <span class="key">咨询事项</span>
        <span class="value" @click="toggleTopicPicker">{{
          selectedTopic
        }}</span>
      </div>
      <div class="item">
        <span class="key"
          >{{ currentPageName === 'suggest' ? '意见' : '咨询' }}主题</span
        >
        <input
          type="text"
          maxlength="20"
          placeholder="请输入主题"
          v-model="title"
        />
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
    <div class="submit-btn">
      <van-button type="info" size="large" @click="submit">提交</van-button>
    </div>
    <van-actionsheet v-model="showUnitPicker">
      <van-picker
        :columns="unitListforPicker"
        title="单位名称"
        show-toolbar
        @confirm="confirmUnit"
        @cancel="toggleUnitPicker"
      />
    </van-actionsheet>
    <van-actionsheet
      v-model="showTopicePicker"
      v-if="currentPageName === 'consult'"
    >
      <van-picker
        :columns="topticListforPicker"
        title="咨询事项"
        show-toolbar
        @confirm="confirmTopic"
        @cancel="toggleTopicPicker"
      />
    </van-actionsheet>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Actionsheet, Picker, Toast } from 'vant'
import { requestGet, requestPost } from '../utils/index'
Vue.use(Button)
  .use(Actionsheet)
  .use(Picker)
  .use(Toast)
const defaultPickedUnit = '请选择单位名称'
const defaultPickedTopic = '请选择咨询事项'
export default {
  name: 'MakeCenter',
  data() {
    return {
      currentPageName: '',
      showUnitPicker: false,
      showTopicePicker: false,
      unitList: [],
      topticList: [],
      selectedUnit: defaultPickedUnit,
      selectedTopic: defaultPickedTopic,
      selectedUnitIndex: 0,
      selectedTopicIndex: 0,
      title: '',
      content: ''
    }
  },
  computed: {
    unitListforPicker() {
      // map一个空数组 即使访问不存在的对象属性 也返回空数组
      return this.unitList.map(item => item.unit_name)
    },
    topticListforPicker() {
      return this.topticList.map(item => item.subject_name)
    },
    selectedUnitId() {
      return this.unitList[this.selectedUnitIndex].id
    },
    selectedTopicId() {
      return this.topticList[this.selectedTopicIndex].id
    }
  },
  created() {
    const {
      params: { type }
    } = this.$route
    this.currentPageName = type
    this.fetchUnitList()
  },
  methods: {
    async fetchUnitList() {
      let res = await requestGet('/app/v1/index/getUnitList')
      if (res.success) {
        this.unitList = res.data.list
      }
    },
    async fetchTopicList() {
      let userCredential = JSON.parse(localStorage.getItem('userCredential'))
      let res = await requestGet('/app/v1/consult/getConsultSubjectList', {
        ...userCredential,
        unit_id: this.selectedUnitId
      })
      if (res.success) {
        this.topticList = res.data.list
      }
    },
    toggleUnitPicker() {
      if (!this.unitList.length) return
      this.showUnitPicker = !this.showUnitPicker
    },
    toggleTopicPicker() {
      if (this.selectedUnit === defaultPickedUnit) return Toast('请先选择单位')
      this.showTopicePicker = !this.showTopicePicker
    },
    confirmUnit(value, index) {
      this.selectedUnit = value
      this.selectedUnitIndex = index
      this.toggleUnitPicker()
      this.fetchTopicList()
    },
    confirmTopic(value, index) {
      this.selectedTopic = value
      this.selectedTopicIndex = index
      this.toggleTopicPicker()
    },
    async submit() {
      if (!this.title) return Toast('请输入主题')
      if (!this.content) return Toast('请输入内容')
      if (this.selectedUnit === defaultPickedUnit) return Toast('请选择单位')
      if (
        this.selectedTopic === defaultPickedTopic &&
        this.currentPageName === 'consult'
      )
        return Toast('请选择咨询事项')
      let userCredential = JSON.parse(localStorage.getItem('userCredential'))
      let apiUrl =
        this.currentPageName === 'suggest'
          ? '/app/v1/suggestion/addSuggestion'
          : '/app/v1/consult/addConsult'
      let commonData = {
        title: this.title,
        content: this.content,
        unit_id: this.selectedUnitId,
        ...userCredential
      }
      let finalData =
        this.currentPageName === 'suggest'
          ? { ...commonData }
          : { ...commonData, consult_subject_id: this.selectedTopicId }
      let res = await requestPost(apiUrl, {
        ...finalData
      })
      if (res.success) {
        Toast.success('提交成功')
        this.selectedUnit = defaultPickedUnit
        this.selectedTopic = defaultPickedTopic
        this.title = ''
        this.content = ''
        setTimeout(() => {
          this.$router.back()
        }, 1500)
      } else {
        Toast.fail('提交失败')
      }
    },
    goToHistory() {
      this.$router.push({
        path: `${this.currentPageName}/history`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/styles/mixin';
.container {
  @include childRoute;
  input,
  textarea {
    padding: 0;
    border: none;
  }
}
.to-history {
  padding: 10px;
  text-align: right;
  span {
    font-size: 14px;
    color: #8f8f94;
  }
}
.input-area-wrapper {
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
    border-top: 1px solid #d1d1d1;
  }
}
.submit-btn {
  margin-top: 20px;
  padding: 0 10px;
}
</style>
