<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="纸箱编号" prop="boxNo">
      <el-input v-model="dataForm.boxNo" placeholder="纸箱编号"></el-input>
    </el-form-item>
    <el-form-item label="箱体" prop="body">
      <el-input v-model="dataForm.body" placeholder="箱体"></el-input>
    </el-form-item>
    <el-form-item label="格挡" prop="parry">
      <el-input v-model="dataForm.parry" placeholder="格挡"></el-input>
    </el-form-item>
    <el-form-item label="垫片" prop="spacer">
      <el-input v-model="dataForm.spacer" placeholder="垫片"></el-input>
    </el-form-item>
    <el-form-item label="数量" prop="boxNumber">
      <el-input v-model="dataForm.boxNumber" placeholder="数量"></el-input>
    </el-form-item>
    <el-form-item label="客户" prop="costomer">
      <el-input v-model="dataForm.costomer" placeholder="客户"></el-input>
    </el-form-item>
    <el-form-item label="位置" prop="location">
      <el-input v-model="dataForm.location" placeholder="位置"></el-input>
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
    <el-form-item label="0为开启，1为禁止" prop="status">
      <el-input v-model="dataForm.status" placeholder="0为开启，1为禁止"></el-input>
    </el-form-item>
    <el-form-item label=" 出库数量" prop="leaveNumber">
      <el-input v-model="dataForm.leaveNumber" placeholder=" 出库数量"></el-input>
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
          boxNo: '',
          body: '',
          parry: '',
          spacer: '',
          boxNumber: '',
          costomer: '',
          location: '',
          remark: '',
          createTime: '',
          createUser: '',
          updateTime: '',
          updateUser: '',
          status: '',
          leaveNumber: ''
        },
        dataRule: {
          boxNo: [
            { required: true, message: '纸箱编号不能为空', trigger: 'blur' }
          ],
          body: [
            { required: true, message: '箱体不能为空', trigger: 'blur' }
          ],
          parry: [
            { required: true, message: '格挡不能为空', trigger: 'blur' }
          ],
          spacer: [
            { required: true, message: '垫片不能为空', trigger: 'blur' }
          ],
          boxNumber: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ],
          costomer: [
            { required: true, message: '客户不能为空', trigger: 'blur' }
          ],
          location: [
            { required: true, message: '位置不能为空', trigger: 'blur' }
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
            { required: true, message: '0为开启，1为禁止不能为空', trigger: 'blur' }
          ],
          leaveNumber: [
            { required: true, message: ' 出库数量不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/product/productbox/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.boxNo = data.productbox.boxNo
                this.dataForm.body = data.productbox.body
                this.dataForm.parry = data.productbox.parry
                this.dataForm.spacer = data.productbox.spacer
                this.dataForm.boxNumber = data.productbox.boxNumber
                this.dataForm.costomer = data.productbox.costomer
                this.dataForm.location = data.productbox.location
                this.dataForm.remark = data.productbox.remark
                this.dataForm.createTime = data.productbox.createTime
                this.dataForm.createUser = data.productbox.createUser
                this.dataForm.updateTime = data.productbox.updateTime
                this.dataForm.updateUser = data.productbox.updateUser
                this.dataForm.status = data.productbox.status
                this.dataForm.leaveNumber = data.productbox.leaveNumber
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
              url: this.$http.adornUrl(`/product/productbox/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'boxNo': this.dataForm.boxNo,
                'body': this.dataForm.body,
                'parry': this.dataForm.parry,
                'spacer': this.dataForm.spacer,
                'boxNumber': this.dataForm.boxNumber,
                'costomer': this.dataForm.costomer,
                'location': this.dataForm.location,
                'remark': this.dataForm.remark,
                'createTime': this.dataForm.createTime,
                'createUser': this.dataForm.createUser,
                'updateTime': this.dataForm.updateTime,
                'updateUser': this.dataForm.updateUser,
                'status': this.dataForm.status,
                'leaveNumber': this.dataForm.leaveNumber
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
