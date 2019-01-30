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
      <el-form-item label="产品名称" prop="productName">
        <el-input v-model="dataForm.productName" placeholder="产品名称"  style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="模具编号" prop="modelNo">
        <el-input v-model="dataForm.modelNo" placeholder="模具编号"  style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="客户产品编号" prop="customerProductNo">
        <el-input v-model="dataForm.customerProductNo" placeholder="客户产品编号"  style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="纸箱编号" prop="cartonId">
        <el-input v-model="dataForm.cartonId" placeholder="纸箱编号"  style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="库存数量" prop="productNum">
        <el-input v-model.number="dataForm.productNum" placeholder="库存数量"  style="width:260px">
           <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="产品克数" prop="productWeight"  >
        <el-input v-model.number="dataForm.productWeight" placeholder="产品克数" style="width:260px">
           <template slot="append">克</template>
        </el-input>
      </el-form-item>
      <el-form-item label="产品容量" prop="productVolume">
        <el-input v-model.number="dataForm.productVolume" placeholder="产品容量"  style="width:260px">
             <template slot="append">毫升</template>
        </el-input>
      </el-form-item>

      <el-form-item label="产品图片" prop="productImageId">
        <el-upload
          :action="uploadImageUrl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- <el-upload
          class="avatar-uploader"
          :action="url"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
        <!-- <el-input v-model="dataForm.productImageId" placeholder="产品图片"  style="width:260px"></el-input> -->
      </el-form-item>

      <el-form-item label="产品图纸" prop="productDrawingId">
      <el-upload
        class="upload-demo"
        drag
        :action="uploadDesignUrl"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      </el-form-item>

      <el-form-item label="产品批次" prop="productBatch">
        <el-input v-model="dataForm.productBatch" placeholder="产品批次" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="产品问题" prop="productQuestion">
        <el-input v-model="dataForm.productQuestion" type="textarea" size='medium' placeholder="产品问题" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="产品组合套" prop="productAssort">
        <el-input v-model="dataForm.productAssort" placeholder="产品组合套" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="产品后续加工" prop="productTrailingProcess">
        <el-input v-model="dataForm.productTrailingProcess" placeholder="产品后续加工" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="产品备注" prop="productRemark">
        <el-input v-model="dataForm.productRemark" type="textarea" size='small' placeholder="产品备注" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="产品成品率" prop="yield">
        <el-input v-model="dataForm.yield" placeholder="产品成品率" style="width:260px">
             <template slot="append">%</template>
        </el-input>
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
 .el-textarea__inner{
    height: 99px;
  }
  .el-upload-dragger{
    width: 260px;
  }
</style>


<script>
export default {
  data() {
    return {
      visible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      url:"",
      dataForm: {
        id: 0,
        productName: "",
        modelNo: "",
        customerProductNo: "",
        cartonId: "",
        productNum: "",
        productWeight: "",
        productVolume: "",
        productImageId: "",
        productDrawingId: "",
        productBatch: "",
        productQuestion: "",
        productAssort: "",
        productTrailingProcess: "",
        productRemark: "",
        yield: "",
        productCategory: "",
      },
      dataRule: {
        productName: [
          { required: true, message: "产品名称不能为空", trigger: "blur" }
        ],
        modelNo: [
          { required: true, message: "模具编号不能为空", trigger: "blur" }
        ],
        customerProductNo: [
          { required: true, message: "客户产品编号不能为空", trigger: "blur" }
        ],
        cartonId: [
          { required: true, message: "纸箱编号不能为空", trigger: "blur" }
        ],
        productNum: [
          { required: true, message: "库存数量不能为空", trigger: "blur" }
        ],
        productWeight: [
          { required: true, message: "产品克数不能为空", trigger: "blur" }
        ],
        productVolume: [
          { required: true, message: "产品容量不能为空", trigger: "blur" }
        ],
        productImageId: [
          { required: true, message: "产品图片不能为空", trigger: "blur" }
        ],
        productDrawingId: [
          { required: true, message: "产品图纸不能为空", trigger: "blur" }
        ],
        productBatch: [
          { required: true, message: "产品批次不能为空", trigger: "blur" }
        ],
        productQuestion: [
          { required: true, message: "产品问题不能为空", trigger: "blur" }
        ],
        productAssort: [
          { required: true, message: "产品组合套不能为空", trigger: "blur" }
        ],
        productTrailingProcess: [
          { required: true, message: "产品后续加工不能为空", trigger: "blur" }
        ],
        productRemark: [
          { required: true, message: "产品备注不能为空", trigger: "blur" }
        ],
        yield: [
          { required: true, message: "产品成品率不能为空", trigger: "blur" }
        ],
      }
    };
  },
  methods: {

     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
    init(id) {
      this.uploadImageUrl = this.$http.adornUrl(`/sys/oss/uploadImage?token=${this.$cookie.get('token')}`)
      this.uploadDesignUrl = this.$http.adornUrl(`/sys/oss/uploadDesignFile?token=${this.$cookie.get('token')}`)
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/product/productinfo/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.productName = data.productInfo.productName;
              this.dataForm.modelNo = data.productInfo.modelNo;
              this.dataForm.customerProductNo = data.productInfo.customerProductNo;
              this.dataForm.cartonId = data.productInfo.cartonId;
              this.dataForm.productNum = data.productInfo.productNum;
              this.dataForm.productWeight = data.productInfo.productWeight;
              this.dataForm.productVolume = data.productInfo.productVolume;
              this.dataForm.productImageId = data.productInfo.productImageId;
              this.dataForm.productDrawingId = data.productInfo.productDrawingId;
              this.dataForm.productBatch = data.productInfo.productBatch;
              this.dataForm.productQuestion = data.productInfo.productQuestion;
              this.dataForm.productAssort = data.productInfo.productAssort;
              this.dataForm.productTrailingProcess = data.productInfo.productTrailingProcess;
              this.dataForm.productRemark = data.productInfo.productRemark;
              this.dataForm.yield = data.productInfo.yield;
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/product/productinfo/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              productName: this.dataForm.productName,
              modelNo: this.dataForm.modelNo,
              customerProductNo: this.dataForm.customerProductNo,
              cartonId: this.dataForm.cartonId,
              productNum: this.dataForm.productNum,
              productWeight: this.dataForm.productWeight,
              productVolume: this.dataForm.productVolume,
              productImageId: this.dataForm.productImageId,
              productDrawingId: this.dataForm.productDrawingId,
              productBatch: this.dataForm.productBatch,
              productQuestion: this.dataForm.productQuestion,
              productAssort: this.dataForm.productAssort,
              productTrailingProcess: this.dataForm.productTrailingProcess,
              productRemark: this.dataForm.productRemark,
              yield: this.dataForm.yield,
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    }
  }
}
</script>
