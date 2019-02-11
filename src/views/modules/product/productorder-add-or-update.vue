<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="1150px"
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
        v-for="(product, index) in ProductDetailVo"
        :key="index"
        :prop="'product.' + index + '.value'"
        ref="domain"
      >
        <el-form-item :label="(index+1)+'、产品'" prop="productId">

          <el-select v-model="product.productId" filterable placeholder="请选择">
            <el-option
              v-for="item in productList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item  style="margin-left:250px;margin-top:-60px"
                  label="数量"
                  prop="productNumber"
                >
          <el-input
            v-model.number="product.productNumber"
            placeholder="数量"
            maxlength="10"
            style="width:150px">
            <template slot="append">件</template>
          </el-input>

          </el-form-item>
           <el-form-item  style="margin-left:460px;margin-top:-55px"
                  label="克数"
                  prop="productWeight"
                >
           <el-input
            v-model.number="product.productWeight"
            placeholder="克数"
            maxlength="10"
            style="width:150px">
            <template slot="append">克</template>
          </el-input>
           </el-form-item>


           <el-form-item  style="margin-left:660px;margin-top:-60px"
                  label="纸箱"
                  prop="productNumber"
                >
              <el-radio-group v-model="product.boxSupplyWay" style="width:140px">
              <el-radio :label="0">客供</el-radio>
              <el-radio :label="1">自供</el-radio>
            </el-radio-group>
             <el-button type="danger" style="margin-left:10px;" v-if="index!='0'"   @click.prevent="removeDomain(index)">删除</el-button>  
           </el-form-item>
        
      </div>
      <el-form-item label="订单时间" prop="orderTime">
        <el-date-picker
          v-model="dataForm.orderTime"
          type="date"
           value-format="yyyy-MM-dd HH:mm:ss"
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
           value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="交货时间">
        </el-date-picker>
      </el-form-item>
    
      <el-form-item label="订单状态" prop="status">
        <template>
          <el-radio-group v-model="dataForm.status">
            <el-radio :label="1">正常订单</el-radio>
            <el-radio :label="0">订单加急</el-radio>
            <el-radio :label="2">订单挂起</el-radio>
            <el-radio :label="3">取消订单</el-radio>
            <el-radio :label="4">订单完成</el-radio>
          </el-radio-group>
        </template>
        <!-- <el-input v-model="dataForm.status" placeholder=" 0为正常，1为取消订单，2为订单加急，3为订单挂起" style="width:260px"></el-input> -->
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
    
      ProductDetailVo: [
          {
            
            productId: "",
            productNumber: "",
            productWeight: "",
            boxSupplyWay: "",
            remark: null
  
          }
        ], 
      productList:[],
      dataForm: {
        id: 0,
        orderNo: "",
        orderTime: "",
        employeeId: "",
        customer: "",
        deliveryTime: "",
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
      
        status: [
          {
            required: true,
            message:
              "订单状态 0为正常订单正常生产，1为订单加急，2为订单挂起不能为空,3为取消订单，",
            trigger: "blur"
          }
        ],
  
      }
    };
  },
   created() {
  
    this.getProductList();
  },
  methods: {
     getProductList(){
      this.$http({
          url:this.$http.adornUrl(`/product/productinfo/getAllProductVoList`),
          method: "get"
      }).then(({data})=>{
        if(data &&data.code==0){
          this.productList=data.productList;
        }else {
              this.$message.error(data.msg);
         }
      })
    },
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
              this.dataForm.status = data.productOrder.status;
              this.dataForm.remark = data.productOrder.remark;
            //  console.log(data.productOrder.productOrderDetailList);
           this.ProductDetailVo = data.productOrder.productOrderDetailList;
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
              status: this.dataForm.status,
              remark: this.dataForm.remark,
              productList:JSON.stringify(this.ProductDetailVo) ,
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
      this.ProductDetailVo.splice(index, 1);
    }
  },
  addDomain() {
    this.ProductDetailVo.push({
            productId: "",
            productNumber: "",
            productWeight: "",
            boxSupplyWay: "",
            remark: null
    });
  }

  }
};
</script>
