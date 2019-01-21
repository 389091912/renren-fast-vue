<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="130px">
    <el-form-item label="架号" prop="siteNo">
      <el-input v-model="dataForm.siteNo" placeholder="架号"></el-input>
    </el-form-item>
    <el-form-item label="模具编号" prop="modelNo">
      <el-input v-model="dataForm.modelNo" placeholder="模具编号"></el-input>
    </el-form-item>
    <el-form-item label="产品名称" prop="productName">
      <el-input v-model="dataForm.productName" placeholder="产品名称"></el-input>
    </el-form-item>
    <el-form-item label="成模" prop="modelSuccessMo">
      <el-input v-model="dataForm.modelSuccessMo" placeholder="成模"></el-input>
    </el-form-item>
    <el-form-item label="初模" prop="modelPrimaryMo">
      <el-input v-model="dataForm.modelPrimaryMo" placeholder="初模"></el-input>
    </el-form-item>
    <el-form-item label="口模" prop="modelMouthMo">
      <el-input v-model="dataForm.modelMouthMo" placeholder="口模"></el-input>
    </el-form-item>
    <el-form-item label="闷头" prop="modelMenTou">
      <el-input v-model="dataForm.modelMenTou" placeholder="闷头"></el-input>
    </el-form-item>
    <el-form-item label="漏斗" prop="modelFunnel">
      <el-input v-model="dataForm.modelFunnel" placeholder="漏斗"></el-input>
    </el-form-item>
    <el-form-item label="芯子" prop="modelCore">
      <el-input v-model="dataForm.modelCore" placeholder="芯子"></el-input>
    </el-form-item>
    <el-form-item label="气头" prop="modelAirTou">
      <el-input v-model="dataForm.modelAirTou" placeholder="气头"></el-input>
    </el-form-item>
    <el-form-item label="冷却" prop="modelCooling">
      <el-input v-model="dataForm.modelCooling" placeholder="冷却"></el-input>
    </el-form-item>
    <el-form-item label="钳片" prop="modelClamp">
      <el-input v-model="dataForm.modelClamp" placeholder="钳片"></el-input>
    </el-form-item>
    <el-form-item label="容量" prop="modelVolume">
      <el-input v-model="dataForm.modelVolume" placeholder="容量"></el-input>
    </el-form-item>
    <el-form-item label="经手人" prop="modelHandlingPeople">
      <el-input v-model="dataForm.modelHandlingPeople" placeholder="经手人"></el-input>
    </el-form-item>
    <el-form-item label="发货日期" prop="modelDeliveryTime">
      <el-input v-model="dataForm.modelDeliveryTime" placeholder="发货日期"></el-input>
    </el-form-item>
    <el-form-item label="收货日期" prop="modelReceiptTime">
      <el-input v-model="dataForm.modelReceiptTime" placeholder="收货日期"></el-input>
    </el-form-item>
    <el-form-item label="客户名称" prop="customerName">
      <el-input v-model="dataForm.customerName" placeholder="客户名称"></el-input>
    </el-form-item>
    <el-form-item label="是否在库" prop="state">
      <el-input v-model="dataForm.state" placeholder="是否在库"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="modelRemark">
      <el-input v-model="dataForm.modelRemark" placeholder="备注"></el-input>
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
          modelId: 0,
          siteNo: '',
          modelNo: '',
          productName: '',
          modelSuccessMo: '',
          modelPrimaryMo: '',
          modelMouthMo: '',
          modelMenTou: '',
          modelFunnel: '',
          modelCore: '',
          modelAirTou: '',
          modelCooling: '',
          modelClamp: '',
          modelVolume: '',
          modelHandlingPeople: '',
          modelDeliveryTime: '',
          modelReceiptTime: '',
          customerName: '',
          state: '',
          modelRemark: ''
        },
        dataRule: {
          siteNo: [
            { required: true, message: '架号不能为空', trigger: 'blur' }
          ],
          modelNo: [
            { required: true, message: '模具编号不能为空', trigger: 'blur' }
          ],
          productName: [
            { required: true, message: '产品名称不能为空', trigger: 'blur' }
          ],
          modelSuccessMo: [
            { required: true, message: '成模不能为空', trigger: 'blur' }
          ],
          modelPrimaryMo: [
            { required: true, message: '初模不能为空', trigger: 'blur' }
          ],
          modelMouthMo: [
            { required: true, message: '口模不能为空', trigger: 'blur' }
          ],
          modelMenTou: [
            { required: true, message: '闷头不能为空', trigger: 'blur' }
          ],
          modelFunnel: [
            { required: true, message: '漏斗不能为空', trigger: 'blur' }
          ],
          modelCore: [
            { required: true, message: '芯子不能为空', trigger: 'blur' }
          ],
          modelAirTou: [
            { required: true, message: '气头不能为空', trigger: 'blur' }
          ],
          modelCooling: [
            { required: true, message: '冷却不能为空', trigger: 'blur' }
          ],
          modelClamp: [
            { required: true, message: '钳片不能为空', trigger: 'blur' }
          ],
          modelVolume: [
            { required: true, message: '容量不能为空', trigger: 'blur' }
          ],
          modelHandlingPeople: [
            { required: true, message: '经手人不能为空', trigger: 'blur' }
          ],
          modelDeliveryTime: [
            { required: true, message: '发货日期不能为空', trigger: 'blur' }
          ],
          modelReceiptTime: [
            { required: true, message: '收货日期不能为空', trigger: 'blur' }
          ],
          customerName: [
            { required: true, message: '客户名称不能为空', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '是否在库不能为空', trigger: 'blur' }
          ],
          modelRemark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.modelId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.modelId) {
            this.$http({
              url: this.$http.adornUrl(`/product/productmodel/info/${this.dataForm.modelId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.siteNo = data.productmodel.siteNo
                this.dataForm.modelNo = data.productmodel.modelNo
                this.dataForm.productName = data.productmodel.productName
                this.dataForm.modelSuccessMo = data.productmodel.modelSuccessMo
                this.dataForm.modelPrimaryMo = data.productmodel.modelPrimaryMo
                this.dataForm.modelMouthMo = data.productmodel.modelMouthMo
                this.dataForm.modelMenTou = data.productmodel.modelMenTou
                this.dataForm.modelFunnel = data.productmodel.modelFunnel
                this.dataForm.modelCore = data.productmodel.modelCore
                this.dataForm.modelAirTou = data.productmodel.modelAirTou
                this.dataForm.modelCooling = data.productmodel.modelCooling
                this.dataForm.modelClamp = data.productmodel.modelClamp
                this.dataForm.modelVolume = data.productmodel.modelVolume
                this.dataForm.modelHandlingPeople = data.productmodel.modelHandlingPeople
                this.dataForm.modelDeliveryTime = data.productmodel.modelDeliveryTime
                this.dataForm.modelReceiptTime = data.productmodel.modelReceiptTime
                this.dataForm.customerName = data.productmodel.customerName
                this.dataForm.state = data.productmodel.state
                this.dataForm.modelRemark = data.productmodel.modelRemark
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
              url: this.$http.adornUrl(`/product/productmodel/${!this.dataForm.modelId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'modelId': this.dataForm.modelId || undefined,
                'siteNo': this.dataForm.siteNo,
                'modelNo': this.dataForm.modelNo,
                'productName': this.dataForm.productName,
                'modelSuccessMo': this.dataForm.modelSuccessMo,
                'modelPrimaryMo': this.dataForm.modelPrimaryMo,
                'modelMouthMo': this.dataForm.modelMouthMo,
                'modelMenTou': this.dataForm.modelMenTou,
                'modelFunnel': this.dataForm.modelFunnel,
                'modelCore': this.dataForm.modelCore,
                'modelAirTou': this.dataForm.modelAirTou,
                'modelCooling': this.dataForm.modelCooling,
                'modelClamp': this.dataForm.modelClamp,
                'modelVolume': this.dataForm.modelVolume,
                'modelHandlingPeople': this.dataForm.modelHandlingPeople,
                'modelDeliveryTime': this.dataForm.modelDeliveryTime,
                'modelReceiptTime': this.dataForm.modelReceiptTime,
                'customerName': this.dataForm.customerName,
                'state': this.dataForm.state,
                'modelRemark': this.dataForm.modelRemark
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
