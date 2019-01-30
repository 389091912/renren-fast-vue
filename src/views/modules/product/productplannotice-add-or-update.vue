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
      <el-form-item label="设备编号" prop="deviceId">
        <el-input v-model="dataForm.deviceId" placeholder="设备编号" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="产品编号" prop="productId">
        <el-input v-model="dataForm.productId" placeholder="产品编号" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="模具编号" prop="modelId">
        <el-input v-model="dataForm.modelId" placeholder="模具编号" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="客户编号" prop="customerProductNo">
        <el-input v-model="dataForm.customerProductNo" placeholder="客户编号" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="料重" prop="materialWeight">
        <el-input v-model="dataForm.materialWeight" placeholder="料重" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="容量" prop="volume">
        <el-input v-model="dataForm.volume" placeholder="容量" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="订单id" prop="orderId">
        <el-input v-model="dataForm.orderId" placeholder="订单id" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="订单数量" prop="orderNumber">
        <el-input v-model="dataForm.orderNumber" placeholder="订单数量" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="库存数量" prop="repertoryNumber">
        <el-input v-model="dataForm.repertoryNumber" placeholder="库存数量" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="实际需求数量" prop="needNumber">
        <el-input v-model="dataForm.needNumber" placeholder="实际需求数量" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="客户样品 有 无" prop="customerProductSytle">
        <el-input v-model="dataForm.customerProductSytle" placeholder="客户样品 有 无" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="瓶盖套装 有 无" prop="bottleCapSuit">
        <el-input v-model="dataForm.bottleCapSuit" placeholder="瓶盖套装 有 无" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="后续加工" prop="followUpProcess">
        <el-input v-model="dataForm.followUpProcess" placeholder="后续加工" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="包装要求" prop="packRequire">
        <el-input v-model="dataForm.packRequire" placeholder="包装要求" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="纸箱编号" prop="boxId">
        <el-input v-model="dataForm.boxId" placeholder="纸箱编号" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="客户要求" prop="customerRequire">
        <el-input v-model="dataForm.customerRequire" placeholder="客户要求" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="瓶身总高度" prop="bottleHight">
        <el-input v-model="dataForm.bottleHight" placeholder="瓶身总高度" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="瓶口内径" prop="bottleInDiameter">
        <el-input v-model="dataForm.bottleInDiameter" placeholder="瓶口内径" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="头径高度" prop="headNeckHeight">
        <el-input v-model="dataForm.headNeckHeight" placeholder="头径高度" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="瓶口外径" prop="bottleOutDiameter">
        <el-input v-model="dataForm.bottleOutDiameter" placeholder="瓶口外径" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="外观" prop="facadeRequire">
        <el-input v-model="dataForm.facadeRequire" placeholder="外观" style="width:260px"></el-input>
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
        deviceId: "",
        productId: "",
        modelId: "",
        customerProductNo: "",
        materialWeight: "",
        volume: "",
        orderId: "",
        orderNumber: "",
        repertoryNumber: "",
        needNumber: "",
        customerProductSytle: "",
        bottleCapSuit: "",
        followUpProcess: "",
        packRequire: "",
        boxId: "",
        customerRequire: "",
        bottleHight: "",
        bottleInDiameter: "",
        headNeckHeight: "",
        bottleOutDiameter: "",
        facadeRequire: "",
        remark: "",
        status: ""
      },
      dataRule: {
        deviceId: [
          { required: true, message: "设备编号不能为空", trigger: "blur" }
        ],
        productId: [
          { required: true, message: "产品编号不能为空", trigger: "blur" }
        ],
        modelId: [
          { required: true, message: "模具编号不能为空", trigger: "blur" }
        ],
        customerProductNo: [
          { required: true, message: "客户编号不能为空", trigger: "blur" }
        ],
        materialWeight: [
          { required: true, message: "料重不能为空", trigger: "blur" }
        ],
        volume: [{ required: true, message: "容量不能为空", trigger: "blur" }],
        orderId: [
          { required: true, message: "订单id不能为空", trigger: "blur" }
        ],
        orderNumber: [
          { required: true, message: "订单数量不能为空", trigger: "blur" }
        ],
        repertoryNumber: [
          { required: true, message: "库存数量不能为空", trigger: "blur" }
        ],
        needNumber: [
          { required: true, message: "实际需求数量不能为空", trigger: "blur" }
        ],
        customerProductSytle: [
          { required: true, message: "客户样品 有 无不能为空", trigger: "blur" }
        ],
        bottleCapSuit: [
          { required: true, message: "瓶盖套装 有 无不能为空", trigger: "blur" }
        ],
        followUpProcess: [
          { required: true, message: "后续加工不能为空", trigger: "blur" }
        ],
        packRequire: [
          { required: true, message: "包装要求不能为空", trigger: "blur" }
        ],
        boxId: [
          { required: true, message: "纸箱编号不能为空", trigger: "blur" }
        ],
        customerRequire: [
          { required: true, message: "客户要求不能为空", trigger: "blur" }
        ],
        bottleHight: [
          { required: true, message: "瓶身总高度不能为空", trigger: "blur" }
        ],
        bottleInDiameter: [
          { required: true, message: "瓶口内径不能为空", trigger: "blur" }
        ],
        headNeckHeight: [
          { required: true, message: "头径高度不能为空", trigger: "blur" }
        ],
        bottleOutDiameter: [
          { required: true, message: "瓶口外径不能为空", trigger: "blur" }
        ],
        facadeRequire: [
          { required: true, message: "外观不能为空", trigger: "blur" }
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
              `/product/productplannotice/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.deviceId = data.productPlanNotice.deviceId;
              this.dataForm.productId = data.productPlanNotice.productId;
              this.dataForm.modelId = data.productPlanNotice.modelId;
              this.dataForm.customerProductNo =data.productPlanNotice.customerProductNo;
              this.dataForm.materialWeight = data.productPlanNotice.materialWeight;
              this.dataForm.volume = data.productPlanNotice.volume;
              this.dataForm.orderId = data.productPlanNotice.orderId;
              this.dataForm.orderNumber = data.productPlanNotice.orderNumber;
              this.dataForm.repertoryNumber =data.productPlanNotice.repertoryNumber;
              this.dataForm.needNumber = data.productPlanNotice.needNumber;
              this.dataForm.customerProductSytle = data.productPlanNotice.customerProductSytle;
              this.dataForm.bottleCapSuit = data.productPlanNotice.bottleCapSuit;
              this.dataForm.followUpProcess =data.productPlanNotice.followUpProcess;
              this.dataForm.packRequire = data.productPlanNotice.packRequire;
              this.dataForm.boxId = data.productPlanNotice.boxId;
              this.dataForm.customerRequire = data.productPlanNotice.customerRequire;
              this.dataForm.bottleHight = data.productPlanNotice.bottleHight;
              this.dataForm.bottleInDiameter =data.productPlanNotice.bottleInDiameter;
              this.dataForm.headNeckHeight =data.productPlanNotice.headNeckHeight;
              this.dataForm.bottleOutDiameter =data.productPlanNotice.bottleOutDiameter;
              this.dataForm.facadeRequire = data.productPlanNotice.facadeRequire;
              this.dataForm.remark = data.productPlanNotice.remark;
              this.dataForm.createTime = data.productPlanNotice.createTime;
              this.dataForm.createUser = data.productPlanNotice.createUser;
              this.dataForm.updateTime = data.productPlanNotice.updateTime;
              this.dataForm.updateUser = data.productPlanNotice.updateUser;
              this.dataForm.status = data.productPlanNotice.status;
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
              `/product/productplannotice/${
                !this.dataForm.id ? "save" : "update"
              }`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              deviceId: this.dataForm.deviceId,
              productId: this.dataForm.productId,
              modelId: this.dataForm.modelId,
              customerProductNo: this.dataForm.customerProductNo,
              materialWeight: this.dataForm.materialWeight,
              volume: this.dataForm.volume,
              orderId: this.dataForm.orderId,
              orderNumber: this.dataForm.orderNumber,
              repertoryNumber: this.dataForm.repertoryNumber,
              needNumber: this.dataForm.needNumber,
              customerProductSytle: this.dataForm.customerProductSytle,
              bottleCapSuit: this.dataForm.bottleCapSuit,
              followUpProcess: this.dataForm.followUpProcess,
              packRequire: this.dataForm.packRequire,
              boxId: this.dataForm.boxId,
              customerRequire: this.dataForm.customerRequire,
              bottleHight: this.dataForm.bottleHight,
              bottleInDiameter: this.dataForm.bottleInDiameter,
              headNeckHeight: this.dataForm.headNeckHeight,
              bottleOutDiameter: this.dataForm.bottleOutDiameter,
              facadeRequire: this.dataForm.facadeRequire,
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
