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
    <div class="demo-spin-container" v-if="loading">
      <Spin fix></Spin>
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
            <div class="left waterfall-described-text">
              <svg class="icon waterfall-described-icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
              </svg>
              <span :title="props.value.uploadedBy"
                    class="text-overflow">{{props.value.uploadedBy}}</span>
            </div>
            <div class="right waterfall-described-text">
              <svg class="icon waterfall-described-icon" aria-hidden="true">
                <use xlink:href="#icon-shijian"></use>
              </svg>
              <span :title="props.value.showUploadTime"
                    class="text-overflow">{{props.value.showUploadTime}}</span>
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
  import {formatDate} from '../../common/application/config'

  @Component({
    components: {
      vueWaterfallEasy, addImage
    }
  })
  export default class UploadImg extends Vue {
    imgList: Array = []
    maxCols: Number = 3
    gap: Number = 50
    showAddModal: Boolean = false
    loading: Boolean = true

    mounted() {
      this._getList()
    }

    async _getList() {
      this.loading = true
      try {
        let url = `getImages`
        let res = await this.$get(url)
        if (res.code === 0) {
          let list = res.data.list
          list.forEach(item => {
            item.showUploadTime = formatDate(new Date(item.uploadedTime), 'yyyy-MM-dd')
          })
          this.imgList = res.data.list
        }
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 1500)
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
        let {uuid} = value
        this.$router.push(`/checnkImg/${uuid}`)
      }
    }
  }
</script>
