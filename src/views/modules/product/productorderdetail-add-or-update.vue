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
      <el-form-item label="订单id" prop="orderNo">
        
        <el-input  v-model="dataForm.orderNo" disabled  placeholder="订单编号" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="产品名称" prop="productName">
        <el-input v-model="dataForm.productName" disabled placeholder="产品名称" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="订单数量" prop="productNumber">
        <el-input v-model="dataForm.productNumber" placeholder="订单数量" style="width:260px">
           <template slot="append">万件</template>
        </el-input>
      </el-form-item>
       <el-form-item label="产品克数" prop="productWeight">
        <el-input v-model="dataForm.productWeight" placeholder="产品克数" style="width:260px">
      <template slot="append">克</template>
        </el-input>
      </el-form-item>
      <el-form-item 
                  label="纸箱供应方式"
                  prop="boxSupplyWay"
                >
              <el-radio-group v-model="dataForm.boxSupplyWay" >
              <el-radio :label="0">客供</el-radio>
              <el-radio :label="1">自供</el-radio>
            </el-radio-group>
       </el-form-item>
      <template v-if="dataForm.boxSupplyWay==1">
        <el-form-item label="纸箱厂" prop="factoryId" >
              <el-select v-model="dataForm.boxFactoryId" 
              default-first-option 
            style="width:260px" clearable filterable placeholder="请选择纸箱厂商">
                <el-option
                  v-for="item1 in productBoxFactoryList"
                  :key="item1.id"
                  :label="item1.name"
                  :value="item1.id">
                </el-option>
              </el-select>
        </el-form-item>

      <el-form-item  label="所需纸箱数量" prop="needBoxNumber" >
                    <el-input
                      v-model.number="dataForm.needBoxNumber"
                      placeholder="所需纸箱数量"
                      maxlength="10"
                     style="width:260px">
                      <template slot="append">件</template>
                    </el-input>
      </el-form-item>
      </template>
      <el-form-item label="订单生产状态" prop="status">
        <!-- 0为等待生产，1为取消生产，2为生产中，3为生产完成。 -->
        <el-select v-model="dataForm.status" 
        default-first-option
        style="width:260px" filterable placeholder="请选择生产状态">
          <el-option
            v-for="item in productStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!-- <el-input v-model="dataForm.status" placeholder="0为等待生产，1为取消生产，2为生产中，3为生产完成。" style="width:260px"></el-input> -->
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
        orderNo: "",
        productId: "",
        productName: "",
        productNumber: "",
        productWeight: "",
        boxSupplyWay:"",
        status:"",
        remark: "",
        boxFactoryId:"",
        needBoxNumber:"",
      },
      productBoxFactoryList:[],
      productStatusList:[
        {
          value: 0,
          label: '等待生产'
      },
        {
          value: 1,
          label: '生产中'
      },
        {
          value: 2,
          label: '生产完成'
      },
        {
          value: 3,
          label: '取消生产'
      },
      ],

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
      }
    };
  },
  methods: {
  getAllBoxFactoryList(){
            this.$http({
            url:this.$http.adornUrl(`/product/boxfactory/getAllBoxFactoryList`),
            method: "get"
        }).then(({data})=>{
          if(data &&data.code==0){
            this.productBoxFactoryList=data.productBoxFactoryList;
          }else {
              this.$message.error(data.msg);
          }
        })
      },
    init(id) {
      this.dataForm.id = id || 0;
      this.dataForm.orderNo="HX"+""+new Date();
      this.getAllBoxFactoryList();
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
              this.dataForm.orderId = data.productOrderDetail.orderId;
              this.dataForm.orderNo = data.productOrderDetail.orderNo;
              this.dataForm.productId = data.productOrderDetail.productId;
              this.dataForm.productName = data.productOrderDetail.productName;
              this.dataForm.productNumber = data.productOrderDetail.productNumber;
              this.dataForm.productWeight = data.productOrderDetail.productWeight;
              this.dataForm.boxSupplyWay = data.productOrderDetail.boxSupplyWay;
              this.dataForm.remark = data.productOrderDetail.remark;
              this.dataForm.status = data.productOrderDetail.status;
              this.dataForm.needBoxNumber = data.productOrderDetail.needBoxNumber;
              this.dataForm.boxFactoryId = data.productOrderDetail.boxFactoryId;
    
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
              productWeight: this.dataForm.productWeight,
              boxSupplyWay: this.dataForm.boxSupplyWay,
              remark: this.dataForm.remark,
              status:this.dataForm.status,
              boxFactoryId:this.dataForm.boxFactoryId,
              needBoxNumber:this.dataForm.needBoxNumber,
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
