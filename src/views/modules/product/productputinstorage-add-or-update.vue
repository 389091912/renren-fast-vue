<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="产品ID" prop="productId">
      <el-input v-model="dataForm.productId" placeholder="产品ID"></el-input>
    </el-form-item>
    <el-form-item label="只数" prop="zhiNumber">
      <el-input v-model="dataForm.zhiNumber" placeholder="只数"></el-input>
    </el-form-item>
    <el-form-item label="箱数" prop="boxNumber">
      <el-input v-model="dataForm.boxNumber" placeholder="箱数"></el-input>
    </el-form-item>
    <el-form-item label="入库数量" prop="inNumber">
      <el-input v-model="dataForm.inNumber" placeholder="入库数量"></el-input>
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
          productId: '',
          zhiNumber: '',
          boxNumber: '',
          inNumber: '',
          remark: '',
          createTime: '',
          createUser: '',
          updateTime: '',
          updateUser: ''
        },
        dataRule: {
          productId: [
            { required: true, message: '产品ID不能为空', trigger: 'blur' }
          ],
          zhiNumber: [
            { required: true, message: '只数不能为空', trigger: 'blur' }
          ],
          boxNumber: [
            { required: true, message: '箱数不能为空', trigger: 'blur' }
          ],
          inNumber: [
            { required: true, message: '入库数量不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/product/productputinstorage/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.productId = data.productputinstorage.productId
                this.dataForm.zhiNumber = data.productputinstorage.zhiNumber
                this.dataForm.boxNumber = data.productputinstorage.boxNumber
                this.dataForm.inNumber = data.productputinstorage.inNumber
                this.dataForm.remark = data.productputinstorage.remark
                this.dataForm.createTime = data.productputinstorage.createTime
                this.dataForm.createUser = data.productputinstorage.createUser
                this.dataForm.updateTime = data.productputinstorage.updateTime
                this.dataForm.updateUser = data.productputinstorage.updateUser
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
              url: this.$http.adornUrl(`/product/productputinstorage/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'productId': this.dataForm.productId,
                'zhiNumber': this.dataForm.zhiNumber,
                'boxNumber': this.dataForm.boxNumber,
                'inNumber': this.dataForm.inNumber,
                'remark': this.dataForm.remark,
                'createTime': this.dataForm.createTime,
                'createUser': this.dataForm.createUser,
                'updateTime': this.dataForm.updateTime,
                'updateUser': this.dataForm.updateUser
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
