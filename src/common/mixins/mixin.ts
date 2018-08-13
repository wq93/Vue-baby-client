import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class Mixin extends Vue {
  modalLoading: Boolean = true

  changeLoading() {
    this.modalLoading = false
    console.log(this.modalLoading)
    this.$nextTick(() => {
      this.modalLoading = true
    })
  }
}