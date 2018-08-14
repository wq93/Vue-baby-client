<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop} from 'vue-property-decorator'

  @Component
  export default class TableIcon extends Vue {
    iconObj = {
      'type': {
        '1': '#icon-richang',
        '2': '#icon-xiyu',
        '3': '#icon-wanjuche'
      },
      'source': {
        '1': '#icon-jingdong-',
        '2': '#icon-tianmao',
        '3': '#icon-gouwu'
      },
    }
    @Prop()
    params: Object

    //computed 属性
    get iconName() {
      return this.iconObj[this.params.iconKey][this.params.iconValue]
    }
  }
</script>

<style scoped>

</style>