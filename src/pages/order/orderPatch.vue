<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>销售订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单补录</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :label-position="labelPosition"
      :rules="rules"
      ref="formLabelAlign"
      size="medium "
      :inline-message="true"
      :model="formLabelAlign"
      class="New-elFrom"
    >
      <p class="el-titleText">订单信息</p>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="订单编号(必填):" prop="orderNum">
            <el-input v-model="formLabelAlign.orderNum" placeholder="订单编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单日期(必填):" prop="orderTime">
            <el-date-picker
              v-model="formLabelAlign.orderTime"
              type="date"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="订单日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="订单金额(元/必填):" prop="orderMonely">
            <el-input v-model="formLabelAlign.orderMonely" placeholder="订单金额(元)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单类型:" prop="orderType">
            <el-select v-model="formLabelAlign.orderType">
              <el-option
                v-for="item in orderTypeList"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="订单渠道:" prop="orderChannel">
            <el-select v-model="formLabelAlign.orderChannel">
              <el-option
                v-for="item in outerSystemList"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预期收益(元/必填):" prop="expected">
            <el-input v-model="formLabelAlign.expected" placeholder="预期收益(元)"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="订单状态:" prop="status">
            <el-select v-model="formLabelAlign.status">
              <el-option
                v-for="item in orderStatusList"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
      <p class="el-titleText">客户信息:</p>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="客户姓名(必填):" prop="customerName">
            <el-input v-model="formLabelAlign.customerName" placeholder="客户姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来源方式:" prop="laiyuan">
            <el-input v-model="formLabelAlign.laiyuan" value="补录" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="证件类型:" prop="cardType">
            <el-select v-model="formLabelAlign.cardType">
              <el-option
                v-for="item in identityTypeList"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码(必填):" prop="customerCard">
            <el-input v-model="formLabelAlign.customerCard" placeholder="证件号码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="预留手机号(必填):" prop="customerPhone">
            <el-input v-model="formLabelAlign.customerPhone" placeholder="预留手机号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册手机号(必填):" prop="registerPhone">
            <el-input v-model="formLabelAlign.registerPhone" placeholder="注册手机号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="银行名称(必填):" prop="bankType">
            <el-input v-model="formLabelAlign.bankType" placeholder="银行名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="银行卡号(必填):" prop="customerBank">
            <el-input v-model="formLabelAlign.customerBank" placeholder="银行卡号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="el-titleText">产品信息:</p>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="产品编号(必填):" prop="productNum">
            <el-input
              v-model="formLabelAlign.productNum"
              placeholder="产品编号"
              @keyup.enter.native="$event.target.blur"
              @blur="getProductDetail(formLabelAlign.productNum)"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品名称:" prop="productName">
            <el-input v-model="formLabelAlign.productName" placeholder="产品名称" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="存续期(天):" prop="productDay">
            <el-input
              v-model="formLabelAlign.productDay"
              placeholder="存续期"
              type="number"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年利率:(%/必填):" prop="productRate">
            <el-input
              controls-position="right"
              v-model="formLabelAlign.productRate"
              placeholder="年利率"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="起息日:" prop="valueDate">
            <el-date-picker
              v-model="formLabelAlign.valueDate"
              type="date"
              format="yyyy-MM-dd"
              :picker-options="repayDateBefore"
              placeholder="起息日"
              :readonly="true"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品兑付日:" prop="repayDate">
            <el-date-picker
              v-model="formLabelAlign.repayDate"
              type="date"
              format="yyyy-MM-dd"
              :picker-options="valueDateAfter"
              placeholder="产品兑付日"
              :readonly="true"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="el-form-item__content-btn">
        <el-button type="primary" @click="submitForm('formLabelAlign')" :disabled="disabled">确认补录</el-button>
        <el-button @click="resetForm('formLabelAlign')">重置</el-button>
      </el-form-item>
    </el-form>
    <div style="background: #fff; padding: 12px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-button type="primary" @click="uploadFile('one')">基础模板下载(东金)</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="importFile('one')">基础模板导入(东金)</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="uploadFile('four')">下载模板文件(东金)</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="importFile('two')">导入文件(东金)</el-button>
        </el-col>
      </el-row>
    </div>
    <!--导入弹框-->
    <el-dialog title="选择文件" :modal-append-to-body="false" :visible.sync="dialogVisible" width="45%">
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="action"
        multiple
        :limit="1"
        :headers="importHeaders"
        :on-exceed="handleExceed"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        name="excel"
        :auto-upload="false"
      >
        <el-button size="small" type="primary" slot="trigger">点击上传</el-button>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="clearFiles">返回</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style>
</style>

