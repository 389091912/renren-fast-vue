<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="设备编号" prop="deviceId">
      <el-input v-model="dataForm.deviceId" placeholder="设备编号"></el-input>
    </el-form-item>
    <el-form-item label="产品编号" prop="productId">
      <el-input v-model="dataForm.productId" placeholder="产品编号"></el-input>
    </el-form-item>
    <el-form-item label="模具编号" prop="modelId">
      <el-input v-model="dataForm.modelId" placeholder="模具编号"></el-input>
    </el-form-item>
    <el-form-item label="客户编号" prop="customerProductNo">
      <el-input v-model="dataForm.customerProductNo" placeholder="客户编号"></el-input>
    </el-form-item>
    <el-form-item label="料重" prop="materialWeight">
      <el-input v-model="dataForm.materialWeight" placeholder="料重"></el-input>
    </el-form-item>
    <el-form-item label="容量" prop="volume">
      <el-input v-model="dataForm.volume" placeholder="容量"></el-input>
    </el-form-item>
    <el-form-item label="订单id" prop="orderId">
      <el-input v-model="dataForm.orderId" placeholder="订单id"></el-input>
    </el-form-item>
    <el-form-item label="订单数量" prop="orderNumber">
      <el-input v-model="dataForm.orderNumber" placeholder="订单数量"></el-input>
    </el-form-item>
    <el-form-item label="库存数量" prop="repertoryNumber">
      <el-input v-model="dataForm.repertoryNumber" placeholder="库存数量"></el-input>
    </el-form-item>
    <el-form-item label="实际需求数量" prop="needNumber">
      <el-input v-model="dataForm.needNumber" placeholder="实际需求数量"></el-input>
    </el-form-item>
    <el-form-item label="客户样品 有 无" prop="customerProductSytle">
      <el-input v-model="dataForm.customerProductSytle" placeholder="客户样品 有 无"></el-input>
    </el-form-item>
    <el-form-item label="瓶盖套装 有 无" prop="bottleCapSuit">
      <el-input v-model="dataForm.bottleCapSuit" placeholder="瓶盖套装 有 无"></el-input>
    </el-form-item>
    <el-form-item label="后续加工" prop="followUpProcess">
      <el-input v-model="dataForm.followUpProcess" placeholder="后续加工"></el-input>
    </el-form-item>
    <el-form-item label="包装要求" prop="packRequire">
      <el-input v-model="dataForm.packRequire" placeholder="包装要求"></el-input>
    </el-form-item>
    <el-form-item label="纸箱编号" prop="boxId">
      <el-input v-model="dataForm.boxId" placeholder="纸箱编号"></el-input>
    </el-form-item>
    <el-form-item label="客户要求" prop="customerRequire">
      <el-input v-model="dataForm.customerRequire" placeholder="客户要求"></el-input>
    </el-form-item>
    <el-form-item label="瓶身总高度" prop="bottleHight">
      <el-input v-model="dataForm.bottleHight" placeholder="瓶身总高度"></el-input>
    </el-form-item>
    <el-form-item label="瓶口内径" prop="bottleInDiameter">
      <el-input v-model="dataForm.bottleInDiameter" placeholder="瓶口内径"></el-input>
    </el-form-item>
    <el-form-item label="头径高度" prop="headNeckHeight">
      <el-input v-model="dataForm.headNeckHeight" placeholder="头径高度"></el-input>
    </el-form-item>
    <el-form-item label="瓶口外径" prop="bottleOutDiameter">
      <el-input v-model="dataForm.bottleOutDiameter" placeholder="瓶口外径"></el-input>
    </el-form-item>
    <el-form-item label="外观" prop="facadeRequire">
      <el-input v-model="dataForm.facadeRequire" placeholder="外观"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="创建人员id" prop="createUser">
      <el-input v-model="dataForm.createUser" placeholder="创建人员id"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="更新人员id" prop="updateUser">
      <el-input v-model="dataForm.updateUser" placeholder="更新人员id"></el-input>
    </el-form-item>
    <el-form-item label="0为启用,1为禁止" prop="status">
      <el-input v-model="dataForm.status" placeholder="0为启用,1为禁止"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          deviceId: '',
          productId: '',
          modelId: '',
          customerProductNo: '',
          materialWeight: '',
          volume: '',
          orderId: '',
          orderNumber: '',
          repertoryNumber: '',
          needNumber: '',
          customerProductSytle: '',
          bottleCapSuit: '',
          followUpProcess: '',
          packRequire: '',
          boxId: '',
          customerRequire: '',
          bottleHight: '',
          bottleInDiameter: '',
          headNeckHeight: '',
          bottleOutDiameter: '',
          facadeRequire: '',
          remark: '',
          createTime: '',
          createUser: '',
          updateTime: '',
          updateUser: '',
          status: ''
        },
        dataRule: {
          deviceId: [
            { required: true, message: '设备编号不能为空', trigger: 'blur' }
          ],
          productId: [
            { required: true, message: '产品编号不能为空', trigger: 'blur' }
          ],
          modelId: [
            { required: true, message: '模具编号不能为空', trigger: 'blur' }
          ],
          customerProductNo: [
            { required: true, message: '客户编号不能为空', trigger: 'blur' }
          ],
          materialWeight: [
            { required: true, message: '料重不能为空', trigger: 'blur' }
          ],
          volume: [
            { required: true, message: '容量不能为空', trigger: 'blur' }
          ],
          orderId: [
            { required: true, message: '订单id不能为空', trigger: 'blur' }
          ],
          orderNumber: [
            { required: true, message: '订单数量不能为空', trigger: 'blur' }
          ],
          repertoryNumber: [
            { required: true, message: '库存数量不能为空', trigger: 'blur' }
          ],
          needNumber: [
            { required: true, message: '实际需求数量不能为空', trigger: 'blur' }
          ],
          customerProductSytle: [
            { required: true, message: '客户样品 有 无不能为空', trigger: 'blur' }
          ],
          bottleCapSuit: [
            { required: true, message: '瓶盖套装 有 无不能为空', trigger: 'blur' }
          ],
          followUpProcess: [
            { required: true, message: '后续加工不能为空', trigger: 'blur' }
          ],
          packRequire: [
            { required: true, message: '包装要求不能为空', trigger: 'blur' }
          ],
          boxId: [
            { required: true, message: '纸箱编号不能为空', trigger: 'blur' }
          ],
          customerRequire: [
            { required: true, message: '客户要求不能为空', trigger: 'blur' }
          ],
          bottleHight: [
            { required: true, message: '瓶身总高度不能为空', trigger: 'blur' }
          ],
          bottleInDiameter: [
            { required: true, message: '瓶口内径不能为空', trigger: 'blur' }
          ],
          headNeckHeight: [
            { required: true, message: '头径高度不能为空', trigger: 'blur' }
          ],
          bottleOutDiameter: [
            { required: true, message: '瓶口外径不能为空', trigger: 'blur' }
          ],
          facadeRequire: [
            { required: true, message: '外观不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          createUser: [
            { required: true, message: '创建人员id不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          updateUser: [
            { required: true, message: '更新人员id不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '0为启用,1为禁止不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/product/productplannotice/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.deviceId = data.productplannotice.deviceId
                this.dataForm.productId = data.productplannotice.productId
                this.dataForm.modelId = data.productplannotice.modelId
                this.dataForm.customerProductNo = data.productplannotice.customerProductNo
                this.dataForm.materialWeight = data.productplannotice.materialWeight
                this.dataForm.volume = data.productplannotice.volume
                this.dataForm.orderId = data.productplannotice.orderId
                this.dataForm.orderNumber = data.productplannotice.orderNumber
                this.dataForm.repertoryNumber = data.productplannotice.repertoryNumber
                this.dataForm.needNumber = data.productplannotice.needNumber
                this.dataForm.customerProductSytle = data.productplannotice.customerProductSytle
                this.dataForm.bottleCapSuit = data.productplannotice.bottleCapSuit
                this.dataForm.followUpProcess = data.productplannotice.followUpProcess
                this.dataForm.packRequire = data.productplannotice.packRequire
                this.dataForm.boxId = data.productplannotice.boxId
                this.dataForm.customerRequire = data.productplannotice.customerRequire
                this.dataForm.bottleHight = data.productplannotice.bottleHight
                this.dataForm.bottleInDiameter = data.productplannotice.bottleInDiameter
                this.dataForm.headNeckHeight = data.productplannotice.headNeckHeight
                this.dataForm.bottleOutDiameter = data.productplannotice.bottleOutDiameter
                this.dataForm.facadeRequire = data.productplannotice.facadeRequire
                this.dataForm.remark = data.productplannotice.remark
                this.dataForm.createTime = data.productplannotice.createTime
                this.dataForm.createUser = data.productplannotice.createUser
                this.dataForm.updateTime = data.productplannotice.updateTime
                this.dataForm.updateUser = data.productplannotice.updateUser
                this.dataForm.status = data.productplannotice.status
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/product/productplannotice/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'deviceId': this.dataForm.deviceId,
                'productId': this.dataForm.productId,
                'modelId': this.dataForm.modelId,
                'customerProductNo': this.dataForm.customerProductNo,
                'materialWeight': this.dataForm.materialWeight,
                'volume': this.dataForm.volume,
                'orderId': this.dataForm.orderId,
                'orderNumber': this.dataForm.orderNumber,
                'repertoryNumber': this.dataForm.repertoryNumber,
                'needNumber': this.dataForm.needNumber,
                'customerProductSytle': this.dataForm.customerProductSytle,
                'bottleCapSuit': this.dataForm.bottleCapSuit,
                'followUpProcess': this.dataForm.followUpProcess,
                'packRequire': this.dataForm.packRequire,
                'boxId': this.dataForm.boxId,
                'customerRequire': this.dataForm.customerRequire,
                'bottleHight': this.dataForm.bottleHight,
                'bottleInDiameter': this.dataForm.bottleInDiameter,
                'headNeckHeight': this.dataForm.headNeckHeight,
                'bottleOutDiameter': this.dataForm.bottleOutDiameter,
                'facadeRequire': this.dataForm.facadeRequire,
                'remark': this.dataForm.remark,
                'createTime': this.dataForm.createTime,
                'createUser': this.dataForm.createUser,
                'updateTime': this.dataForm.updateTime,
                'updateUser': this.dataForm.updateUser,
                'status': this.dataForm.status
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
