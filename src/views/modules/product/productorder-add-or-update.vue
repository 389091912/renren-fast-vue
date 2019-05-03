<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    style="margin-left:200px"
    width="1200px"
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

          <el-select v-model="product.productId" @change="getModelNoByProductId(index)" filterable clearable placeholder="请选择" >
            <el-option
              v-for="item in productList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item  style="margin-left:280px;margin-top:-60px"
                  label="数量"
                  prop="productNumber"
                >
          <el-input
            v-model.number="product.productNumber"
            placeholder="数量"
            maxlength="10"
            style="width:160px">
            <template slot="append">万件</template>
          </el-input>

          </el-form-item>
           <el-form-item  style="margin-left:500px;margin-top:-60px"
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

          <el-form-item   label="模具编号"  prop="modelId">

              <el-select 
              style="width:200px"
                v-model="product.modelId"
                filterable
                disabled
                default-first-option
                placeholder="模具编号">
                <el-option
                  v-for="item in modelList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
          </el-select>
            <!-- <el-input
                v-model.number="product.modelNo"
                placeholder="模具编号"
                maxlength="10"
                style="width:200px">
              </el-input> -->
          

      <el-form-item  style="margin-left:150px;margin-top:-36px"
                  label="纸箱"
                  prop="productNumber"
                >
              <el-radio-group v-model="product.boxSupplyWay" style="width:140px">
              <el-radio :label="0">客供</el-radio>
              <el-radio :label="1">自供</el-radio>
            </el-radio-group>

            <template v-if="product.boxSupplyWay=='0'">
               <el-button type="danger"  v-if="index!='0'"   @click.prevent="removeDomain(index)">删除</el-button>  
            </template>

            <template v-if="product.boxSupplyWay=='1'">
            
            <el-form-item label="" prop="factoryId" style="margin-left:160px;margin-top:-35px;">
              <el-select v-model="product.boxFactoryId" 
              default-first-option 
              style="width:150px" clearable filterable placeholder="请选择纸箱厂商">
                <el-option
                  v-for="item1 in productBoxFactoryList"
                  :key="item1.id"
                  :label="item1.name"
                  :value="item1.id">
                </el-option>
              </el-select>
            </el-form-item>
              <el-form-item   style="margin-left:340px;margin-top:-36px;"
                      label=""
                      prop="needBoxNumber"
                    >
              <el-input
                v-model.number="product.needBoxNumber"
                placeholder="所需纸箱数量"
                maxlength="10"
                style="width:180px">
                <template slot="append">件</template>
              </el-input>


               <el-button type="danger"  v-if="index!='0'"   @click.prevent="removeDomain(index)">删除</el-button>  
              </el-form-item>
          </template>
           </el-form-item>

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
      productBoxFactoryList:[],
      modelList:[],
      ProductDetailVo: [
          {
            id:"",
            productId: "",
            productNumber: "",
            productWeight: "",
            boxSupplyWay: 1,
            boxFactoryId:'',
            needBoxNumber:'',
            modelId:'',
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
  computed: {
       updateOrderMsgCountNumber: {
         get () { return this.$store.state.user.orderMsgCountNumber },
        set (val) { this.$store.commit('user/updateOrderMsgCountNumber', val) }
      },
    },
  methods: {
     getModelListInfo(){
      this.$http({
          url:this.$http.adornUrl(`/product/productmodel/getModelVoList`),
          method: "get"
      }).then(({data})=>{
        if(data &&data.code==0){
          this.modelList=data.modelVoList;
        }else {
              this.$message.error(data.msg);
         }
      })
    },
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
    getModelNoByProductId(index){
        console.log(index);
        console.log(this.ProductDetailVo[index].productId);
      let productId=this.ProductDetailVo[index].productId;
      this.ProductDetailVo[index].modelId='';
    this.$http({
          url:this.$http.adornUrl(`/product/productinfo/info/`+productId),
          method: "get"
      }).then(({data})=>{
        if(data &&data.code==0){
          console.log(data.productInfo);
          if(data.productInfo.modelNo){
      this.ProductDetailVo[index].modelId=Number(data.productInfo.modelNo);
          }else{
              this.$message.warning("该产品没有关联相关模具,请返回产品信息中关联。");
          }
    
        }else {
              this.$message.error(data.msg);
         }
      })

    },
    init(id) {
      this.getProductList();
      this.getAllBoxFactoryList();
      this.getModelListInfo();
      this.ProductDetailVo= [
          {
            id:"",
            productId: "",
            productNumber: "",
            productWeight: "",
            boxSupplyWay: 1,
            boxFactoryId:'',
            needBoxNumber:'',
            modelId:'',
            remark: null
  
          }
        ]
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
              this.ProductDetailVo = data.productOrder.productOrderDetailList;
            }
          
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {

     for(let item of this.ProductDetailVo){
      if(item.modelNo==""){
        this.$message.error("模具编号不能为空");
        return false;
      }
     }
      
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
              this.getOrderMsgUserNumber();
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                },
               
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
            id:"",
            productId: "",
            productNumber: "",
            productWeight: "",
            boxSupplyWay: 1,
            modelId:'',
            remark: null
    });
  },
  getOrderMsgUserNumber(){
    
          this.$http({
                  url: this.$http.adornUrl('/product/orderusermessage/getUserMessageCount'),
                  method: 'get',
                  params: this.$http.adornParams()
                }).then(({data}) => {
                  if (data && data.code === 0) {
                    this.updateOrderMsgCountNumber = data.orderMsgCountNumber
                  }
          })
        
      },

  }
};
</script>
