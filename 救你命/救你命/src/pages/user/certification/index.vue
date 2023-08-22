<template>
  <!-- 实名认证组件的结构 -->
  <el-card class="box-card">
    <!-- 卡片的头部 -->
    <template #header>
      <div class="card-header">
        <h1>实名信息</h1>
      </div>
    </template>
    <!-- 实名认证结构的提示部分 -->
    <div class="tip" style="color: #7f7f7f">
      <p>
        <el-icon></el-icon
        >完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。
      </p>
    </div>
    <!-- 卡片身体的底部:认证成功的结构、认证未成功的结构 -->
    <el-descriptions
      v-if="userinfo.authStatus == 1"
      size="small"
      class="margin-top"
      :column="1"
      border
      style="margin: 20px auto"
    >
      <el-descriptions-item label-align="center" :width="20">
        <template #label>
          <div class="cell-item">用户姓名</div>
        </template>
        {{ params.name }}
      </el-descriptions-item>
      <el-descriptions-item label-align="center" :width="20">
        <template #label>
          <div class="cell-item">证件类型</div>
        </template>
        {{ params.certificatesType == "10" ? "身份证" : "户口本" }}
      </el-descriptions-item>
      <el-descriptions-item label-align="center" width="20px">
        <template #label>
          <div class="cell-item">证件号码</div>
        </template>
        {{ params.certificatesNo }}
      </el-descriptions-item>
    </el-descriptions>
    <!-- 用户未验证的结构 -->
    <el-form
      v-if="userinfo.authStatus == 0"
      style="width: 60%; margin: 20px auto"
      label-width="80"
      :model="params"
      ref="form"
      :rules="rules"
    >
      <el-form-item label="用户姓名" prop="name">
        <el-input placeholder="请输入用户姓名" v-model="params.name"></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="certificatesType">
        <el-select
          style="width: 100%"
          placeholder="请选择证件类型"
          v-model="params.certificatesType"
          @change="change"
        >
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="(item, index) in confirmArr"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="certificatesNo">
        <el-input
          placeholder="请输入证件号码"
          v-model="params.certificatesNo"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传证件" prop="certificatesUrl">
        <!-- action:upload组件向服务器提交图片路径
             limit:照片墙约束图片个数
             on-exceed:超出约束数量的钩子
        -->
        <el-upload
          ref="upload"
          list-type="picture-card"
          :limit="1"
          :on-exceed="exceedhandler"
          :on-success="successhandler"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          action="/api/oss/file/fileUpload?fileHost=userAuah"
        >
          <img
            style="width: 100%; height: 100%"
            src="../../../assets/images/auth_example.png"
            alt=""
          />
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img
            w-full
            v-if="params.certificatesUrl"
            style="width: 100%; height: 100%"
            :src="params.certificatesUrl"
            alt="Preview Image"
          />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="submit"
          >提交</el-button
        >
        <el-button type="primary" size="default" @click="reset">重写</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { confirmAPI, identityAPI, userconfirmAPI } from "@/api/user";
let userinfo: any = ref<any>({});
let confirmArr = ref<any>("");
let upload = ref();
let disabled = ref<boolean>(true)
let form = ref()
function change() {
  disabled.value = false
}
let params = reactive<any>({
  certificatesNo: "",
  certificatesType: "",
  certificatesUrl: "",
  name: "",
});
let dialogVisible = ref<boolean>(false);
function validatorName(rule, value, callback) {
  const reg =
    /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的姓名"));
  }
}

function validatorType(rule, value, callback) {
  if (value == "10" || value == "20") {
    callback();
  } else {
    callback(new Error("请选择身份类型"));
  }
}

function validatorNo(rule, value, callback) {
  const reg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  const reg1 = /^\d{9}$/;
  if (params.certificatesType == 10) {
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入正确的身份证号"));
    }
  }else if(params.certificatesType == 20){
    if (reg1.test(value)) {
      callback();
    }
    else {
    callback(new Error("请输入正确的户口本号"));
  }
}
}

function validatorUrl(rule,value,callback) {
  if (value.length) {
    callback()
  } else {
    callback(new Error("请上传证件图片"));
  }
}
const rules = {
  name: [
    {
      required: true,
      validator: validatorName,
    },
  ],
  certificatesType: [
    {
      required: true,
      validator: validatorType,
    },
  ],
  certificatesNo: [
    {
      required: true,
      validator: validatorNo,
    },
  ],
  certificatesUrl: [
    {
      required: true,
      validator: validatorUrl,
    },
  ],
};

async function confirm() {
  const res = await confirmAPI();
  userinfo.value = res.data.data;
}
async function getidentity() {
  const res = await identityAPI();
  confirmArr.value = res.data.data;
}
function exceedhandler() {
  ElMessage({
    type: "error",
    message: "只能上传一张图片",
  });
}

function successhandler(res) {
  params.certificatesUrl = res.data;
  form.value.clearValidate('certificatesUrl')
}

function handlePictureCardPreview(res) {
  dialogVisible.value = true;
}

function handleRemove() {
  params.certificatesUrl = "";
}

function reset() {
  upload.value.clearFiles();
  Object.assign(params, {
    certificatesNo: "",
    certificatesType: "",
    certificatesUrl: "",
    name: "",
  });
}
async function submit() {
  await form.value.validate()
  const res = await userconfirmAPI(params);
  if (res.data.code == 200) {
    ElMessage({
      type: "success",
      message: "认证成功",
    });
    confirm();
  }
}
onMounted(() => {
  confirm();
  getidentity();
});
</script>


<style scoped lang="scss">
.box-card {
  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>