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
      label-width="80px"
    >
      <el-form-item label="订单id" prop="orderId">
        <el-input v-model="dataForm.orderId" placeholder="订单id"></el-input>
      </el-form-item>
      <el-form-item label="产品ID" prop="productId">
        <el-input v-model="dataForm.productId" placeholder="产品ID"></el-input>
      </el-form-item>
      <el-form-item label="订单数量" prop="productNumber">
        <el-input v-model="dataForm.productNumber" placeholder="订单数量"></el-input>
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
      <el-form-item label="0为等待生产，1为取消生产，2为生产中，3为生产完成。" prop="status">
        <el-input v-model="dataForm.status" placeholder="0为等待生产，1为取消生产，2为生产中，3为生产完成。"></el-input>
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
        orderId: "",
        productId: "",
        productNumber: "",
        remark: "",
        createTime: "",
        createUser: "",
        updateTime: "",
        updateUser: "",
        status: ""
      },
      dataRule: {
        orderId: [
          { required: true, message: "订单id不能为空", trigger: "blur" }
        ],
        productId: [
          { required: true, message: "产品ID不能为空", trigger: "blur" }
        ],
        productNumber: [
          { required: true, message: "订单数量不能为空", trigger: "blur" }
        ],
        remark: [{ required: true, message: "备注不能为空", trigger: "blur" }],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        createUser: [
          { required: true, message: "创建人员id不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        updateUser: [
          { required: true, message: "更新人员id不能为空", trigger: "blur" }
        ],
        status: [
          {
            required: true,
            message:
              "0为等待生产，1为取消生产，2为生产中，3为生产完成。不能为空",
            trigger: "blur"
          }
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
              `/product/productorderdetail/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.orderId = data.productorderdetail.orderId;
              this.dataForm.productId = data.productorderdetail.productId;
              this.dataForm.productNumber =
                data.productorderdetail.productNumber;
              this.dataForm.remark = data.productorderdetail.remark;
              this.dataForm.createTime = data.productorderdetail.createTime;
              this.dataForm.createUser = data.productorderdetail.createUser;
              this.dataForm.updateTime = data.productorderdetail.updateTime;
              this.dataForm.updateUser = data.productorderdetail.updateUser;
              this.dataForm.status = data.productorderdetail.status;
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
              `/product/productorderdetail/${
                !this.dataForm.id ? "save" : "update"
              }`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              orderId: this.dataForm.orderId,
              productId: this.dataForm.productId,
              productNumber: this.dataForm.productNumber,
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
