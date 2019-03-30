<template>
  <div class="container">
    <van-search placeholder="请输入搜索关键词" v-model="keyword" />
    <SectionListView :data="companyList" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Search } from 'vant'
import { requestGet } from '../utils/index'
import SectionListView from '../components/SectionListView.vue'

Vue.use(Search)
export default {
  name: 'CompanyList',
  components: {
    SectionListView
  },
  data() {
    return {
      companyList: [],
      keyword: ''
    }
  },
  created() {
    this.fetchCompanyList()
  },
  methods: {
    async fetchCompanyList() {
      let userCredential = JSON.parse(localStorage.getItem('userCredential'))
      let res = await requestGet('/app/v1/company/allList', {
        ...userCredential
      })
      this.companyList = res.list
    }
  }
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
