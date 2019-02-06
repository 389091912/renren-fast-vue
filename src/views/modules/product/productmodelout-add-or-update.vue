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

   
      <el-form-item  label="类别" prop="modelType">
         <template v-if="dataForm.id||dataForm.id==0" >
          <el-radio-group v-model="dataForm.modelType">
            <el-radio v-model="dataForm.modelType" label="0">入库登记</el-radio>
            <el-radio v-model="dataForm.modelType" label="1">模具拉出</el-radio>
            <el-radio v-model="dataForm.modelType" label="2">新品打样</el-radio>
            <el-radio v-model="dataForm.modelType" label="3">返厂维修</el-radio>
            <el-radio v-model="dataForm.modelType" label="4">外来加工</el-radio>
          </el-radio-group>
          </template>
           <!-- <template v-else >
          <el-radio-group v-model="dataForm.modelType">
            <el-radio :label="0">入库登记</el-radio>
            <el-radio :label="1">模具拉出</el-radio>
            <el-radio :label="2">新品打样</el-radio>
            <el-radio :label="3">返厂维修</el-radio>
            <el-radio :label="4">外来加工</el-radio>
          </el-radio-group>
          </template> -->
      </el-form-item>
    

      <template v-if="dataForm.modelType=='0'">
        <el-form-item label="仓库位置" prop="siteNo">
          <el-radio-group v-model="dataForm.siteNo">
            <el-radio :label="1">新第一仓库</el-radio>
            <el-radio :label="2">第二仓库</el-radio>
            <el-radio :label="3">第三仓库</el-radio>
            <el-radio :label="4">老第一仓库</el-radio>
          </el-radio-group>     
        </el-form-item>
      </template>

    <template v-if="dataForm.modelType=='0'||dataForm.modelType=='1'" >
      <el-form-item label="模具编号" prop="modelNo">
        <el-select v-model="dataForm.modelNo" 
        default-first-option
        style="width:260px" filterable placeholder="请选择">
          <el-option
            v-for="item in modelList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
       </el-form-item>
    
         <el-form-item label="客户模具编号" prop="customerModelNo">
        <el-input v-model="dataForm.customerModelNo" placeholder="客户模具编号" style="width:260px"></el-input>
      </el-form-item> 
    </template>
     <template v-if="dataForm.modelType=='2'" >
      <el-form-item label="模具编号" prop="modelNo">
          <el-input v-model="dataForm.modelNo" placeholder="模具编号" style="width:260px"></el-input>
       </el-form-item>
      <el-form-item label="产品名称" prop="productName">
        <el-input v-model="dataForm.productName" placeholder="可选填产品名称" style="width:260px"></el-input>
      </el-form-item> 
    </template>
      
      <el-form-item label="成模" prop="modelSuccessMo">
        <el-input v-model="dataForm.modelSuccessMo" placeholder="成模" style="width:260px">
                   <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="初模" prop="modelPrimaryMo">
        <el-input v-model="dataForm.modelPrimaryMo" placeholder="初模" style="width:260px">
                   <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="口模" prop="modelMouthMo">
        <el-input v-model="dataForm.modelMouthMo" placeholder="口模" style="width:260px">
                   <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="闷头" prop="modelMenTou">
        <el-input v-model="dataForm.modelMenTou" placeholder="闷头" style="width:260px">
                   <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="漏斗" prop="modelFunnel">
        <el-input v-model="dataForm.modelFunnel" placeholder="漏斗" style="width:260px">
                   <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="芯子" prop="modelCore">
        <el-input v-model="dataForm.modelCore" placeholder="芯子" style="width:260px">
                   <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="气头" prop="modelAirTou">
        <el-input v-model="dataForm.modelAirTou" placeholder="气头" style="width:260px">
                   <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="冷却" prop="modelCooling">
        <el-input v-model="dataForm.modelCooling" placeholder="冷却" style="width:260px">
                   <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="钳片" prop="modelClamp">
        <el-input v-model="dataForm.modelClamp" placeholder="钳片" style="width:260px">
                   <template slot="append">件</template>
        </el-input>
      
      </el-form-item>

       <el-form-item label="瓶重" prop="bottleWeight">
        <el-input v-model="dataForm.bottleWeight" placeholder="瓶重"  style="width:260px">
            <template slot="append">克</template>
        </el-input>
      </el-form-item>
      <el-form-item label="出库数量" prop="modelAllNumber">
        <el-input v-model="dataForm.modelAllNumber" placeholder="出库数量" style="width:260px">
                   <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="模具经手人" prop="modelHandlingPeople">
        <el-input v-model="dataForm.modelHandlingPeople" placeholder="模具经手人" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="提货人名称" prop="customerName">
        <el-input v-model="dataForm.customerName" placeholder="提货人名称" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="modelRemark">
        <el-input v-model="dataForm.modelRemark" placeholder="备注" style="width:260px"></el-input>
      </el-form-item>
      <el-form-item label="发货日期" prop="modelDeliveryTime">
        <el-date-picker
          v-model="dataForm.modelDeliveryTime"
          type="date"
          style="width:260px"
           value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="发货日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="收货日期" prop="modelReceiptTime">
          <el-date-picker
          v-model="dataForm.modelReceiptTime"
          type="date"
          style="width:260px"
           value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="收货日期"
        ></el-date-picker>
      </el-form-item>
   
      <el-form-item label="退货原因" prop="reasonReturn">
        <el-input v-model="dataForm.reasonReturn" placeholder="退货原因"  style="width:260px"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>
