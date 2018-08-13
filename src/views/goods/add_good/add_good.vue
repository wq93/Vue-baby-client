<template>
  <Modal
    v-model="modalShow"
    title="添加商品"
    @on-ok="ok"
    @on-cancel="cancel">
    <Form ref="formCustom" :model="formCustom" :label-width="80">
      <FormItem label="名称:" prop="">
        <Input type="text" v-model="formCustom.displayName"></Input>
      </FormItem>
      <FormItem label="数量:" prop="">
        <Input type="text" v-model="formCustom.count"></Input>
      </FormItem>
      <FormItem label="价格:" prop="">
        <Input type="text" v-model="formCustom.price"></Input>
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
          <Option value="京东">京东</Option>
          <Option value="淘宝">淘宝</Option>
          <Option value="其他">其他</Option>
        </Select>
      </FormItem>
      <FormItem label="备注:" prop="">
        <Input type="text" v-model="formCustom.remark" number></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Mixin from '../../../common/mixins/mixin'
  import {
    Component,
    Prop,
    Watch
  } from 'vue-property-decorator'


  @Component({
    mixins:[Mixin]
  })
  export default class Good extends Vue {
    modalShow: Boolean = false
    formCustom: Object = {
      displayName: '',
      count: '',
      price: '',
      source: '京东',
      type: '1',
      remark: '',
    }
    @Prop()
    showAddModal: Boolean

    @Watch('showAddModal', {immediate: true, deep: true})
    onChangAddModal(val: any, oldVal: any) {
      this.modalShow = val
    }

    ok() {

      this.$emit('changeAddModal', false)
    }

    cancel() {
      this.$emit('changeAddModal', false)
    }

  }
</script>

<style scoped>

</style>