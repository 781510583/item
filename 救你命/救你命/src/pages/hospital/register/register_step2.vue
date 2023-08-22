<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <!-- 卡片:展示就诊人信息 -->
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
            >添加就诊人</el-button
          >
        </div>
      </template>
      <!-- 卡片的身体部分展示就诊人信息 -->
      <div class="user">
        <patient
          v-for="(user, index) in userArr"
          :key="user.id"
          class="item"
          :user="user"
          :index="index"
          @click="changeIndex(index)"
          :current-index="currentIndex"
        />
      </div>
    </el-card>
    <!-- 卡片:展示医生的信息 -->
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <!-- 卡片身体部分:展示医生的信息 -->
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期:</div>
          </template>
          {{ docInfo.workDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院:</div>
          </template>
          {{ docInfo.param?.hosname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室:</div>
          </template>
          {{ docInfo.param?.depname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生姓名:</div>
          </template>
          {{ docInfo.docname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称:</div>
          </template>
          {{ docInfo.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长:</div>
          </template>
          {{ docInfo.skill }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生服务费:</div>
          </template>
          <span style="color: red">{{ docInfo.amount }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 确定挂号按钮 -->
    <div class="btn">
      <el-button type="primary" size="default" :disabled="currentIndex == -1?true:false" @click="submitorder">确认挂号</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from "@element-plus/icons-vue";
import { patientAPI, currentdocAPI } from "@/api/hospital";
import { submitorderAPI } from "@/api/user"
//引入获取就诊人信息接口
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
//@ts-ignore
import { ElMessage } from "element-plus";
//获取路由对象
let $route = useRoute();
//存储医生的信息
let docInfo = ref<any>({});
//获取路由器对象
let $router = useRouter();
let userArr = ref();
onMounted(() => {
  getpatient();
  currentdoc();
});
async function getpatient() {
  const res = await patientAPI();
  userArr.value = res.data.data;
}
async function currentdoc() {
  const res = await currentdocAPI($route.query.docId);
  docInfo.value = res.data.data;
}
function addpatient() {
  $router.push({path:'/user/patient',query:{type:'add'}})
}

let currentIndex = ref(-1);
function changeIndex(index: number) {
  currentIndex.value = index;
}

async function submitorder() {  
  const hoscode = docInfo.value.hoscode
  const scheduleId = docInfo.value.id
  const patientId = userArr.value[currentIndex.value].id  
  const res = await submitorderAPI(hoscode,scheduleId,patientId)
  console.log(res);
  if (res.data.code === 200) {
    $router.push({path:'/user/order',query:{orderId:res.data.data}})
  }
}
</script>

<style scoped lang="scss">
.container {
  .tip {
    font-weight: 900;
    color: #7f7f7f;
    font-size: 20px;
  }
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

  .btn {
    display: flex;
    justify-content: center;
    margin: 10px 0px 60px;
  }
}
</style>