<style>
  .el-select-dropdown__list{
   
    max-height: 150px;
   
  } 
</style>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        modelNo: "",
        customerModelNo:'',
        productName: "",
        modelSuccessMo: "",
        modelPrimaryMo: "",
        modelMouthMo: "",
        modelMenTou: "",
        modelFunnel: "",
        modelCore: "",
        modelAirTou: "",
        modelCooling: "",
        modelClamp: "",
        modelAllNumber: "",
        modelHandlingPeople: "",
        customerName: "",
        modelRemark: "",
        modelDeliveryTime: "",
        modelReceiptTime: "",
        createTime: "",
        createUser: "",
        updateTime: "",
        updateUser: "",
        status: "",
        modelType: '',
        bottleWeight: '',
        reasonReturn: ''
        
      },
    
      modelList:[],
      dataRule: {
        modelNo: [
          { required: true, message: "模具编号不能为空", trigger: "blur" }
        ],
        modelSuccessMo: [
          { required: true, message: "成模不能为空", trigger: "blur" }
        ],
        modelPrimaryMo: [
          { required: true, message: "初模不能为空", trigger: "blur" }
        ],
        modelMouthMo: [
          { required: true, message: "口模不能为空", trigger: "blur" }
        ],
        modelMenTou: [
          { required: true, message: "闷头不能为空", trigger: "blur" }
        ],
        modelFunnel: [
          { required: true, message: "漏斗不能为空", trigger: "blur" }
        ],
        modelCore: [
          { required: true, message: "芯子不能为空", trigger: "blur" }
        ],
        modelAirTou: [
          { required: true, message: "气头不能为空", trigger: "blur" }
        ],
        modelCooling: [
          { required: true, message: "冷却不能为空", trigger: "blur" }
        ],
        modelClamp: [
          { required: true, message: "钳片不能为空", trigger: "blur" }
        ],
        modelAllNumber: [
          { required: true, message: "出库数量不能为空", trigger: "blur" }
        ],
        modelHandlingPeople: [
          { required: true, message: "模具经手人不能为空", trigger: "blur" }
        ],
        customerName: [
          { required: true, message: "提货人名称不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
  
    this.getModelListInfo()
  },
  methods: {
    clearndataForm(){
        this.dataForm.modelNo='';
        this.dataForm.customerModelNo='';
        this.dataForm.productName='';
        this.dataForm.modelSuccessMo='';
        this.dataForm.modelPrimaryMo='';
        this.dataForm.modelMenTou='';
        this.dataForm.modelMouthMo='';
        this.dataForm.modelFunnel='';
        this.dataForm.modelCore='';
        this.dataForm.modelAirTou='';
        this.dataForm.modelCooling='';
        this.dataForm.modelClamp='';
        this.dataForm.modelAllNumber='';
        this.dataForm.modelHandlingPeople='';
        this.dataForm.customerName='';
    
    },
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
      getProductName(){
      this.$http({
          url:this.$http.adornUrl(`/product/productinfo/getProductName/${this.dataForm.modelNo}`),
          method: "get"
      }).then(({data})=>{
        if(data &&data.code==0){
           this.dataForm.productName=data.productName;
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
              `/product/productmodelout/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.modelNo = data.productModelOut.modelNo;
              this.dataForm.productName = data.productModelOut.productName;
              this.dataForm.modelSuccessMo = data.productModelOut.modelSuccessMo;
              this.dataForm.modelPrimaryMo = data.productModelOut.modelPrimaryMo;
              this.dataForm.modelMouthMo = data.productModelOut.modelMouthMo;
              this.dataForm.modelMenTou = data.productModelOut.modelMenTou;
              this.dataForm.modelFunnel = data.productModelOut.modelFunnel;
              this.dataForm.modelCore = data.productModelOut.modelCore;
              this.dataForm.modelAirTou = data.productModelOut.modelAirTou;
              this.dataForm.modelCooling = data.productModelOut.modelCooling;
              this.dataForm.modelClamp = data.productModelOut.modelClamp;
              this.dataForm.modelAllNumber = data.productModelOut.modelAllNumber;
              this.dataForm.modelHandlingPeople =data.productModelOut.modelHandlingPeople;
              this.dataForm.customerName = data.productModelOut.customerName;
              this.dataForm.modelRemark = data.productModelOut.modelRemark;
              this.dataForm.modelDeliveryTime = data.productModelOut.modelDeliveryTime;
              this.dataForm.modelReceiptTime = data.productModelOut.modelReceiptTime;
               this.dataForm.status = data.productModelOut.status;
              this.dataForm.modelType = data.productModelOut.modelType
              this.dataForm.bottleWeight = data.productModelOut.bottleWeight
              this.dataForm.reasonReturn = data.productModelOut.reasonReturn
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
              `/product/productmodelout/${
                !this.dataForm.id ? "save" : "update"
              }`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              modelNo: this.dataForm.modelNo,
              productName: this.dataForm.productName,
              modelSuccessMo: this.dataForm.modelSuccessMo,
              modelPrimaryMo: this.dataForm.modelPrimaryMo,
              modelMouthMo: this.dataForm.modelMouthMo,
              modelMenTou: this.dataForm.modelMenTou,
              modelFunnel: this.dataForm.modelFunnel,
              modelCore: this.dataForm.modelCore,
              modelAirTou: this.dataForm.modelAirTou,
              modelCooling: this.dataForm.modelCooling,
              modelClamp: this.dataForm.modelClamp,
              modelAllNumber: this.dataForm.modelAllNumber,
              modelHandlingPeople: this.dataForm.modelHandlingPeople,
              customerName: this.dataForm.customerName,
              modelRemark: this.dataForm.modelRemark,
              modelDeliveryTime: this.dataForm.modelDeliveryTime,
              modelReceiptTime: this.dataForm.modelReceiptTime,
              createTime: this.dataForm.createTime,
              createUser: this.dataForm.createUser,
              updateTime: this.dataForm.updateTime,
              updateUser: this.dataForm.updateUser,
              status: this.dataForm.status,
              modelType: this.dataForm.modelType,
              bottleWeight: this.dataForm.bottleWeight,
              reasonReturn: this.dataForm.reasonReturn,
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
  },
  watch:{
     "dataForm.modelNo" (){
       this.getProductName();
        //console.log("111")
      },
      "dataForm.modelType" (){
        
        this.clearndataForm();
      }
  }
};
</script>
