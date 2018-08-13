import Vue from 'vue'
import {Component} from 'vue-property-decorator'

@Component
export default class Mixin extends Vue {
  modalLoading: Boolean = true

  changeLoading() {
    this.modalLoading = false
    this.$nextTick(() => {
      this.modalLoading = true
    });
  }
}