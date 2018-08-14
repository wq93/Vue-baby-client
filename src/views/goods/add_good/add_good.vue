<template>
  <Modal
    v-model="modalShow"
    title="添加商品"
    :loading="modalLoading"
    @on-ok="ok"
    @on-cancel="cancel">
    <Form ref="formCustom" :model="formCustom" :label-width="80">
      <FormItem label="名称:" prop="">
        <Input type="text" v-model="formCustom.displayName" placeholder="输入名称..."></Input>
      </FormItem>
      <FormItem label="数量:" prop="">
        <Input type="text" v-model="formCustom.count" placeholder="输入数量..."></Input>
      </FormItem>
      <FormItem label="价格:" prop="">
        <Input type="text" v-model="formCustom.price" placeholder="输入价格..."></Input>
      </FormItem>
      <FormItem label="类别:" prop="">
        <Select v-model="formCustom.type">
          <Option value="1">日常</Option>
          <Option value="2">洗浴</Option>
          <Option value="3">出行</Option>
        </Select>
      </FormItem>
      <FormItem label="来源:" prop="">
        <Select v-model="formCustom.source">
          <Option value="1">京东</Option>
          <Option value="2">淘宝</Option>
          <Option value="3">其他</Option>
        </Select>
      </FormItem>
      <FormItem label="备注(品牌):" prop="">
        <Input v-model="formCustom.remark"
               type="textarea"
               :autosize="{minRows: 2,maxRows: 5}"
               placeholder="输入备注..."></Input>
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

  @Component({
    mixins: [Mixin]
  })
  export default class AddGood extends Vue {
    modalShow: Boolean = false
    formCustom: Object = {
      displayName: '',
      count: '',
      price: '',
      source: '1',
      type: '1',
      remark: '',
    }
    @Prop()
    showAddModal: Boolean

    @Watch('showAddModal', {immediate: true, deep: true})
    onChangAddModal(val: any, oldVal: any) {
      this.modalShow = val
    }

    async ok() {

      try {
        let url = 'addGood'
        let params = this.formCustom
        let res = await this.$post(url, params)
        if (res.code === 0) {
          this.$Message.success(`添加成功!`)
          this.$emit('changeAddModal', false)
        }
      } finally {
        this.changeLoading()
      }
    }

    cancel() {
      this.$emit('changeAddModal', false)
    }

  }
</script>

<style scoped>

</style>