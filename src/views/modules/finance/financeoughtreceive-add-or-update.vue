<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="130px">
    <el-form-item label="应收单号" prop="vouchCode">
      <el-input v-model="dataForm.vouchCode" placeholder="应收单号"></el-input>
    </el-form-item>
    <el-form-item label="收款日期" prop="vouchDate">
      <el-date-picker
        v-model="dataForm.vouchDate"
        type="date"
        style="width:800px"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="收款日期"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="款项类型" prop="vouchType">
      <el-radio-group v-model="dataForm.vouchType" size="small">
        <el-radio :label=0 border>应收款</el-radio>
        <el-radio :label=1 border>预收款</el-radio>
        <el-radio :label=2 border>其他费用</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="金额" prop="amount">
      <el-input-number style="width: 100%" v-model="dataForm.amount" controls-position="right" 	 placeholder="金额" :precision="2" :min="0" :max="100000000"></el-input-number>
    </el-form-item>
    <el-form-item label="用途或项目名称" prop="itemName">
      <el-input v-model="dataForm.itemName" placeholder="用途或项目名称"></el-input>
    </el-form-item>
    <el-form-item label="客户名称" prop="clientId">
      <el-input v-model="dataForm.clientId" placeholder="客户名称"></el-input>
    </el-form-item>
<!--    <el-form-item label="单据留存" prop="vouchImageFile">-->
<!--      <el-input v-model="dataForm.vouchImageFile" placeholder="单据留存"></el-input>-->
<!--    </el-form-item>-->

<!--    <el-form-item label="状态" prop="status">-->
<!--      <el-input v-model="dataForm.status" placeholder="状态"></el-input>-->
<!--    </el-form-item>-->
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
          vouchCode: '',
          vouchDate: '',
          vouchType: 0,
          amount: '',
          itemName: '',
          clientId: '',
          vouchImageFile: '',
          createUser: '',
          createDate: '',
          updateUser: '',
          updateDate: '',
          status: ''
        },
        dataRule: {
          vouchCode: [
            { required: true, message: '应收单号不能为空', trigger: 'blur' }
          ],
          vouchDate: [
            { required: true, message: '收款日期不能为空', trigger: 'blur' }
          ],
          vouchType: [
            { required: true, message: '款项类型不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '金额不能为空', trigger: 'blur' }
          ],
          itemName: [
            { required: true, message: '用途项目名称不能为空', trigger: 'blur' }
          ],
          clientId: [
            { required: true, message: '客户名称不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/finance/financeoughtreceive/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.vouchCode = data.financeOughtReceive.vouchCode
                this.dataForm.vouchDate = data.financeOughtReceive.vouchDate
                this.dataForm.vouchType = data.financeOughtReceive.vouchType
                this.dataForm.amount = data.financeOughtReceive.amount
                this.dataForm.itemName = data.financeOughtReceive.itemName
                this.dataForm.clientId = data.financeOughtReceive.clientId
                this.dataForm.vouchImageFile = data.financeOughtReceive.vouchImageFile
                this.dataForm.createUser = data.financeOughtReceive.createUser
                this.dataForm.createDate = data.financeOughtReceive.createDate
                this.dataForm.updateUser = data.financeOughtReceive.updateUser
                this.dataForm.updateDate = data.financeOughtReceive.updateDate
                this.dataForm.status = data.financeOughtReceive.status
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
              url: this.$http.adornUrl(`/finance/financeoughtreceive/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'vouchCode': this.dataForm.vouchCode,
                'vouchDate': this.dataForm.vouchDate,
                'vouchType': this.dataForm.vouchType,
                'amount': this.dataForm.amount,
                'itemName': this.dataForm.itemName,
                'clientId': this.dataForm.clientId,
                'vouchImageFile': this.dataForm.vouchImageFile,
                'createUser': this.dataForm.createUser,
                'createDate': this.dataForm.createDate,
                'updateUser': this.dataForm.updateUser,
                'updateDate': this.dataForm.updateDate,
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
