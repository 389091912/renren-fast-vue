<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="订单编号" prop="orderNo">
      <el-input v-model="dataForm.orderNo" placeholder="订单编号"></el-input>
    </el-form-item>
    <el-form-item label="订单时间" prop="orderTime">
      <el-input v-model="dataForm.orderTime" placeholder="订单时间"></el-input>
    </el-form-item>
    <el-form-item label="员工id" prop="employeeId">
      <el-input v-model="dataForm.employeeId" placeholder="员工id"></el-input>
    </el-form-item>
    <el-form-item label="客户" prop="customer">
      <el-input v-model="dataForm.customer" placeholder="客户"></el-input>
    </el-form-item>
    <el-form-item label="交货时间" prop="deliveryTime">
      <el-input v-model="dataForm.deliveryTime" placeholder="交货时间"></el-input>
    </el-form-item>
    <el-form-item label="创建者" prop="createUser">
      <el-input v-model="dataForm.createUser" placeholder="创建者"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新者" prop="updateId">
      <el-input v-model="dataForm.updateId" placeholder="更新者"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="订单状态 0为正常订单正常生产，1为取消订单，2为订单加急，3为订单挂起" prop="status">
      <el-input v-model="dataForm.status" placeholder="订单状态 0为正常订单正常生产，1为取消订单，2为订单加急，3为订单挂起"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
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
          orderNo: '',
          orderTime: '',
          employeeId: '',
          customer: '',
          deliveryTime: '',
          createUser: '',
          createTime: '',
          updateId: '',
          updateTime: '',
          status: '',
          remark: ''
        },
        dataRule: {
          orderNo: [
            { required: true, message: '订单编号不能为空', trigger: 'blur' }
          ],
          orderTime: [
            { required: true, message: '订单时间不能为空', trigger: 'blur' }
          ],
          employeeId: [
            { required: true, message: '员工id不能为空', trigger: 'blur' }
          ],
          customer: [
            { required: true, message: '客户不能为空', trigger: 'blur' }
          ],
          deliveryTime: [
            { required: true, message: '交货时间不能为空', trigger: 'blur' }
          ],
          createUser: [
            { required: true, message: '创建者不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateId: [
            { required: true, message: '更新者不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '订单状态 0为正常订单正常生产，1为取消订单，2为订单加急，3为订单挂起不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/product/productorder/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.orderNo = data.productorder.orderNo
                this.dataForm.orderTime = data.productorder.orderTime
                this.dataForm.employeeId = data.productorder.employeeId
                this.dataForm.customer = data.productorder.customer
                this.dataForm.deliveryTime = data.productorder.deliveryTime
                this.dataForm.createUser = data.productorder.createUser
                this.dataForm.createTime = data.productorder.createTime
                this.dataForm.updateId = data.productorder.updateId
                this.dataForm.updateTime = data.productorder.updateTime
                this.dataForm.status = data.productorder.status
                this.dataForm.remark = data.productorder.remark
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
              url: this.$http.adornUrl(`/product/productorder/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'orderNo': this.dataForm.orderNo,
                'orderTime': this.dataForm.orderTime,
                'employeeId': this.dataForm.employeeId,
                'customer': this.dataForm.customer,
                'deliveryTime': this.dataForm.deliveryTime,
                'createUser': this.dataForm.createUser,
                'createTime': this.dataForm.createTime,
                'updateId': this.dataForm.updateId,
                'updateTime': this.dataForm.updateTime,
                'status': this.dataForm.status,
                'remark': this.dataForm.remark
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
