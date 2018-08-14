<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style type="text/less" lang="less">
  @import "assets/css/reset.less";
  @import "assets/css/base.less";



  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
