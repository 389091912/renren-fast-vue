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
      <el-form-item label="产品ID" prop="productId">
        <el-input v-model="dataForm.productId" placeholder="产品ID" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="只数" prop="zhiNumber">
        <el-input v-model="dataForm.zhiNumber" placeholder="只数" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="纸箱id" prop="boxId">
        <el-input v-model="dataForm.boxId" placeholder="纸箱id" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="箱数" prop="boxNumber">
        <el-input v-model="dataForm.boxNumber" placeholder="箱数" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="入库数量" prop="productNumber">
        <el-input v-model="dataForm.productNumber" placeholder="入库数量" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="入库时间" prop="putInTime">
         <el-date-picker
          v-model="dataForm.putInTime"
          type="date"
          style="width:260px"
          placeholder="入库时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注" style="width:260px"></el-input>
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
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        productId: "",
        zhiNumber: "",
        boxId: "",
        boxNumber: "",
        productNumber: "",
        putInTime: "",
        remark: "",
      
      },
      dataRule: {
        productId: [
          { required: true, message: "产品ID不能为空", trigger: "blur" }
        ],
        zhiNumber: [
          { required: true, message: "只数不能为空", trigger: "blur" }
        ],
        boxId: [{ required: true, message: "纸箱id不能为空", trigger: "blur" }],
        boxNumber: [
          { required: true, message: "箱数不能为空", trigger: "blur" }
        ],
        productNumber: [
          { required: true, message: "入库数量不能为空", trigger: "blur" }
        ],
        putInTime: [
          { required: true, message: "入库时间不能为空", trigger: "blur" }
        ],
      
      }
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/product/productputinstorage/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.productId = data.productPutInStorage.productId;
              this.dataForm.zhiNumber = data.productPutInStorage.zhiNumber;
              this.dataForm.boxId = data.productPutInStorage.boxId;
              this.dataForm.boxNumber = data.productPutInStorage.boxNumber;
              this.dataForm.productNumber = data.productPutInStorage.productNumber;
              this.dataForm.putInTime = data.productPutInStorage.putInTime;
              this.dataForm.remark = data.productPutInStorage.remark;
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
              `/product/productputinstorage/${
                !this.dataForm.id ? "save" : "update"
              }`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              productId: this.dataForm.productId,
              zhiNumber: this.dataForm.zhiNumber,
              boxId: this.dataForm.boxId,
              boxNumber: this.dataForm.boxNumber,
              productNumber: this.dataForm.productNumber,
              putInTime: this.dataForm.putInTime,
              remark: this.dataForm.remark,
              createTime: this.dataForm.createTime,
              createUser: this.dataForm.createUser,
              updateTime: this.dataForm.updateTime,
              updateUser: this.dataForm.updateUser,
              status: this.dataForm.status
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
};
</script>
