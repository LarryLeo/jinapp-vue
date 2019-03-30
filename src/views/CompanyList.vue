<template>
  <div class="container">
    <SectionListView :data="companyList" />
  </div>
</template>

<script>
import { requestGet } from '../utils/index'
import SectionListView from '../components/SectionListView.vue'
export default {
  name: 'CompanyList',
  components: {
    SectionListView
  },
  data() {
    return {
      companyList: []
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
  height: calc(100% - 46px);
  width: 100%;
}
</style>
