<template>
  <div class="goods-mother-warpper">
    <Row class="header-content">
      <Col span="12">
        <h4>宝妈列表 共计: {{totalPrice}}元</h4>
      </Col>
      <Col span="12">
        <Button class="add-good-btn"
                type="primary"
                shape="circle"
                icon="ios-body"
                @click="handleClickAdd">新增
        </Button>
        <Input class="good-search"
               search
               v-model="params.keyword"
               placeholder="输入商品名..."/>
      </Col>
    </Row>
    <div class="list-content">
      <Table :columns="columns" :data="list" :loading="tableLoading"></Table>
      <Page :total="total"
            :page-size="8"
            @on-change="handleChangePage"
            size="small"/>
    </div>
    <div v-if="showAddModal">
      <add-good
        :showAddModal="showAddModal"
        :urlType="urlType"
        @changeAddModal="changeAddModal"></add-good>
    </div>
    <div v-if="showEditModal">
      <edit-good
        :showEditModal="showEditModal"
        :editGood="editGood"
        :urlType="urlType"
        @changeEditModal="changeEditModal"></edit-good>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Watch} from 'vue-property-decorator'
  import TableIcon from '../../components/table_icon/table_icon'
  import {pageSize} from '../../common/application/config'
  import AddGood from '../goods/add_good/add_good'
  import EditGood from '../goods/edit_good/edit_good'

  @Component({
    components: {AddGood, EditGood}
  })
  export default class Goods extends Vue {
    totalPrice: Number = 0
    params: Object = {
      keyword: '',
    }
    showAddModal: Boolean = false
    showEditModal: Boolean = false
    editGood: Object = {}
    urlType: String = 'GoodsMother'
    tableLoading: Boolean = false
    columns: Array = [
      {
        title: '类别',
        sortable: true,
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
        key: 'displayName',
        // width: '160'
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
    total: Number = 0

    created() {
      this._getList()
    }

    async _getList(tableLoading: Boolean = true) {
      this.tableLoading = tableLoading
      try {
        let url = `getGoodsMother`
        let params = Object.assign({}, this.params, {pageSize})
        let response = await this.$get(url, params)
        this.totalPrice = response.data.totalPrice
        this.total = response.data.total
        this.list = this._serializaData(response.data.list)
      } catch (e) {
        console.log(e)
      } finally {
        this.tableLoading = false
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

    changeAddModal(status) {
      this.showAddModal = status
      this._getList()
    }

    changeEditModal(status) {
      this.showEditModal = status
      this._getList()
    }

    handleChangePage(num) {
      this.params.pageNum = num === 0 ? 1 : num
      this._getList()
    }

    handleClickEdit(view) {
      let {count, displayName, price, remark, source, type, uuid} = view
      Object.assign(this.editGood,
        {count, displayName, price, remark, source, type, uuid})
      this.showEditModal = true
    }

    handleClickDelete(uuid) {
      this.$Modal.confirm({
          loading: true,
          title: `提示`,
          content: `<p>确定要删除此商品吗？</p>`,
          onOk: async () => {
            try {
              let url = `deleteGoodMother?uuid=${uuid}`
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
<style type="text/less" lang="less">
  @import "./goods_mother.less";
</style>