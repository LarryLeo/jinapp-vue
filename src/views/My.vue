<template>
  <div>我的</div>
</template>
<script>
export default {
  name: 'My',
  mounted() {
    let userCredential = {
      member_id: 387,
      member_token: '244BA2987F2385B5243C97E6AA7D3AA7'
    }
    localStorage.setItem('userCredential', JSON.stringify(userCredential))
  }
}
</script>
<style lang="scss" scoped></style>
