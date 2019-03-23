<template>
  <div class="home">
    <van-swipe>
      <van-swipe-item
        v-for="(slide, index) in slides"
        :key="index"
        class="slide-wrapper"
      >
        <img :src="slide" alt="" class="slide" />
      </van-swipe-item>
    </van-swipe>
    <section class="menu-entry">
      <div class="item">
        <img src="../assets/icons/policy.png" alt="" class="icon" />
        <span class="title">政策宣传</span>
      </div>
      <div class="item">
        <img src="../assets/icons/guide.png" alt="" class="icon" />
        <span class="title">办事指南</span>
      </div>
      <div class="item">
        <img src="../assets/icons/suggestion.png" alt="" class="icon" />
        <span class="title">意见建议</span>
      </div>
      <div class="item">
        <img src="../assets/icons/consult.png" alt="" class="icon" />
        <span class="title">政务咨询</span>
      </div>
      <div class="item">
        <img src="../assets/icons/chat.png" alt="" class="icon" />
        <span class="title">警企互联</span>
      </div>
    </section>
    <div class="consult-info">
      <div class="top">
        <span class="num">152人</span>
        <span class="jump-to-consult">立即咨询</span>
      </div>
      <span class="text">已在警企e通咨询</span>
    </div>
    <div class="weather">
      <p class="num">11℃ ~ 15℃</p>
      <p class="text">今日天气：小雨</p>
    </div>
    <router-view class="route-view"> </router-view>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
import Vue from 'vue'
import { requestGet } from '../utils/index'

import sliderImage from '../assets/images/slider.jpg'

Vue.use(Swipe).use(SwipeItem)
// import axios from 'axios'
export default {
  name: 'HomePage',
  data() {
    return {
      slides: [sliderImage, sliderImage, sliderImage]
    }
  },
  created() {
    this.fetchConsultNum()
    this.fetchWeather
  },
  mounted() {},
  methods: {
    async fetchConsultNum() {
      let res = await requestGet('/app/v1/index/getIndexView')
      console.log(res)
    },
    fetchWeather() {},
    navigate() {
      this.$router.push({
        path: 'guide/我的传输',
        query: {
          post_id: 12
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/styles/variable';
.home {
  box-sizing: border-box;
  padding: 10px 10px 80px 10px;
  overflow: auto;
}
.route-view {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: slateblue;
}
.slide-wrapper {
  border-radius: 10px;
  overflow: hidden;
  .slide {
    width: 100%;
    height: 100%;
  }
}
.menu-entry {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  font-size: $font-size-medium-x;
  font-weight: bold;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    height: 78px;
    line-height: 78px;
    width: 48%;
    color: #fff;
    border-radius: 8px;
    background-color: $theme-color;
    &:nth-child(2) {
      background-color: rgb(255, 168, 0);
    }
    &:nth-child(3) {
      background-color: rgb(255, 85, 85);
    }
    &:nth-child(4) {
      background-color: rgb(0, 201, 219);
    }
    &:nth-child(5) {
      background-color: rgb(0, 122, 255);
    }
    &:nth-child(2n + 1) {
      margin-right: 4%;
    }
  }
  .icon {
    width: 23px;
    height: 29px;
    margin-right: 10px;
  }
}
.consult-info {
  margin: 20px 0 10px 0;
  padding: 20px;
  padding-bottom: 26.2%;
  height: 0;
  background-color: rgb(0, 122, 255);
  border-radius: 8px;
  color: #fff;
  .top {
    display: flex;
    justify-content: space-between;
  }
  .text {
    display: block;
    margin-top: 20px;
    color: rgb(158, 213, 255);
  }
}
.weather {
  padding: 20px;
  padding-bottom: 30.4%;
  border-radius: 8px;
  color: #fff;
  background: url('../assets/images/weather.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  height: 0;
  .num {
    font-size: $font-size-large-x;
    font-weight: bold;
  }
  .text {
    margin-top: 20px;
  }
}
</style>
