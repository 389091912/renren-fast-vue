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
      <el-form-item label="订单编号" prop="orderNo">
        <el-input v-model="dataForm.orderNo" placeholder="订单编号" style="width:260px"></el-input>
        <el-button type="success" style="margin-left:50px;margin-bommon:-30px" @click="addDomain">添加产品</el-button>
      </el-form-item>
        
      <div
        v-for="(product, index) in dynamicValidateForm.domains"
        :key="product.key"
        :prop="'product.' + index + '.value'"
        ref="domain"
      >
        <el-form-item :label="(index+1)+'、产品ID'" prop="productId">

          <el-select v-model="product.productId" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item  style="margin-left:300px;margin-top:-55px"
                  label="数量"
                  prop="zhiNumber"
                  :rules="[{ required: true, message: '请输入数量', trigger: 'blur' },  ]">
                  <el-input
                    v-model.number="product.zhiNumber"
                    placeholder="数量"
                    maxlength="10"
                    style="width:200px">
                  </el-input>
          <el-button type="danger" style="margin-left:50px;" v-if="index!='0'"   @click.prevent="removeDomain(index)">删除</el-button>
          </el-form-item>
      </div>
      <el-form-item label="订单时间" prop="orderTime">
        <el-date-picker
          v-model="dataForm.orderTime"
          type="date"
          style="width:260px"
          placeholder="订单时间">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="员工id" prop="employeeId">
        <el-input v-model="dataForm.employeeId" placeholder="员工id"></el-input>
      </el-form-item> -->
      <el-form-item label="客户" prop="customer">
        <el-input v-model="dataForm.customer" placeholder="客户" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="交货时间" prop="deliveryTime">
        <el-date-picker
          v-model="dataForm.deliveryTime"
          type="date"
          style="width:260px"
          placeholder="交货时间">
        </el-date-picker>
      </el-form-item>
    
      <el-form-item label="订单状态" prop="status">
        <el-input v-model="dataForm.status" placeholder=" 0为正常，1为取消订单，2为订单加急，3为订单挂起" style="width:260px"></el-input>
      </el-form-item>
       <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="dataForm.remark" placeholder="备注" style="width:260px"></el-input>
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
      dynamicValidateForm: {
        domains: [
          {
            value: "",
            productId: "",
            zhiNumber: "",
            boxNumber: "",
            outNumber: "",
            remark: "",
            createTime: "",
            createUser: "",
            updateTime: "",
            updateUser: ""
          }
        ]
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      dataForm: {
        id: 0,
        orderNo: "",
        orderTime: "",
        employeeId: "",
        customer: "",
        deliveryTime: "",
        createUser: "",
        createTime: "",
        updateId: "",
        updateTime: "",
        status: "",
        remark: ""
      },
      dataRule: {
        orderNo: [
          { required: true, message: "订单编号不能为空", trigger: "blur" }
        ],
        orderTime: [
          { required: true, message: "订单时间不能为空", trigger: "blur" }
        ],
        employeeId: [
          { required: true, message: "员工id不能为空", trigger: "blur" }
        ],
        customer: [
          { required: true, message: "客户不能为空", trigger: "blur" }
        ],
        deliveryTime: [
          { required: true, message: "交货时间不能为空", trigger: "blur" }
        ],
        createUser: [
          { required: true, message: "创建者不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateId: [
          { required: true, message: "更新者不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        status: [
          {
            required: true,
            message:
              "订单状态 0为正常订单正常生产，1为取消订单，2为订单加急，3为订单挂起不能为空",
            trigger: "blur"
          }
        ],
        remark: [{ required: true, message: "备注不能为空", trigger: "blur" }]
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
              `/product/productorder/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.orderNo = data.productOrder.orderNo;
              this.dataForm.orderTime = data.productOrder.orderTime;
              this.dataForm.employeeId = data.productOrder.employeeId;
              this.dataForm.customer = data.productOrder.customer;
              this.dataForm.deliveryTime = data.productOrder.deliveryTime;
              this.dataForm.createUser = data.productOrder.createUser;
              this.dataForm.createTime = data.productOrder.createTime;
              this.dataForm.updateId = data.productOrder.updateId;
              this.dataForm.updateTime = data.productOrder.updateTime;
              this.dataForm.status = data.productOrder.status;
              this.dataForm.remark = data.productOrder.remark;
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
              `/product/productorder/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              orderNo: this.dataForm.orderNo,
              orderTime: this.dataForm.orderTime,
              employeeId: this.dataForm.employeeId,
              customer: this.dataForm.customer,
              deliveryTime: this.dataForm.deliveryTime,
              createUser: this.dataForm.createUser,
              createTime: this.dataForm.createTime,
              updateId: this.dataForm.updateId,
              updateTime: this.dataForm.updateTime,
              status: this.dataForm.status,
              remark: this.dataForm.remark
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
    },
    removeDomain(index) {
    //var index = this.dynamicValidateForm.domains.indexOf(item);
    if (index !== -1) {
      this.dynamicValidateForm.domains.splice(index, 1);
    }
  },
  addDomain() {
    this.dynamicValidateForm.domains.push({
      value: "",
      key: Date.now()
    });
  }

  }
};
</script>
