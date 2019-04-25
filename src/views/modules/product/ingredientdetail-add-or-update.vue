<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="供货商名称" prop="supplierId">
      <el-input v-model="dataForm.supplierId" placeholder="供货商名称"></el-input>
    </el-form-item>
    <el-form-item label="原料名称" prop="ingredientId">
      <el-input v-model="dataForm.ingredientId" placeholder="原料名称"></el-input>
    </el-form-item>
    <el-form-item label="吨数" prop="weight">
      <el-input v-model="dataForm.weight" placeholder="吨数"></el-input>
    </el-form-item>
    <el-form-item label="价格" prop="price">
      <el-input v-model="dataForm.price" placeholder="价格"></el-input>
    </el-form-item>
    <el-form-item label="票号" prop="tickerNumber">
      <el-input v-model="dataForm.tickerNumber" placeholder="票号"></el-input>
    </el-form-item>
    <el-form-item label="类型0为入库，1为出库" prop="type">
      <el-input v-model="dataForm.type" placeholder="类型0为入库，1为出库"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="imageUrl">
      <el-input v-model="dataForm.imageUrl" placeholder="图片"></el-input>
    </el-form-item>
    <el-form-item label="" prop="createUser">
      <el-input v-model="dataForm.createUser" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="updateUser">
      <el-input v-model="dataForm.updateUser" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="" prop="updataTime">
      <el-input v-model="dataForm.updataTime" placeholder=""></el-input>
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
          supplierId: '',
          ingredientId: '',
          weight: '',
          price: '',
          tickerNumber: '',
          type: '',
          imageUrl: '',
          createUser: '',
          createTime: '',
          updateUser: '',
          updataTime: ''
        },
        dataRule: {
          supplierId: [
            { required: true, message: '供货商名称不能为空', trigger: 'blur' }
          ],
          ingredientId: [
            { required: true, message: '原料名称不能为空', trigger: 'blur' }
          ],
          weight: [
            { required: true, message: '吨数不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '价格不能为空', trigger: 'blur' }
          ],
          tickerNumber: [
            { required: true, message: '票号不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '类型0为入库，1为出库不能为空', trigger: 'blur' }
          ],
          imageUrl: [
            { required: true, message: '图片不能为空', trigger: 'blur' }
          ],
          createUser: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          updateUser: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          updataTime: [
            { required: true, message: '不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/product/ingredientdetail/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.supplierId = data.ingredientdetail.supplierId
                this.dataForm.ingredientId = data.ingredientdetail.ingredientId
                this.dataForm.weight = data.ingredientdetail.weight
                this.dataForm.price = data.ingredientdetail.price
                this.dataForm.tickerNumber = data.ingredientdetail.tickerNumber
                this.dataForm.type = data.ingredientdetail.type
                this.dataForm.imageUrl = data.ingredientdetail.imageUrl
                this.dataForm.createUser = data.ingredientdetail.createUser
                this.dataForm.createTime = data.ingredientdetail.createTime
                this.dataForm.updateUser = data.ingredientdetail.updateUser
                this.dataForm.updataTime = data.ingredientdetail.updataTime
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
              url: this.$http.adornUrl(`/product/ingredientdetail/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'supplierId': this.dataForm.supplierId,
                'ingredientId': this.dataForm.ingredientId,
                'weight': this.dataForm.weight,
                'price': this.dataForm.price,
                'tickerNumber': this.dataForm.tickerNumber,
                'type': this.dataForm.type,
                'imageUrl': this.dataForm.imageUrl,
                'createUser': this.dataForm.createUser,
                'createTime': this.dataForm.createTime,
                'updateUser': this.dataForm.updateUser,
                'updataTime': this.dataForm.updataTime
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
