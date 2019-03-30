<template>
  <div class="container">
    <van-search placeholder="请输入搜索关键词" v-model="keyword" />
    <SectionListView
      :data="companyList"
      v-show="!keyword"
      @select="selectItem"
    />
    <SectionListView
      :data="searchResult"
      v-show="keyword"
      :searchActive="true"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'
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
    keyword() {
      this.onSearch()
    }
  },
  created() {
    this.fetchCompanyList()
  },
  methods: {
    selectItem(item) {
      this.selectCompany(item)
      this.resetSelectedPerson()
      this.$router.back()
    },
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
    },
    ...mapMutations({
      selectCompany: 'SELECT_CONTACT_COMPANY',
      resetSelectedPerson: 'RESET_SELECT_CONTACT_PERSON'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~common/styles/mixin';
.container {
  @include childRoute;
  background-color: #f5f5f9;
  z-index: 999;
  height: 100%;
  width: 100%;
}
</style>
