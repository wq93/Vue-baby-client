<template>
  <div>
    <Form :label-width="130"
          id="form">
      <FormItem label="图片：" class="dib">
        <file-input @currentFile="currentFile"
                    :fileFormat="fileFormat"
                    :name="fileName"
                    ref="fileinput"></file-input>
      </FormItem>
      <FormItem label="上传者: ">
        <Input v-model="uploadedBy"></Input>
      </FormItem>
      <FormItem label="上传时间: ">
        <DatePicker type="date"
                    format="yyyy-MM-dd"
                    placeholder="请选择上传日期"
                    :options="dateOptions"
                    @on-change="handleChangeDate"></DatePicker>
      </FormItem>
      <FormItem label="描述: ">
        <Input v-model="described" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="Enter something..."></Input>
      </FormItem>
      <Button type="primary"
              @click="uploadFile"
              :loading="loading">
        <span v-if="!loading">上传</span>
        <span v-else>Loading...</span>
      </Button>
    </Form>
    <!--<ul>-->
    <!--<li v-for="item in imgList" style="display: inline-block">-->
    <!--<div>-->
    <!--<p>{{item.imageName}} - {{item.uploadedTime}}</p>-->
    <!--<img :src="item.imageURL" :alt="item.imageName" width=200-->
    <!--@click="handleClickImage">-->
    <!--</div>-->
    <!--</li>-->
    <!--</ul>-->
  </div>
</template>

<script lang="ts">
  import fileInput from '../../components/fileInput';
  import Vue from 'vue'
  import {
    Component,
    Prop,
    Watch
  } from 'vue-property-decorator'

  @Component({
    components: {fileInput}
  })
  export default class AddGood extends Vue {
    imgList: Array = []
    fileFormat: Object = {
      format: ['jpg', 'png'],
      tip: '支持扩展名.jpg .png'
    }
    formItem: Object = {
      uploadFile: "",
    }
    fileName: String = 'file'
    loading: Boolean = false
    uploadedBy: String = ''
    described: String = ''
    uploadedTime: Number = new Date().getTime()
    dateOptions: Object = {
      disabledDate(date) {
        return date && date.valueOf() > Date.now()
      }
    }
    imgsArr: Array = []

    mounted() {
      this._getList()
    }

    async _getList() {
      let url = `getImages`
      let res = await this.$get(url)
      if (res.code === 0) {
        this.imgsArr = res.data.list
      }
    }

    handleClickImage(e) {
      console.log(e.target.src)
    }

    _serializaFormData(id) {
      let formData = new FormData(document.getElementById(id));
      formData.append('uploadedBy', this.uploadedBy)
      formData.append('uploadedTime', this.uploadedTime)
      formData.append('described', this.described)
      return formData
    }

    async uploadFile() {
      this.loading = true
      let formData = this._serializaFormData('form')
      let url = `uploadImg`
      try {
        let res = await this.$uploadFile(url, formData)
        if (res.code === 0) {
          this._getList()
          this.$Message.success(`上传成功!`)
        }
      } finally {
        this.loading = false
      }
    }

    currentFile(file) {
      this.formItem.uploadFile = file;
    }

    handleChangeDate(val) {
      this.uploadedTime = new Date(val).getTime()
    }
  }
</script>

<style scoped>
  #form {
    width: 40%;
  }
</style>