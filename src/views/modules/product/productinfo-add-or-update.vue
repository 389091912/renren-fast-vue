<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="产品名称" prop="productName">
      <el-input v-model="dataForm.productName" placeholder="产品名称"></el-input>
    </el-form-item>
    <el-form-item label="模具编号" prop="modelNo">
      <el-input v-model="dataForm.modelNo" placeholder="模具编号"></el-input>
    </el-form-item>
    <el-form-item label="客户产品编号" prop="customerProductNo">
      <el-input v-model="dataForm.customerProductNo" placeholder="客户产品编号"></el-input>
    </el-form-item>
    <el-form-item label="纸箱编号" prop="cartonId">
      <el-input v-model="dataForm.cartonId" placeholder="纸箱编号"></el-input>
    </el-form-item>
    <el-form-item label="库存数量" prop="productNum">
      <el-input v-model="dataForm.productNum" placeholder="库存数量"></el-input>
    </el-form-item>
    <el-form-item label="产品克数" prop="productWeight">
      <el-input v-model="dataForm.productWeight" placeholder="产品克数"></el-input>
    </el-form-item>
    <el-form-item label="产品容量" prop="productVolume">
      <el-input v-model="dataForm.productVolume" placeholder="产品容量"></el-input>
    </el-form-item>
    <el-form-item label="产品图片" prop="productImageId">
      <el-input v-model="dataForm.productImageId" placeholder="产品图片"></el-input>
    </el-form-item>
    <el-form-item label="产品图纸" prop="productDrawingId">
      <el-input v-model="dataForm.productDrawingId" placeholder="产品图纸"></el-input>
    </el-form-item>
    <el-form-item label="产品批次" prop="productBatch">
      <el-input v-model="dataForm.productBatch" placeholder="产品批次"></el-input>
    </el-form-item>
    <el-form-item label="产品问题" prop="productQuestion">
      <el-input v-model="dataForm.productQuestion" placeholder="产品问题"></el-input>
    </el-form-item>
    <el-form-item label="产品组合套" prop="productAssort">
      <el-input v-model="dataForm.productAssort" placeholder="产品组合套"></el-input>
    </el-form-item>
    <el-form-item label="产品后续加工" prop="productTrailingProcess">
      <el-input v-model="dataForm.productTrailingProcess" placeholder="产品后续加工"></el-input>
    </el-form-item>
    <el-form-item label="产品备注" prop="productRemark">
      <el-input v-model="dataForm.productRemark" placeholder="产品备注"></el-input>
    </el-form-item>
    <el-form-item label="产品成品率" prop="yield">
      <el-input v-model="dataForm.yield" placeholder="产品成品率"></el-input>
    </el-form-item>
    <el-form-item label="产品分类" prop="productCategory">
      <el-input v-model="dataForm.productCategory" placeholder="产品分类"></el-input>
    </el-form-item>
    <el-form-item label="创建日期" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建日期"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createUser">
      <el-input v-model="dataForm.createUser" placeholder="创建时间"></el-input>
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
          productName: '',
          modelNo: '',
          customerProductNo: '',
          cartonId: '',
          productNum: '',
          productWeight: '',
          productVolume: '',
          productImageId: '',
          productDrawingId: '',
          productBatch: '',
          productQuestion: '',
          productAssort: '',
          productTrailingProcess: '',
          productRemark: '',
          yield: '',
          productCategory: '',
          createTime: '',
          createUser: '',
          updateTime: '',
          updateUser: '',
          status: ''
        },
        dataRule: {
          productName: [
            { required: true, message: '产品名称不能为空', trigger: 'blur' }
          ],
          modelNo: [
            { required: true, message: '模具编号不能为空', trigger: 'blur' }
          ],
          customerProductNo: [
            { required: true, message: '客户产品编号不能为空', trigger: 'blur' }
          ],
          cartonId: [
            { required: true, message: '纸箱编号不能为空', trigger: 'blur' }
          ],
          productNum: [
            { required: true, message: '库存数量不能为空', trigger: 'blur' }
          ],
          productWeight: [
            { required: true, message: '产品克数不能为空', trigger: 'blur' }
          ],
          productVolume: [
            { required: true, message: '产品容量不能为空', trigger: 'blur' }
          ],
          productImageId: [
            { required: true, message: '产品图片不能为空', trigger: 'blur' }
          ],
          productDrawingId: [
            { required: true, message: '产品图纸不能为空', trigger: 'blur' }
          ],
          productBatch: [
            { required: true, message: '产品批次不能为空', trigger: 'blur' }
          ],
          productQuestion: [
            { required: true, message: '产品问题不能为空', trigger: 'blur' }
          ],
          productAssort: [
            { required: true, message: '产品组合套不能为空', trigger: 'blur' }
          ],
          productTrailingProcess: [
            { required: true, message: '产品后续加工不能为空', trigger: 'blur' }
          ],
          productRemark: [
            { required: true, message: '产品备注不能为空', trigger: 'blur' }
          ],
          yield: [
            { required: true, message: '产品成品率不能为空', trigger: 'blur' }
          ],
          productCategory: [
            { required: true, message: '产品分类不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建日期不能为空', trigger: 'blur' }
          ],
          createUser: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/product/productinfo/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.productName = data.productinfo.productName
                this.dataForm.modelNo = data.productinfo.modelNo
                this.dataForm.customerProductNo = data.productinfo.customerProductNo
                this.dataForm.cartonId = data.productinfo.cartonId
                this.dataForm.productNum = data.productinfo.productNum
                this.dataForm.productWeight = data.productinfo.productWeight
                this.dataForm.productVolume = data.productinfo.productVolume
                this.dataForm.productImageId = data.productinfo.productImageId
                this.dataForm.productDrawingId = data.productinfo.productDrawingId
                this.dataForm.productBatch = data.productinfo.productBatch
                this.dataForm.productQuestion = data.productinfo.productQuestion
                this.dataForm.productAssort = data.productinfo.productAssort
                this.dataForm.productTrailingProcess = data.productinfo.productTrailingProcess
                this.dataForm.productRemark = data.productinfo.productRemark
                this.dataForm.yield = data.productinfo.yield
                this.dataForm.productCategory = data.productinfo.productCategory
                this.dataForm.createTime = data.productinfo.createTime
                this.dataForm.createUser = data.productinfo.createUser
                this.dataForm.updateTime = data.productinfo.updateTime
                this.dataForm.updateUser = data.productinfo.updateUser
                this.dataForm.status = data.productinfo.status
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
              url: this.$http.adornUrl(`/product/productinfo/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'productName': this.dataForm.productName,
                'modelNo': this.dataForm.modelNo,
                'customerProductNo': this.dataForm.customerProductNo,
                'cartonId': this.dataForm.cartonId,
                'productNum': this.dataForm.productNum,
                'productWeight': this.dataForm.productWeight,
                'productVolume': this.dataForm.productVolume,
                'productImageId': this.dataForm.productImageId,
                'productDrawingId': this.dataForm.productDrawingId,
                'productBatch': this.dataForm.productBatch,
                'productQuestion': this.dataForm.productQuestion,
                'productAssort': this.dataForm.productAssort,
                'productTrailingProcess': this.dataForm.productTrailingProcess,
                'productRemark': this.dataForm.productRemark,
                'yield': this.dataForm.yield,
                'productCategory': this.dataForm.productCategory,
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
