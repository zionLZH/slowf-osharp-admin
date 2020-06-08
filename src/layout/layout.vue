<template>
  <slowf-layout class="custom-layout" :layout="layoutOption">
    <my-header slot="header"></my-header>
    <div slot="menu" class="custom-menu">
      <div class="logo">
        Osharp · Slowf
      </div>
      <div class="menu">
        <slowf-menu
          style="width: 220px"
          layout="y"
          :transmit-props="{ backgroundColor: '#20222A', textColor: '#bcbcbe', activeTextColor: '#fff' }"
          :menu-list="MenuOption"
          :getItems="R => R.children || []"
          :getTitle="R => R.meta.title || ''"
          :getIcon="R => R.meta.icon || ''"
          :getIndex="R => R.name"
          :getValid="MenuValidCheck"
          :currentIndex="$route.name"
          @nav="$router.push({ name: $event.name })"></slowf-menu>
      </div>
    </div>
  </slowf-layout>
</template>

<script>
import SlowfLayout from 'slowf/layout/layout'
import layoutOption from 'slowf/layout/layoutOptions/M_H-R-F'
import SlowfMenu from 'slowf/components/menu'
import MenuOption from '../router/menu'
import myHeader from './header'
export default {
  components: { SlowfLayout, SlowfMenu, myHeader },
  data () {
    return {
      layoutOption,
      MenuOption: [],
    }
  },
  async beforeMount () {
    await this.RefreshMenuOption()
  },
  methods: {
    async RefreshMenuOption () {
      let menu = []
      menu = await import('../router/menu')
      menu = menu.default
      this.MenuOption = menu
    },
    MenuValidCheck (item) {
      if (item.children) {
        let count = item.children.length
        for (let sitem of item.children) {
          if (!this.MenuValidCheck(sitem)) {
            count--
          }
        }
        if (count === 0) {
          return false
        }
      }
      if (item.meta && item.meta.hidden) {
        return false
      }
      if (!item.meta || !item.meta.module) {
        return true
      }
      if (this.$rms(item.meta.module)) {
        return true
      } else {
        return false
      }
      return true
    },
  }
}
</script>

<style lang="scss" scoped>
.custom-layout {
  &::v-deep {
    .slowf-layout-route {
      padding: 10px;
    }
  }
}
.custom-menu {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #20222A;
  .logo {
    flex-shrink: 0;
    height: 50px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-bottom: 1px solid #1a1c21;
  }
  .menu {
    flex: 1;
    overflow: auto;
    &::v-deep {
      & > * {
        border-right: 0px !important;
      }
      .el-menu-item.is-active {
        background-color: #008b7d !important;
      }
    }
  }
}
</style>
