<template>
  <Modal
    class="add-image-modal"
    v-model="modalShow"
    title="添加商品"
    :loading="modalLoading"
    @on-ok="ok"
    @on-cancel="cancel">
    <Form :label-width="70"
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
                    class="upload-date-picker"
                    format="yyyy-MM-dd"
                    placeholder="请选择上传日期"
                    :options="dateOptions"
                    @on-change="handleChangeDate"></DatePicker>
      </FormItem>
      <FormItem label="描述: ">
        <Input v-model="described" type="textarea" :autosize="{minRows: 6,maxRows: 5}"
               placeholder="Enter something..."></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {
    Component,
    Prop,
    Watch
  } from 'vue-property-decorator'
  import Mixin from '../../../common/mixins/mixin'
  import fileInput from '../../../components/fileInput';

  @Component({
    mixins: [Mixin],
    components: {
      fileInput
    }
  })
  export default class AddGood extends Vue {
    @Prop()
    showAddModal: Boolean

    @Watch('showAddModal', {immediate: true, deep: true})
    onChangAddModal(val: any, oldVal: any) {
      this.modalShow = val
    }

    fileFormat: Object = {
      format: ['jpg', 'JPG', 'png'],
      tip: '支持上传图片'
    }
    formItem: Object = {
      uploadFile: "",
    }
    fileName: String = 'file'
    uploadedBy: String = ''
    described: String = ''
    uploadedTime: Number = new Date().getTime()
    dateOptions: Object = {
      disabledDate(date) {
        return date && date.valueOf() > Date.now()
      }
    }


    _serializaFormData(id) {
      let formData = new FormData(document.getElementById(id));
      formData.append('uploadedBy', this.uploadedBy)
      formData.append('uploadedTime', this.uploadedTime)
      formData.append('described', this.described)
      return formData
    }

    currentFile(file) {
      this.formItem.uploadFile = file;
    }

    handleChangeDate(val) {
      this.uploadedTime = new Date(val).getTime()
    }

    async ok() {
      this.loading = true
      let formData = this._serializaFormData('form')
      let url = `uploadImg`
      try {
        let res = await this.$uploadFile(url, formData)
        if (res.code === 0) {
          this.$Message.success(`上传成功!`)
          this.$emit('changeAddModal', false)
        }
      } finally {
        this.loading = false
      }
    }

    cancel() {
      this.$emit('changeAddModal', false)
    }
  }
</script>

<style scoped>

</style>