<template>
  <div class="goods-warpper">
    <Button type="primary" shape="circle" @click="handleClickAdd">新增</Button>
    <Table :columns="columns1" :data="data1"></Table>
    <div v-if="showAddModal">
      <add-good
        :showAddModal="showAddModal"
        @changeAddModal="changeAddModal"></add-good>
    </div>

  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import AddGood from './add_good/add_good'

  @Component({
    components: {
      AddGood
    }
  })
  export default class Goods extends Vue {
    columns1: Array = [
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
        render: (h, params) => {
          let {count, displayName, price, remark, source, type, uuid} = params.row
          return h('div', [
            h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              on: {
                'click': () => {
                  console.log(count, displayName, price, remark, source, type, uuid)
                }
              }
            }, '编辑')
          ])
        }
      }
    ]
    data1: Array = []
    showAddModal: Boolean = false

    created() {
      this.getList()
    }

    async getList() {
      try {
        let url = `getGoods`
        let response = await this.$get(url)
        this.data1 = response.data.list
      } catch (e) {
        console.log(e)
      }
    }

    handleClickAdd() {
      this.showAddModal = true
    }

    changeAddModal(status) {
      this.showAddModal = status
    }
  }
</script>
