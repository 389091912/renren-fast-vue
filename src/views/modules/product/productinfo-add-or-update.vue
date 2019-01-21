<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="130px">
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
    <el-form-item label="产品图片" prop="productImage">
     <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    </el-form-item>
    <el-form-item label="产品图纸" prop="productDrawing">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="产品容量" prop="productVolume">
      <el-input v-model="dataForm.productVolume" placeholder="产品容量"></el-input>
    </el-form-item>
    <el-form-item label="产品批次" prop="productBatch">
      <el-input v-model="dataForm.productBatch" placeholder="产品批次"></el-input>
    </el-form-item>
    <el-form-item label="产品问题" prop="productQuestion">
      <el-input v-model="dataForm.productQuestion" type="textarea" placeholder="产品问题"></el-input>
    </el-form-item>
    <el-form-item label="产品组合套" prop="productAssort">
      <el-input v-model="dataForm.productAssort" placeholder="产品组合套"></el-input>
    </el-form-item>
    <el-form-item label="产品后续加工" prop="productTrailingProcess">
      <el-input v-model="dataForm.productTrailingProcess" type="textarea" placeholder="产品后续加工"></el-input>
    </el-form-item>
    <el-form-item label="产品备注" prop="productRemark">
      <el-input v-model="dataForm.productRemark" placeholder="产品备注" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="产品成品率" prop="yield">
      <el-input v-model="dataForm.yield"  placeholder="产品成品率"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>



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
          productImage: '',
          productDrawing: '',
          productVolume: '',
          productBatch: '',
          productQuestion: '',
          productAssort: '',
          productTrailingProcess: '',
          productRemark: '',
          yield: '',
          productCategory: ''
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
          productImage: [
            { required: true, message: '产品图片不能为空', trigger: 'blur' }
          ],
          productDrawing: [
            { required: true, message: '产品图纸不能为空', trigger: 'blur' }
          ],
          productVolume: [
            { required: true, message: '产品容量不能为空', trigger: 'blur' }
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
                this.dataForm.productImage = data.productinfo.productImage
                this.dataForm.productDrawing = data.productinfo.productDrawing
                this.dataForm.productVolume = data.productinfo.productVolume
                this.dataForm.productBatch = data.productinfo.productBatch
                this.dataForm.productQuestion = data.productinfo.productQuestion
                this.dataForm.productAssort = data.productinfo.productAssort
                this.dataForm.productTrailingProcess = data.productinfo.productTrailingProcess
                this.dataForm.productRemark = data.productinfo.productRemark
                this.dataForm.yield = data.productinfo.yield
                this.dataForm.productCategory = data.productinfo.productCategory
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
                'productImage': this.dataForm.productImage,
                'productDrawing': this.dataForm.productDrawing,
                'productVolume': this.dataForm.productVolume,
                'productBatch': this.dataForm.productBatch,
                'productQuestion': this.dataForm.productQuestion,
                'productAssort': this.dataForm.productAssort,
                'productTrailingProcess': this.dataForm.productTrailingProcess,
                'productRemark': this.dataForm.productRemark,
                'yield': this.dataForm.yield,
                'productCategory': this.dataForm.productCategory
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
       handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    
    }
  }
</script>
