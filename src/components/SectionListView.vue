<template>
  <scroll
    @scroll="scroll"
    class="listview"
    :data="data"
    ref="listView"
    :click="true"
  >
    <!-- 列表 -->
    <ul>
      <li
        v-for="(group, index) in data"
        :key="index"
        ref="listGroup"
        class="list-group"
      >
        <h2 class="list-group-title">{{ group.region }}</h2>
        <ul>
          <li
            v-for="(item, index) in group.items"
            :key="index"
            class="list-group-item"
            @click="selectItem(item)"
          >
            <span class="name">{{ item.company }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 字母索引表 -->
    <div class="list-shortcut" v-show="!searchActive">
      <ul
        @touchstart.stop.prevent="onShortcutTouchStart"
        @touchmove.stop.prevent="onShortcutTouchMove"
      >
        <li
          class="item"
          :class="{ current: currentAlphabetIndex === index }"
          v-for="(item, index) in shortcutList"
          :key="index"
          :data-index="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- section title吸附 -->
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
  </scroll>
</template>
<script>
import Scroll from './Scroll.vue'

const TITLE_HEIGHT = 30
const ANCHOR_HEIGHT = 18
export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    searchActive: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Scroll
  },
  created() {
    this.touch = {}
    this.listHeight = []
  },
  data() {
    return {
      scrollY: -1,
      currentAlphabetIndex: 0,
      diff: -1
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    onShortcutTouchStart(e) {
      let targetIndex = e.target.getAttribute('data-index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      // 记录当前锚点位
      this.touch.anchorIndex = targetIndex
      this.$refs.listView.scrollToElement(this.$refs.listGroup[targetIndex], 0) // 第二个参数0，代表不需要缓动函数
      // 触发滚动事件，实现点击后对应索引高亮
      this.scrollY = this.$refs.listView.scroll.y
      // this.scrollY = -this.listHeight[targetIndex] 两种方法都可以
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = Math.floor((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT)
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      // 处理anchorIndex的边界限制
      if (anchorIndex > this.listHeight.length - 2) {
        anchorIndex = this.listHeight.length - 2
      } else if (anchorIndex < 0) {
        anchorIndex = 0
      }
      this.$refs.listView.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
    },
    // 计算每个listGroup的高度，将其存入数组，判断滚动距离落在哪个区间就能确定listGroup的index
    calculateListHeight() {
      if (!this.data.length) return
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    scroll(pos) {
      this.scrollY = pos.y
    }
  },
  computed: {
    shortcutList() {
      return this.data.map(group => {
        return group.region
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentAlphabetIndex]
        ? this.data[this.currentAlphabetIndex].region
        : ''
    }
  },
  watch: {
    // data变化的时候计算列表高度，生成高度区间数组
    data() {
      // 处理dom 20ms的渲染时间
      setTimeout(() => {
        this.calculateListHeight()
      }, 20)
    },
    // 监听scrollY的变化，设置字母索引高亮索引
    scrollY(newY) {
      const listHeight = this.listHeight
      // * 注意，当页面向上滑动的时候，scroll监听事件返回的y值是一个负数，而scroll视图默认有一个缓动函数，在下拉的时候y值就是正值，所以在缓动函数生效的时候，得保证字母索引的高亮index是0
      // 当页面滚动到顶部
      if (newY > 0) {
        this.currentAlphabetIndex = 0
        return
      }
      // * 注意，为什么这里要length - 1， 因为比较的参照是一个区间，如果长度不减一，那么最后一个区间就不能确定，因为i+1已经没有数据了。
      // 在中间区列表域滚动
      for (let i = 0; i < this.listHeight.length - 1; i++) {
        let heighCell = listHeight[i]
        let heightFloor = listHeight[i + 1]
        if (-newY >= heighCell && -newY < heightFloor) {
          this.currentAlphabetIndex = i
          // 计算滚动距离与列表高度区间下限的差值，该差值将与section title高度比较，从而确定section title是否隐藏
          this.diff = newY + heightFloor // newY本身是个负值，所以相加
          return
        }
      }
      // * 注意，为什么这里减2，因为首先长度值减1才等于索引，其次我们在设置区间的时候，插入了一个0的起始值
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentAlphabetIndex = listHeight.length - 2
    },
    // 监听滚动距离与每个listGourp高度差值的变化
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        // 这里是为了节流
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~common/styles/rt';
@import '~common/styles/variable';
.listview {
  position: relative;
  width: 100%;
  height: calc(100% - 100px);
  overflow: hidden;
  .list-group {
    padding-bottom: 0px;
  }
  .list-group-title {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    color: #0093ff;
    font-size: $font-size-large;
  }
  .list-group-item {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    .name {
      margin-left: 20px;
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    .item {
      padding: 3px;
      line-height: 1;
    }
    .current {
      color: #0093ff;
    }
  }
  .list-fixed {
    position: absolute;
    top: -2px;
    left: 0;
    width: 100%;
    .fixed-title {
      box-sizing: border-box;
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
      color: #0093ff;
      background-color: #f5f5f9;
      font-size: $font-size-large;
    }
  }
}
</style>
