<style type="text/less" lang="less">
  @import "./upload_img.less";
</style>
<template>
  <div class="upload-wrapper">
    <div class="header-content">
      <h4> 图文列表 </h4>
      <Button class="add-upload-btn"
              type="primary"
              shape="circle"
              icon="ios-cloud-upload-outline"
              @click="handleClickAdd">新增
      </Button>
    </div>
    <div class="waterfall-content">
      <vue-waterfall-easy
        srcKey="imageURL"
        :maxCols="maxCols"
        :gap="gap"
        :imgsArr="imgList"
        @click="handleClickImg">
        <template slot-scope="props">
          <div class="waterfall-described">
            <div class="left">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
              </svg>
              {{props.value.uploadedBy}}
            </div>
            <div class="right">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shijian"></use>
              </svg>
              {{props.value.uploadedTime}}
            </div>
          </div>
        </template>
      </vue-waterfall-easy>
    </div>
    <div v-if="showAddModal">
      <add-image
        :showAddModal="showAddModal"
        @changeAddModal="changeAddModal"></add-image>
    </div>
  </div>
</template>

<script lang="ts">

  import Vue from 'vue'
  import {
    Component,
    Prop,
    Watch
  } from 'vue-property-decorator'
  import vueWaterfallEasy from 'vue-waterfall-easy'
  import addImage from './add_image/add_image';

  @Component({
    components: {
      vueWaterfallEasy, addImage
    }
  })
  export default class AddGood extends Vue {
    imgList: Array = []
    maxCols: Number = 3
    gap: Number = 50
    showAddModal: Boolean = false

    mounted() {
      this._getList()
    }

    async _getList() {
      let url = `getImages`
      let res = await this.$get(url)
      if (res.code === 0) {
        this.imgList = res.data.list
      }
    }


    handleClickAdd() {
      this.showAddModal = true
    }

    changeAddModal(status) {
      this.showAddModal = status
      this._getList()
    }

    handleClickImg(event, {index, value}) {
      // 阻止a标签跳转
      event.preventDefault()
      // 只有当点击到图片时才进行操作
      if (event.target.tagName.toLowerCase() == 'img') {
        console.log('img clicked', index, value)
      }
    }
  }
</script>

<style scoped>
  #form {
    width: 40%;
  }
</style>