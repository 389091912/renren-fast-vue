<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="130px">
    <el-form-item label="申请付款人" prop="personName">
      <el-input v-model="dataForm.personName" placeholder="申请付款人"></el-input>
    </el-form-item>
    <el-form-item label="付款单编号" prop="payCode">
      <el-input v-model="dataForm.payCode" placeholder="付款单编号"></el-input>
    </el-form-item>
      <el-form-item label="费用类别" prop="category">
        <el-select v-model="dataForm.category"
                   default-first-option
                   style="width: 100%" filterable clearable  placeholder="请选择">
          <el-option
            v-for="item in financeCategoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    <el-form-item label="付款日期" prop="payDate">
      <el-date-picker
        v-model="dataForm.payDate"
        type="date"
        style="width:100%"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="付款日期"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="打款信息" prop="payInfo">
      <el-input v-model="dataForm.payInfo" placeholder="打款信息"></el-input>
    </el-form-item>
    <el-form-item label="收款人名称" prop="customerName">
      <el-input v-model="dataForm.customerName" placeholder="收款人名称"></el-input>
    </el-form-item>
    <el-form-item label="金额" prop="amount">
      <el-input-number v-model="dataForm.amount" style="width: 100%" placeholder="金额" controls-position="right"  :precision="2" :min="0"  :max="100000000"></el-input-number>

    </el-form-item>

    <el-form-item label="数量" prop="number">
      <el-input v-model="dataForm.number" placeholder="数量"></el-input>
    </el-form-item>
    <el-form-item label="单价" prop="price">
      <el-input v-model="dataForm.price" placeholder="单价"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
    </el-form-item>

   <!-- <el-form-item label="付款单留存" prop="payImageFile">
      <el-input v-model="dataForm.payImageFile" placeholder="付款单留存"></el-input>
    </el-form-item>-->
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
          personName: '',
          payCode: '',
          payDate: '',
          payInfo: '',
          customerName: '',
          amount: '',
          category: '',
          number: '',
          price: '',
          remark: '',
          status: '',
          createUser: '',
          createDate: '',
          updateUser: '',
          updateDate: '',
          payImageFile: ''
        },
        dataRule: {
          personName: [
            { required: true, message: '申请付款人不能为空', trigger: 'blur' }
          ],
          payCode: [
            { required: true, message: '付款单编号不能为空', trigger: 'blur' }
          ],
          payDate: [
            { required: true, message: '付款日期不能为空', trigger: 'blur' }
          ],
          payInfo: [
            { required: true, message: '打款信息不能为空', trigger: 'blur' }
          ],
          customerName: [
            { required: true, message: '收款人名称不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '金额不能为空', trigger: 'blur' }
          ],
          category: [
            { required: true, message: '类别不能为空', trigger: 'blur' }
          ],


        }
      }
    },
    props: {
      financeCategoryList:{
        type: Array,
        default: []
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
              url: this.$http.adornUrl(`/finance/financepay/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.personName = data.financePay.personName
                this.dataForm.payCode = data.financePay.payCode
                this.dataForm.payDate = data.financePay.payDate
                this.dataForm.payInfo = data.financePay.payInfo
                this.dataForm.customerName = data.financePay.customerName
                this.dataForm.amount = data.financePay.amount
                this.dataForm.category = data.financePay.category
                this.dataForm.number = data.financePay.number
                this.dataForm.price = data.financePay.price
                this.dataForm.remark = data.financePay.remark
                this.dataForm.status = data.financePay.status
                this.dataForm.payImageFile = data.financePay.payImageFile
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
              url: this.$http.adornUrl(`/finance/financepay/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'personName': this.dataForm.personName,
                'payCode': this.dataForm.payCode,
                'payDate': this.dataForm.payDate,
                'payInfo': this.dataForm.payInfo,
                'customerName': this.dataForm.customerName,
                'amount': this.dataForm.amount,
                'category': this.dataForm.category,
                'number': this.dataForm.number,
                'price': this.dataForm.price,
                'remark': this.dataForm.remark,
                'status': this.dataForm.status,
                'payImageFile': this.dataForm.payImageFile
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
      },


    }
  }
</script>
