<style type="text/less" lang="less">
  @import "./goods.less";
</style>
<template>
  <div class="goods-warpper">
    <div class="header-content">
      <h4> Baby preparation </h4>
      <Button class="add-good-btn"
              type="primary"
              shape="circle"
              icon="ios-body"
              @click="handleClickAdd">新增
      </Button>
    </div>
    <Table :columns="columns" :data="list"></Table>
    <div v-if="showAddModal">
      <add-good
        :showAddModal="showAddModal"
        @changeAddModal="changeAddModal"></add-good>
    </div>
    <div v-if="showEditModal">
      <edit-good
        :showEditModal="showEditModal"
        :editGood="editGood"
        @changeEditModal="changeEditModal"></edit-good>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator'
  import AddGood from './add_good/add_good'
  import EditGood from './edit_good/edit_good'
  import TableIcon from '../../components/table_icon/table_icon'

  @Component({
    components: {
      AddGood, EditGood
    }
  })
  export default class Goods extends Vue {
    showAddModal: Boolean = false

    showEditModal: Boolean = false

    editGood: Object = {}

    columns: Array = [
      {
        title: '类别',
        render: (h, params) => {
          let {showType} = params.row
          return h('div', [
            h(TableIcon, {
              props: {
                params: {
                  iconKey: 'type',
                  iconValue: params.row.type,
                }
              }
            }),
            h('span', {
              style: {
                marginLeft: '12px'
              }
            }, showType),
          ]);
        }
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
        render: (h, params) => {
          let {showSource} = params.row
          return h('div', [
            h(TableIcon, {
              props: {
                params: {
                  iconKey: 'source',
                  iconValue: params.row.source,
                },

              }
            }),
            h('span', {
              style: {
                marginLeft: '12px'
              }
            }, showSource),
          ]);
        }
      },
      {
        title: '备注(品牌)',
        key: 'remark'
      },
      {
        title: '操作',
        className: 'good-operate-btn',
        render: (h, params) => {
          let {uuid} = params.row
          return h('div', [
            h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              on: {
                'click': () => {
                  this.handleClickEdit(params.row)
                }
              }
            }, '编辑'),
            h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              on: {
                'click': () => {
                  this.handleClickDelete(uuid)
                }
              }
            }, '删除')
          ])
        }
      }
    ]
    list: Array = []


    created() {
      this._getList()
    }

    async _getList() {
      try {
        let url = `getGoods`
        let response = await this.$get(url)
        this.list = this._serializaData(response.data.list)
      } catch (e) {
        console.log(e)
      }
    }

    _serializaData(list) {
      list.forEach(value => {
        let {type, source} = value

        let _serializaType = type => {
          switch (type) {
            case '1':
              showType = '日常'
              break
            case '2':
              showType = '洗浴'
              break
            case '3':
              showType = '出行'
              break
          }
          return showType
        }
        let _serializaSource = source => {
          let showSource = '其他'
          switch (source) {
            case '1':
              showSource = '京东'
              break
            case '2':
              showSource = '淘宝'
              break
            case '3':
              showSource = '其他'
              break
          }
          return showSource
        }
        let showSource = _serializaSource(source)
        let showType = _serializaType(type)
        Object.assign(value, {
          showType,
          showSource
        })
      })
      return list
    }

    handleClickAdd() {
      this.showAddModal = true
    }

    handleClickEdit(view) {
      let {count, displayName, price, remark, source, type, uuid} = view
      Object.assign(this.editGood,
        {count, displayName, price, remark, source, type, uuid})
      this.showEditModal = true
    }

    changeAddModal(status) {
      this.showAddModal = status
      this._getList()
    }

    changeEditModal(status) {
      this.showEditModal = status
      this._getList()
    }

    handleClickDelete(uuid) {
      this.$Modal.confirm({
          loading: true,
          title: `提示`,
          content: `<p>确定要删除此商品吗？</p>`,
          onOk: async () => {
            try {
              let url = `deleteGood?uuid=${uuid}`
              let res = await this.$delete(url)
              if (res.code === 0) {
                this.$Message.success(`删除成功!`)
              }
            } finally {
              this.$Modal.remove()
              this._getList()
            }
          }
        }
      )
    }
  }
</script>
