<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
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
    <el-form-item label="出库数量" prop="modelAllNumber">
      <el-input v-model="dataForm.modelAllNumber" placeholder="出库数量"></el-input>
    </el-form-item>
    <el-form-item label="模具经手人" prop="modelHandlingPeople">
      <el-input v-model="dataForm.modelHandlingPeople" placeholder="模具经手人"></el-input>
    </el-form-item>
    <el-form-item label="提货人名称" prop="customerName">
      <el-input v-model="dataForm.customerName" placeholder="提货人名称"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="modelRemark">
      <el-input v-model="dataForm.modelRemark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="发货日期" prop="modelDeliveryTime">
      <el-input v-model="dataForm.modelDeliveryTime" placeholder="发货日期"></el-input>
    </el-form-item>
    <el-form-item label="收货日期" prop="modelReceiptTime">
      <el-input v-model="dataForm.modelReceiptTime" placeholder="收货日期"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="创建人员" prop="createUser">
      <el-input v-model="dataForm.createUser" placeholder="创建人员"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="更新人员" prop="updateUser">
      <el-input v-model="dataForm.updateUser" placeholder="更新人员"></el-input>
    </el-form-item>
    <el-form-item label="0为启用，1为禁止" prop="status">
      <el-input v-model="dataForm.status" placeholder="0为启用，1为禁止"></el-input>
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
          modelAllNumber: '',
          modelHandlingPeople: '',
          customerName: '',
          modelRemark: '',
          modelDeliveryTime: '',
          modelReceiptTime: '',
          createTime: '',
          createUser: '',
          updateTime: '',
          updateUser: '',
          status: ''
        },
        dataRule: {
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
          modelAllNumber: [
            { required: true, message: '出库数量不能为空', trigger: 'blur' }
          ],
          modelHandlingPeople: [
            { required: true, message: '模具经手人不能为空', trigger: 'blur' }
          ],
          customerName: [
            { required: true, message: '提货人名称不能为空', trigger: 'blur' }
          ],
          modelRemark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          modelDeliveryTime: [
            { required: true, message: '发货日期不能为空', trigger: 'blur' }
          ],
          modelReceiptTime: [
            { required: true, message: '收货日期不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          createUser: [
            { required: true, message: '创建人员不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          updateUser: [
            { required: true, message: '更新人员不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '0为启用，1为禁止不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/product/productmodelout/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.modelNo = data.productmodelout.modelNo
                this.dataForm.productName = data.productmodelout.productName
                this.dataForm.modelSuccessMo = data.productmodelout.modelSuccessMo
                this.dataForm.modelPrimaryMo = data.productmodelout.modelPrimaryMo
                this.dataForm.modelMouthMo = data.productmodelout.modelMouthMo
                this.dataForm.modelMenTou = data.productmodelout.modelMenTou
                this.dataForm.modelFunnel = data.productmodelout.modelFunnel
                this.dataForm.modelCore = data.productmodelout.modelCore
                this.dataForm.modelAirTou = data.productmodelout.modelAirTou
                this.dataForm.modelCooling = data.productmodelout.modelCooling
                this.dataForm.modelClamp = data.productmodelout.modelClamp
                this.dataForm.modelAllNumber = data.productmodelout.modelAllNumber
                this.dataForm.modelHandlingPeople = data.productmodelout.modelHandlingPeople
                this.dataForm.customerName = data.productmodelout.customerName
                this.dataForm.modelRemark = data.productmodelout.modelRemark
                this.dataForm.modelDeliveryTime = data.productmodelout.modelDeliveryTime
                this.dataForm.modelReceiptTime = data.productmodelout.modelReceiptTime
                this.dataForm.createTime = data.productmodelout.createTime
                this.dataForm.createUser = data.productmodelout.createUser
                this.dataForm.updateTime = data.productmodelout.updateTime
                this.dataForm.updateUser = data.productmodelout.updateUser
                this.dataForm.status = data.productmodelout.status
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
              url: this.$http.adornUrl(`/product/productmodelout/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
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
                'modelAllNumber': this.dataForm.modelAllNumber,
                'modelHandlingPeople': this.dataForm.modelHandlingPeople,
                'customerName': this.dataForm.customerName,
                'modelRemark': this.dataForm.modelRemark,
                'modelDeliveryTime': this.dataForm.modelDeliveryTime,
                'modelReceiptTime': this.dataForm.modelReceiptTime,
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