<script>
import {
  orderPatchSelect,
  submitFormOrderPach,
  getOrderListProductNum
} from "../../api/api";
import { phone } from "../../utils/formValidator";
var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入电话号码"));
  } else if (!phone(value)) {
    callback(new Error("请输入正确的11位手机号码"));
  } else {
    callback();
  }
};
export default {
  data() {
    return {
      action: "",
      importHeaders: {
        access_id: this.$store.state.userId,
        access_token: this.$store.state.token
      },
      labelPosition: "top",
      outerSystemList: [],
      orderTypeList: [],
      identityTypeList: [],
      orderStatusList: [],
      id: "",
      disabled: true,
      dialogVisible: false,
      number: "one",
      formLabelAlign: {
        orderNum: "",
        orderTime: "",
        orderMonely: "",
        orderType: "",
        orderChannel: "",
        expected: "",
        customerName: "",
        laiyuan: "补录",
        status: "",
        cardType: "",
        customerPhone: "",
        registerPhone: "",
        bankType: "",
        customerBank: "",
        productNum: "",
        productName: "",
        productDay: "",
        productRate: "",
        valueDate: "",
        repayDate: ""
      },
      rules: {
        orderNum: [{ required: true, message: "不能为空", trigger: "blur" }],
        orderTime: [{ required: true, message: "不能为空", trigger: "blur" }],
        orderMonely: [{ required: true, message: "不能为空", trigger: "blur" }],
        expected: [{ required: true, message: "不能为空", trigger: "blur" }],
        customerName: [{ required: true, message: "不能为空", trigger: "blur" }],
        customerCard: [{ required: true, message: "不能为空", trigger: "blur" }],
        customerPhone: [{ required: true, trigger: "blur", validator: validPhone }],
        registerPhone: [{ validator: validPhone, required: true, trigger: "blur" }],
        bankType: [{ required: true, message: "不能为空", trigger: "blur" }],
        customerBank: [{ required: true, message: "不能为空", trigger: "blur" }],
        productNum: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      valueDateAfter: {
        disabledDate: time => {
          let beginDateVal = this.formLabelAlign.valueDate;
          if (beginDateVal) {
            return time.getTime() < beginDateVal;
          }
        }
      },
      repayDateBefore: {
        disabledDate: time => {
          let proEndDate = this.formLabelAlign.repayDate;
          if (proEndDate) {
            return time.getTime() > proEndDate;
          }
        }
      }
    };
  },
  methods: {
    clearFiles() {
      this.dialogVisible = false;
      this.$refs.upload.clearFiles();
    },
    importFile(type) {
      this.dialogVisible = true;
      if (type == "one") {
        this.action = "/api/order/importBaseFile";
      } else {
        this.action = "/api/order/improtTmpFile";
      }
    },
    //下载
    uploadFile(num) {
      if (num == "one") {
        window.open("/api/order/downloadBaseFile");
      } else {
        window.open("/api/order/downloadTemFile");
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件`);
    },
    handleAvatarSuccess(res, file) {
      this.clearFiles();
      this.$alert(res.message, "提示", {
        confirmButtonText: "确定"
      });
    },
    beforeAvatarUpload(file) {},
    submitUpload() {
      if (this.$refs.upload.$children[0].fileList.length == 1) {
        this.$refs.upload.submit();
      } else {
        this.$message.error("不能为空,请选择文件!");
      }
    },
    selectOptions() {
      orderPatchSelect().then(data => {
        let res = data.data;
        this.outerSystemList = res.outerSystemList;
        this.formLabelAlign.orderChannel = res.outerSystemList[0].code;
        this.orderTypeList = res.orderTypeList;
        this.formLabelAlign.orderType = res.orderTypeList[0].code;
        this.orderStatusList = res.orderStatusList;
        this.formLabelAlign.status = res.orderStatusList[0].code;
        this.identityTypeList = res.identityTypeList;
        this.formLabelAlign.cardType = res.identityTypeList[0].code;
      });
    },
    getProductDetail(code) {
      if (code == "") {
        return (
          (this.formLabelAlign.productName = ""),
          (this.formLabelAlign.productRate = ""),
          (this.formLabelAlign.valueDate = ""),
          (this.formLabelAlign.repayDate = ""),
          (this.formLabelAlign.productDay = "")
        );
      }
      let param = {
        productCode: code,
        outerSystem: this.formLabelAlign.orderChannel
      };
      getOrderListProductNum(param).then(
        data => {
          if (data.statusCode == 200 && data.data != undefined) {
            let res = data.data;
            this.disabled = false;
            this.id = res.id;
            this.formLabelAlign.productName = res.productName;
            this.formLabelAlign.productRate = res.interestRate + "%";
            var valueDate = res.valueDate;
            this.formLabelAlign.valueDate = valueDate.substr(0, 10);
            var repayDate = res.repayDate;
            this.formLabelAlign.repayDate = repayDate.substr(0, 10);
            var productDay = res.durationDays;
            productDay = productDay == null ? "" : productDay;
            this.formLabelAlign.productDay = productDay;
          } else {
            this.formLabelAlign.productName = "";
            this.formLabelAlign.productRate = "";
            this.formLabelAlign.valueDate = "";
            this.formLabelAlign.repayDate = "";
            this.formLabelAlign.productDay = "";
            this.disabled = true;
            return false;
          }
        },
        reason => {}
      );
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        var param = {
          orderNo: this.formLabelAlign.orderNum,
          orderDate: this.formLabelAlign.orderTime,
          orderAmount: this.formLabelAlign.orderMonely,
          orderType: this.formLabelAlign.orderType,
          outerSystem: this.formLabelAlign.orderChannel,
          expectReturn: this.formLabelAlign.expected,
          customerName: this.formLabelAlign.customerName,
          phone: this.formLabelAlign.registerPhone,
          status: this.formLabelAlign.status,
          accountPhone: this.formLabelAlign.customerPhone,
          identityType: this.formLabelAlign.cardType,
          identityNo: this.formLabelAlign.customerCard,
          bankCardNo: this.formLabelAlign.customerBank,
          bankName: this.formLabelAlign.bankType,
          isManual: true,
          productId: this.id
        };
        if (valid) {
          submitFormOrderPach(param).then(
            res => {
              if (res.statusCode == 200) {
                this.$message({
                  message: "订单实录成功!",
                  type: "success"
                });
                this.$refs[formName].resetFields();
              } else {
                $.alert(res.message);
              }
            },
            reason => {}
          );
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    window.vue = this;
    this.selectOptions();
  }
};
</script>
