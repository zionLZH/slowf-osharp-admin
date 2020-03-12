<template>
  <div id="app" :store-hack="!!$store.state.ModuleData">
    <router-view/>
  </div>
</template>

<style lang="scss">
html,body {
  background-color: #f2f2f2;
}
#app {
  font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  color: #333;
}
</style>
