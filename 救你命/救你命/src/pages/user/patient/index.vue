<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button
            type="primary"
            size="default"
            :icon="User"
            @click="addpatient"
            
            v-if="scene === 0"
            >添加就诊人</el-button
          >
        </div>
      </template>
      <!-- 卡片的身体部分展示就诊人信息 -->
      <div class="user" v-if="scene === 0">
        <patient
          v-for="(user, index) in userArr"
          :key="user.id"
          class="item"
          :user="user"
          :index="index"
          @click="changeIndex(index)"
          @removeUser="removeUser"
          @changeScene="changeScene"
          :current-index="currentIndex"
        />
      </div>
      <div class="form" v-if="scene == 1">
        <el-divider content-position="left">就诊人信息</el-divider>
        <el-form style="width: 60%; margin: 10px auto">
          <el-form-item label="用户姓名">
            <el-input
              placeholder="请你输入用户姓名"
              v-model="userParams.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select
              placeholder="请你选择证件的类型"
              style="width: 100%"
              v-model="userParams.certificatesType"
            >
              <el-option
                v-for="item in certationArr"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input
              placeholder="请你输入证件号码"
              v-model="userParams.certificatesNo"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户性别">
            <el-radio-group v-model="userParams.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="userParams.birthdate"
              value-format="YYYY-MM-DD"
              type="date"
              placeholder="请你选择日期"
            />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input
              placeholder="请你输入用户手机号码"
              v-model="userParams.phone"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-divider content-position="left"
          >建档信息（完善后部分医院首次就诊不排队建档）</el-divider
        >
        <el-form style="width: 60%; margin: 10px auto">
          <el-form-item label="婚姻状况">
            <el-radio-group v-model="userParams.isMarry">
              <el-radio :label="1">已婚</el-radio>
              <el-radio :label="0">未婚</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="自费/医保">
            <el-radio-group v-model="userParams.isInsure">
              <el-radio :label="1">自费</el-radio>
              <el-radio :label="0">医保</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="当前住址">
            <el-cascader :props="props" v-model="userParams.addressSelected" />
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input
              placeholder="请你输入用户详细地址"
              v-model="userParams.address"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-divider content-position="left">联系人信息（选填）</el-divider>
        <el-form style="width: 60%; margin: 10px auto" label-width="80">
          <el-form-item label="用户姓名">
            <el-input
              placeholder="请你输入用户姓名"
              v-model="userParams.contactsName"
            ></el-input>
          </el-form-item>
          <el-form-item label="证件类型">
            <el-select
              placeholder="请你选择证件的类型"
              style="width: 100%"
              v-model="userParams.contactsCertificatesType"
            >
              <el-option
                v-for="item in certationArr"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input
              placeholder="请你输入证件号码"
              v-model="userParams.contactsCertificatesNo"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input
              placeholder="请你输入用户手机号码"
              v-model="userParams.contactsPhone"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="default" @click="submit"
              >提交</el-button
            >
            <el-button type="primary" size="default" @click="reset"
              >重写</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// import patient from "@/components/patient/index.vue";
import { User } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { ref, onMounted, reactive } from "vue";
import { patientAPI } from "@/api/hospital";
import { useRoute,useRouter } from "vue-router";
import {
  identityAPI,
  cityAPI,
  addpatientAPI,
  changepatientAPI,
} from "@/api/user";
let scene = ref<number>(0);
let userArr = ref();
const $route = useRoute()
const $router = useRouter()

let certationArr = ref();
let userParams = reactive<any>({
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 0,
  birthdate: "",
  phone: "",
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: "",
  contactsName: "",
  contactsCertificatesType: "",
  contactsCertificatesNo: "",
  contactsPhone: "",
});
let cityid = "";
const props = {
  lazy: true,
  async lazyLoad(node: any, resolve: any) {
    const res = await cityAPI(node.data.id || parentId);
    if (res.data.code === 200) {
      const areaData = res.data.data.map((item: any) => {
        return {
          id: item.id,
          label: item.name,
          value: item.value,
          leaf: !item.hasChildren,
        };
      });
      resolve(areaData);
      // cityid = node.value;
      // console.log(cityid);
      // const result = await cityAPI(cityid);
      // if (result.data.code === 200) {
      //   console.log(result.data.data);
      //   const cityData = res.data.data.map((item) => {
      //     return {
      //       label: item.name,
      //       value: item.value,
      //       leaf: !item.hasChildren,
      //     };
      //   });
      //   resolve(cityData);
      // }
    }
  },
};
let parentId = "86";
function addpatient() {
  reset1()
  scene.value = 1;
}
function changeIndex(index) {}
function currentIndex() {}

//获取就诊人信息!!!!!!!!!!!!!!!!!!!!!
async function getuser() {
  const res = await patientAPI();
  if (res.data.code === 200) {
    userArr.value = res.data.data;
  }
}

async function identify() {
  const res = await identityAPI();
  if (res.data.code === 200) {
    certationArr.value = res.data.data;
  }
}

function changeScene(user:any) {
  scene.value = 1;
  console.log(user);
  Object.assign(userParams,user)
}

//提交
async function submit() {
  if (userParams.id) {
    const res1 = await changepatientAPI(userParams);
    if (res1.data.code === 200) {
      ElMessage({
        type: "success",
        message: "修改成功",
      });
      getuser();
    } else {
      ElMessage({
        type: "error",
        message: "修改失败",
      });
    }
  } else {
    const res2 = await addpatientAPI(userParams);
    if (res2.data.code === 200) {
      ElMessage({
        type: "success",
        message: "添加成功",
      });
      getuser();
    } else {
      ElMessage({
        type: "error",
        message: "添加失败",
      });
    }
  }
  if ($route.query.type) {
    $router.back()
  } else {
    scene.value = 0
  }
}
//清空表单
function reset1() {
  Object.assign(userParams, {
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 0,
  birthdate: "",
  phone: "",
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: "",
  contactsName: "",
  contactsCertificatesType: "",
  contactsCertificatesNo: "",
  contactsPhone: "",
})
}
//重写
function reset() {
  reset1()
}
function removeUser() {
  getuser()
}
onMounted(() => {
  getuser();
  identify();
  if($route.query.type === 'add'){
    scene.value = 1
  }
});
</script>

<style lang="scss">
.container {
  .box-card {
    margin: 20px 0px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 32%;
        margin: 5px;
      }
    }
  }
}
</style>