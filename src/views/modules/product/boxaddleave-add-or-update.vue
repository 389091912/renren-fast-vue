<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="130px"
    >
      <el-form-item label="纸箱编号" prop="boxNo">
        <el-input v-model="dataForm.boxNo" placeholder="纸箱编号" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="箱体数量" prop="bodyNumber">
        <el-input v-model="dataForm.bodyNumber" placeholder="箱体数量"  style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="格挡数量" prop="parryNumber">
        <el-input v-model="dataForm.parryNumber" placeholder="格挡数量"  style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="垫片数量" prop="spacerNumber">
        <el-input v-model="dataForm.spacerNumber" placeholder="垫片数量"  style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="成品入库数量" prop="addBoxNumber">
        <el-input v-model="dataForm.addBoxNumber" placeholder="成品入库数量"  style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="成品出库数量" prop="outBoxNumber">
        <el-input v-model="dataForm.outBoxNumber" placeholder="成品出库数量"  style="width:260px"></el-input>
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
          bodyNumber: '',
          parryNumber: '',
          spacerNumber: '',
          addBoxNumber: '',
          outBoxNumber: '',
          createUser: '',
          createTime: '',
          updateUser: '',
          updateTime: '',
          status: ''
        },
        dataRule: {
          boxNo: [
            { required: true, message: '纸箱编号不能为空', trigger: 'blur' }
          ],
          bodyNumber: [
            { required: true, message: '箱体数量不能为空', trigger: 'blur' }
          ],
          parryNumber: [
            { required: true, message: '格挡数量不能为空', trigger: 'blur' }
          ],
          spacerNumber: [
            { required: true, message: '垫片数量不能为空', trigger: 'blur' }
          ],
          addBoxNumber: [
            { required: true, message: '成品入库数量不能为空', trigger: 'blur' }
          ],
          outBoxNumber: [
            { required: true, message: '成品出库数量不能为空', trigger: 'blur' }
          ],
      
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
              url: this.$http.adornUrl(`/product/boxaddleave/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.boxNo = data.boxAddLeave.boxNo
                this.dataForm.bodyNumber = data.boxAddLeave.bodyNumber
                this.dataForm.parryNumber = data.boxAddLeave.parryNumber
                this.dataForm.spacerNumber = data.boxAddLeave.spacerNumber
                this.dataForm.addBoxNumber = data.boxAddLeave.addBoxNumber
                this.dataForm.outBoxNumber = data.boxAddLeave.outBoxNumber
                this.dataForm.createUser = data.boxAddLeave.createUser
                this.dataForm.createTime = data.boxAddLeave.createTime
                this.dataForm.updateUser = data.boxAddLeave.updateUser
                this.dataForm.updateTime = data.boxAddLeave.updateTime
                this.dataForm.status = data.boxAddLeave.status
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
              url: this.$http.adornUrl(`/product/boxaddleave/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'boxNo': this.dataForm.boxNo,
                'bodyNumber': this.dataForm.bodyNumber,
                'parryNumber': this.dataForm.parryNumber,
                'spacerNumber': this.dataForm.spacerNumber,
                'addBoxNumber': this.dataForm.addBoxNumber,
                'outBoxNumber': this.dataForm.outBoxNumber,
                'createUser': this.dataForm.createUser,
                'createTime': this.dataForm.createTime,
                'updateUser': this.dataForm.updateUser,
                'updateTime': this.dataForm.updateTime,
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
