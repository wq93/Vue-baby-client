<template>
  <div class="file-content">
    <input
      class="file-input"
      type="file"
      ref="fileInput"
      :name="name"
      :accept="accept"
      @change="_handleChangeFile($event)"
      :style="{ width: boxWidth}">
    <p class="file-normal-tip"
       :style="{ width: boxWidth}"
       :class="isError ? 'errorBorderColor' : '' ">
      <span class="file-name">{{fileName}}</span>
      <svg class="icon pull-right" aria-hidden="true">
        <use xlink:href="#icon--export"></use>
      </svg>
    </p>
    <div class="file-error-tip"
         :class="isError ? 'errorColor' : '' "
         v-if="isError">
      {{this.fileFormat.tip}}
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fileName: '',
        isError: false,
      }
    },
    props: {
      fileFormat: {
        type: Object,
        default: {
          format: ['iw'],
          tip: '支持扩展名iw'
        }
      },
      name: {
        type: String,
        default: 'file'
      },
      boxWidth: {
        type: String,
        default: '400px'
      }
    },
    computed: {
      accept() {
        let fileFormat = []
        this.fileFormat.format.forEach(item => {
          fileFormat.push('.' + item)
        })
        return fileFormat.join(',')
      },
    },
    mounted() {
      this.fileName = this.fileFormat.tip
    },
    methods: {
      _handleChangeFile($event) {
        let file = $event.target.files[0]
        let type = file ? file.name.split('.')[1] : ''
        this.changeState(file, type)
      },
      changeState(file = false, type = false) {
        this.fileName = file ? file.name : this.fileFormat.tip
        if (!file) {
          this.isError = true;
        } else {
          this.isError = file ? !this.fileFormat.format.includes(type) : false
        }
        this.$emit('currentFile', file);
      }
    }
  }
</script>

<style type="text/less" lang="less">
  @import "../../assets/css/reset";

  .file-content {
    position: relative;
    height: 32px;
    .file-input {
      position: relative;
      /*width: 400px;*/
      float: left;
      height: 32px;
      opacity: 0;
      z-index: 20;
    }
    .file-normal-tip {
      position: absolute;
      /*width: 400px;*/
      height: 33px;
      color: #ccc;
      border-radius: 4px;
      border: solid 1px @primary-color;
      top: 0px;
      padding: 0 16px;
      svg {
        margin-top: 10px
      }
      .file-name {
        display: inline-block;
        width: 80%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

    }
    .file-error-tip {
      position: absolute;
      top: 90%;
      left: 12px;
    }
    .errorColor {
      color: @error-color;
    }
    .errorBorderColor {
      border-color: @error-color;
    }
  }
</style>
