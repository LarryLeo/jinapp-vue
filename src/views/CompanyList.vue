<template>
  <div class="container">
    <van-search placeholder="请输入搜索关键词" v-model="keyword" />
    <SectionListView :data="companyList" v-show="!keyword" />
    <SectionListView :data="searchResult" v-show="keyword" />
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
      searchResult: [],
      keyword: ''
    }
  },
  watch: {
    keyword(newVal) {
      console.log(newVal)
      this.onSearch()
    }
  },
  created() {
    this.fetchCompanyList()
  },
  methods: {
    onSearch() {
      let companies = JSON.parse(JSON.stringify(this.companyList))
      for (let i = 0; i < companies.length; i++) {
        for (let j = 0; j < companies[i].items.length; j++) {
          if (companies[i].items[j].company.indexOf(this.keyword) > -1) continue // 保留匹配项
          companies[i].items.splice(j--, 1) //删除不匹配项(注意递减，因为删除后数组长度缩短)
        }
        if (!companies[i].items.length) {
          companies.splice(i--, 1) // 如果上面操作导致子数据完全清空，companies也自然要缩减长度
        }
      }
      if (!companies.length) {
        console.log('没有匹配项')
      }
      this.searchResult = companies
    },
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
