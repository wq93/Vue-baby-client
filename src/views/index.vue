<style type="text/less" lang="less">
  @import "../assets/css/reset";

  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: @title-color;
    background: @menu-item-active;
    &:after {
      background: @menu-item-active-after;
    }
  }

  .layout {
    height: 100%;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .ivu-layout {
    height: 100%;
  }

  .header-wrapper {
    background: url("../assets/header-img.jpg");
  }

  .header-text {
    color: #000;
    text-align: left;
    font-size: 22px;
  }


</style>
<template>
  <div class="layout">
    <Layout>
      <Header class="header-wrapper">
        <div class="header-text">Wangqi ❤️ Wangfang' Baby 🤱</div>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu :active-name="activName"
                theme="light"
                width="auto"
                @on-select="handleSelectRoute"
                :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                关于宝宝
              </template>
              <MenuItem name="goods">商品列表</MenuItem>
              <MenuItem name="uploadImg">图文列表</MenuItem>
            </Submenu>
            <!--<Submenu name="2">-->
            <!--<template slot="title">-->
            <!--<Icon type="ios-keypad"></Icon>-->
            <!--Item 2-->
            <!--</template>-->
            <!--<MenuItem name="2-1">Option 1</MenuItem>-->
            <!--<MenuItem name="2-2">Option 2</MenuItem>-->
            <!--</Submenu>-->
            <!--<Submenu name="3">-->
            <!--<template slot="title">-->
            <!--<Icon type="ios-analytics"></Icon>-->
            <!--Item 3-->
            <!--</template>-->
            <!--<MenuItem name="3-1">Option 1</MenuItem>-->
            <!--<MenuItem name="3-2">Option 2</MenuItem>-->
            <!--</Submenu>-->
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {
    Component,
    Prop,
    Watch
  } from 'vue-property-decorator'

  @Component
  export default class Index extends Vue {
    activName: String = ''

    @Watch('$route', {immediate: true})
    onChangRouter(val: any, oldVal: any) {
      this.activName = val.name
    }

    handleSelectRoute(name) {
      this.activName = name
      this.$router.push(`/${name}`)
    }
  }
</script>
