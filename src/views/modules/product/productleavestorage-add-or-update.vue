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
      <el-form-item label="产品id" prop="productId">
        <el-input v-model="dataForm.productId" placeholder="产品id" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="出库数量" prop="productOutNumber">
        <el-input v-model="dataForm.productOutNumber" placeholder="出库数量" style="width:260px">
          <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="纸箱id" prop="boxId">
        <el-input v-model="dataForm.boxId" placeholder="纸箱id" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="箱子数" prop="boxNumber">
        <el-input v-model="dataForm.boxNumber" placeholder="箱子数" style="width:260px">
          <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="订单编号" prop="orderId">
        <el-input v-model="dataForm.orderId" placeholder="订单编号" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="出库时间" prop="outTime">
        <el-date-picker
          v-model="dataForm.outTime"
          type="date"
          style="width:260px"
          placeholder="出库时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="签收时间" prop="signTime">
        <el-date-picker
          v-model="dataForm.signTime"
          type="date"
          style="width:260px"
          placeholder="签收时间"
        ></el-date-picker>
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
        productOutNumber: "",
        boxId: "",
        boxNumber: "",
        orderId: "",
        outTime: "",
        signTime: "",
        createUser: "",
        createTime: "",
        updateUser: "",
        remark: "",
        updateTime: "",
        status: ""
      },
      dataRule: {
        productId: [
          { required: true, message: "产品id不能为空", trigger: "blur" }
        ],
        productOutNumber: [
          { required: true, message: "出库数量不能为空", trigger: "blur" }
        ],
        boxId: [{ required: true, message: "纸箱id不能为空", trigger: "blur" }],
        boxNumber: [
          { required: true, message: "箱子数不能为空", trigger: "blur" }
        ],
        orderId: [
          { required: true, message: "订单编号不能为空", trigger: "blur" }
        ],
        outTime: [
          { required: true, message: "出库时间不能为空", trigger: "blur" }
        ],
        signTime: [
          { required: true, message: "签收时间不能为空", trigger: "blur" }
        ]
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
              `/product/productleavestorage/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.productId = data.productLeaveStorage.productId;
              this.dataForm.productOutNumber =data.productLeaveStorage.productOutNumber;
              this.dataForm.boxId = data.productLeaveStorage.boxId;
              this.dataForm.boxNumber = data.productLeaveStorage.boxNumber;
              this.dataForm.orderId = data.productLeaveStorage.orderId;
              this.dataForm.outTime = data.productLeaveStorage.outTime;
              this.dataForm.signTime = data.productLeaveStorage.signTime;
              this.dataForm.createUser = data.productLeaveStorage.createUser;
              this.dataForm.createTime = data.productLeaveStorage.createTime;
              this.dataForm.updateUser = data.productLeaveStorage.updateUser;
              this.dataForm.remark = data.productLeaveStorage.remark;
              this.dataForm.updateTime = data.productLeaveStorage.updateTime;
              this.dataForm.status = data.productLeaveStorage.status;
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
              `/product/productleavestorage/${
                !this.dataForm.id ? "save" : "update"
              }`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              productId: this.dataForm.productId,
              productOutNumber: this.dataForm.productOutNumber,
              boxId: this.dataForm.boxId,
              boxNumber: this.dataForm.boxNumber,
              orderId: this.dataForm.orderId,
              outTime: this.dataForm.outTime,
              signTime: this.dataForm.signTime,
              createUser: this.dataForm.createUser,
              createTime: this.dataForm.createTime,
              updateUser: this.dataForm.updateUser,
              remark: this.dataForm.remark,
              updateTime: this.dataForm.updateTime,
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
