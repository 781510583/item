<template>
  <div v-if="$route.query.orderId">
    <el-card class="box-card">
      <!-- 卡片头部的结构 -->
      <template #header>
        <div class="detail">挂号详情</div>
      </template>
      <!-- 展示身体部分顶部结构 -->
      <div class="top">
        <!-- 左侧标签 -->
        <el-tag class="ml-2" type="success">
          <div class="tag">
            <svg
              t="1685933792381"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2389"
              width="16"
              height="16"
            >
              <path
                d="M392.533333 806.4L85.333333 503.466667l59.733334-59.733334 247.466666 247.466667L866.133333 213.333333l59.733334 59.733334L392.533333 806.4z"
                fill="#1afa29"
                p-id="2390"
              ></path>
            </svg>
            <span>{{ orderInfo.param?.orderStatusString }}</span>
          </div>
        </el-tag>
        <div class="right_info">
          <img src="../../../assets/images/code_app.png" alt="" />
          <div class="info">
            <p>微信 关注 “北京114预约挂号”</p>
            <p>“快速预约挂号”</p>
          </div>
        </div>
      </div>
      <!-- 订单详情底部的结构 -->
      <div class="bottom">
        <div class="left">
          <!-- 左侧展示订单详情信息 -->
          <el-descriptions class="margin-top" :column="1" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊人信息</div>
              </template>
              {{ orderInfo.patientName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊日期</div>
              </template>
              {{ orderInfo.reserveDate }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊医院</div>
              </template>
              {{ orderInfo.hosname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">就诊科室</div>
              </template>
              {{ orderInfo.depname }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医生职称</div>
              </template>
              {{ orderInfo.title }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">医事服务费</div>
              </template>
              <span style="color: red">{{ orderInfo.amount }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号单号</div>
              </template>
              {{ orderInfo.outTradeNo }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">挂号时间</div>
              </template>
              {{ orderInfo.createTime }}
            </el-descriptions-item>
          </el-descriptions>
          <div
            class="btn"
            v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1"
          >
            <el-popconfirm title="确定取消预约吗?" @confirm="cancel">
              <template #reference>
                <el-button>取消预约</el-button>
              </template>
            </el-popconfirm>
            <el-button
              type="primary"
              size="default"
              v-if="orderInfo.orderStatus == 0"
              @click="openDialog"
              >支付</el-button
            >
          </div>
        </div>
        <div class="right">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>注意事项</span>
              </div>
            </template>
            <p>
              1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；
            </p>
            <p style="color: red">
              2.【取号】就诊当天需在
              {{
                orderInfo.fetchTime
              }}在医院取号，未取号视为爽约，该号不退不换；
            </p>
            <p>
              3.【退号】在{{ orderInfo.quitTime }}前可在线退号
              ，逾期将不可办理退号退费；
            </p>
            <p>
              4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
            </p>
            <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
          </el-card>
        </div>
      </div>
    </el-card>
    <el-dialog
      @close="close"
      v-model="dialogVisible"
      title="微信支付"
      style="width: 600px"
    >
      <!-- 支付需要使用的二维码图片 -->
      <div class="qrocde">
        <img :src="imgUrl" alt="" />
        <p>请使用微信扫一扫</p>
        <p>扫描二维码支付</p>
      </div>
      <!-- 对话框底部插槽传递结构 -->
      <template #footer>
        <el-button type="primary" size="default" @click="closeDialog"
          >关闭窗口</el-button
        >
      </template>
    </el-dialog>
  </div>
  <div v-else>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>挂号订单</span>
        </div>
      </template>
      <!--提供用户选择的下拉菜单-->
      <el-form :inline="true">
        <el-form-item label="就诊人">
          <el-select
            placeholder="请选择就诊人"
            v-model="patientId"
            @change="changeUser"
          >
            <el-option label="请选择全部就诊人" value=""></el-option>
            <el-option
              v-for="item in allUser"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select
            placeholder="请选择订单状态"
            v-model="orderStatus"
            @change="changeOrderState"
          >
            <el-option label="全部订单" value=""></el-option>
            <el-option
              v-for="(item, index) in allOrderState"
              :key="index"
              :label="item.comment"
              :value="item.status"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form> 
      <!-- 表格展示订单的数据 -->
      <el-table border style="margin: 10px 0px" :data="allOrderArr">
        <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
        <el-table-column label="医院" prop="hosname"></el-table-column>
        <el-table-column label="科室" prop="depname"></el-table-column>
        <el-table-column label="医生" prop="title"></el-table-column>
        <el-table-column label="服务费" prop="amount"></el-table-column>
        <el-table-column label="就诊人" prop="patientName"></el-table-column>
        <el-table-column
          label="订单状态"
          prop="param.orderStatusString"
        ></el-table-column>
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button type="text" @click="goDetail(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          @current-change="getOrderInfo"
          @size-change="handler"
          :total="total"
          class="fenye"
        />

    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import {
  getorderAPI,
  cancelorderAPI,
  wxpayAPI,
  searchpayAPI,
  allorderAPI,
  allusersAPI,
  allstatesAPI,
} from "@/api/user";
import { ref, onMounted } from "vue";
import QRCode from "qrcode";
let orderInfo = ref<any>({});
let $route = useRoute();
const id = $route.query.orderId;

async function getorderinfo() {
  const res = await getorderAPI(id as string);
  if (res.data.code === 200) {
    orderInfo.value = res.data.data
  }
}
function cancel() {
  cancelorder();
}
async function cancelorder() {
  const res = await cancelorderAPI(id as string);
  console.log(res, 11);
  getorderinfo();
}
//支付对话框
let imgUrl = ref<string>("");
let dialogVisible = ref(false);
let timer = ref<any>();
async function openDialog() {
  dialogVisible.value = true;
  const res = await wxpayAPI(id as string);
  imgUrl.value = await QRCode.toDataURL(res.data.data.codeUrl);
  timer.value = setInterval(async () => {
    const result = await searchpayAPI(id as string);
    if (result.data.data) {
      dialogVisible.value = false;
      console.log(result.data.data);

      ElMessage({
        type: "success",
        message: "支付成功",
      });
      clearInterval(timer.value);
      getorderinfo();
    }
  }, 2000);
}
function closeDialog() {
  dialogVisible.value = false;
}
function close() {
  clearInterval(timer.value);
}


let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let allUser = ref<any>([]);
let allOrderState = ref<any>([]);
let patientId = ref<string>("");
let orderStatus = ref<string>("");
let allOrderArr = ref<any>([]);
let total = ref<number>();
let $router = useRouter()
async function getallorder() {
  const res = await allorderAPI(
    pageNo.value,
    pageSize.value,
    patientId.value,
    orderStatus.value
  );
  if (res.data.code === 200) {    
    allOrderArr.value = res.data.data.records;
    total.value = parseInt(res.data.data.total);
  }
}
function goDetail(row) {
  $router.push({path:'/user/order',query:{orderId:row.id}})
}
function changeUser(e) {
  getallorder()
}
function changeOrderState(e) {
  console.log(e);
  
  getallorder()
}
function getOrderInfo(e) {
  pageNo.value = e
  getallorder()
}

function handler(e) {
  pageSize.value = e
  getallorder()
}
async function getallusers() {
  const res:any = await allusersAPI()
  if (res.data.code===200) {
    allUser.value = res.data.data
    console.log(allUser);
    
  }
}
async function geiallstates() {
  const res:any = await allstatesAPI()
  if (res.data.code===200) {
    allOrderState.value = res.data.data
    console.log(allOrderState);
  }
}
onMounted(() => getorderinfo());
onMounted(() => getallorder());
onMounted(() => getallusers());
onMounted(() => geiallstates());
</script>


<style scoped lang="scss">
.box-card {
  .detail {
    color: #7f7f7f;
    font-weight: 900;
  }
  .top {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    .tag {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin-left: 5px;
      }
    }
    .right_info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
      }
      .info {
        margin-left: 10px;
        p {
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
  }

  .bottom {
    display: flex;
    margin-top: 20px;
    .left {
      flex: 4;
      .btn {
        margin: 10px 0px;
      }
    }
    .right {
      margin-left: 20px;
      flex: 6;
      p {
        line-height: 30px;
      }
    }
  }
}

::v-deep(.el-dialog__body) {
  border-top: 1px solid #7f7f7f;
  border-bottom: 1px solid #7f7f7f;
}

.qrocde {
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 18px;
    line-height: 30px;
  }
}
.fenye{
  margin-bottom: 50px;
  height: 50px;
}
</style>
