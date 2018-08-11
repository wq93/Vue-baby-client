<template>
  <Table :columns="columns1" :data="data1"></Table>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {$_get} from '../../common/fetch'

  @Component
  export default class Goods extends Vue {
    columns1 = [
      {
        title: '类别',
        key: 'type'
      },
      {
        title: '名称',
        key: 'displayName'
      },
      {
        title: '数量',
        key: 'count'
      },
      {
        title: '价格',
        key: 'price'
      },
      {
        title: '来源',
        key: 'source'
      },
      {
        title: '备注',
        key: 'remark'
      },
      {
        title: '操作',
      }
    ]
    data1 = []

    created() {
      this.getList()
    }

    async getList() {
      let url = `getGoods`
      try {
        let response = await $_get(url);
        let data = await response.json();
        this.data1 = data.data.list
      } catch (e) {
        console.log("error")
      }
    }
  }
</script>
