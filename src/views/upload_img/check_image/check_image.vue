<template>
  <div class="image-detail">
    <div class="img-detail-header">
      <h4 class="base-title">基本信息</h4>
      <Button class="img-back-btn"
              type="primary"
              shape="circle"
              icon="ios-arrow-back"
              @click="handleClickBack">返回
      </Button>
      <Button class="img-delete-btn"
              type="primary"
              shape="circle"
              icon="ios-close"
              @click="handleClickDelete">删除
      </Button>

    </div>
    <div class="image-detail-base">
      <Row>
        <Col span="8">图片名：{{imgDetail.imageName}}</Col>
        <Col span="8">上传者：{{imgDetail.uploadedBy}}</Col>
        <Col span="8">上传时间：{{imgDetail.uploadedTime}}</Col>
        <Col span="8" v-text="'描述：'+ imgDetail.described"></Col>
      </Row>
    </div>
    <div class="image-detail-content">
      <img :src="imgDetail.imageURL" alt="mgDetail.imageName">
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
  import {formatDate} from '../../../common/application/config'

  @Component
  export default class CheckImage extends Vue {
    @Prop()
    uuid: String
    imgDetail: Object = {
      described: '',
      imageName: '',
      imageURL: '',
      uploadedBy: '',
      uploadedTime: 0,
    }

    mounted() {
      this._getDetail()
    }
    async _getDetail() {
      let url = `getImageDetail`
      let params = {uuid: this.uuid}
      let res = await this.$get(url, params)
      if (res.code === 0) {
        let uploadedTime = res.data.detail.uploadedTime
        uploadedTime = formatDate(new Date(uploadedTime), 'yyyy-MM-dd')
        Object.assign(this.imgDetail, res.data.detail,{uploadedTime})
      }
    }

    handleClickBack() {
      this.$router.push(`/uploadImg`)
    }

    handleClickDelete() {
      let uuid = this.uuid
      this.$Modal.confirm({
        loading: true,
        title: `提示`,
        content: `<p>确定要删除此图文吗？</p>`,
        onOk: () => {
          let url = `deleteImage?uuid=${uuid}`
          this.$delete(url)
            .then(res => {
              if (res.code === 0) {
                this.$Message.success(`删除成功,页面跳转中...!`)
              }
            })
            .finally(() => {
              this.$Modal.remove()
              this.$router.push(`/uploadImg`)
            })
        }
      })
    }
  }
</script>

<style type="text/less" lang="less">
  .image-detail {
    width: 100%;
    .image-detail-content {
      padding: 32px 0;
      img {
        width: 80%;
      }
    }
    .base-title {
      font-size: 18px;
      text-align: left;
    }
    .image-detail-base {
      padding: 12px 22px;
      font-size: 14px;
      line-height: 32px;
      text-align: left;
      border-bottom: 1px solid #cccccc;
    }
    .img-detail-header {
      height: 42px;
      line-height: 42px;
      .base-title {
        float: left;
      }
    }
    .img-delete-btn,
    .img-back-btn {
      float: right;
      margin-right: 18px;
    }
  }
</style>