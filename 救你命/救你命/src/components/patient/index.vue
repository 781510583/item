<template>
  <div class="visitor">
    <div class="top">
      <div class="left">
        <span class="free">
          {{ user.isInsure == 1 ? "医保" : "自费" }}
        </span>
        <span class="username">{{ user.name }}</span>
      </div>
      <div class="right">
        <!-- 修改 -->
        <el-button
          v-if="$route.path == '/user/patient'"
          circle
          type="primary"
          size="default"
          :icon="Edit"
          @click="handle"
        ></el-button>

        <el-popconfirm :title="`你确定要删除${user.name}`" width="200px" @confirm="handledelete">
          <template #reference>
          <!-- 删除 -->
            <el-button
              v-if="$route.path == '/user/patient'"
              circle
              type="danger"
              size="default"
              :icon="Delete"
            ></el-button>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <p>证件类型: {{ user.param.certificatesTypeString }}</p>
      <p>证件号码: {{ user.certificatesNo }}</p>
      <p>用户性别: {{ user.sex == 0 ? "女生" : "男士" }}</p>
      <p>出生日期: {{ user.birthdate }}</p>
      <p>手机号码: {{ user.phone }}</p>
      <p>婚姻状况: {{ user.isMarry == 0 ? "未婚" : "已婚" }}</p>
      <p>当前住址: {{ user.param.cityString }}</p>
      <p>详细地址: {{ user.address }}</p>
      <transition name="confirm">
        <div class="confirm" v-if="index === currentIndex">已选择</div>
      </transition>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import { Edit, Delete } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
// import { patientAPI } from "@/api/hospital";
import {deleteAPI} from "@/api/user"
import { ElMessage } from "element-plus";
let props = defineProps(["user", "index", "currentIndex"]);
let isInsure = ref(1);
let user = ref();
let $emit = defineEmits(["changeScene","removeUser"]);
function handle() {
  $emit('changeScene',props.user)
}
user.value = props.user;
async function handledelete() {
  console.log(props.user.id);
  const res = await deleteAPI(props.user.id)
  if (res.data.code ===200) {
    ElMessage({
      type:'success',
      message:'删除成功'
    })
    $emit('removeUser');
  }
  
}
</script>
  
<style scoped lang="scss">
.visitor {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  .top {
    height: 60px;
    background: #e5e5e5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left {
      .free {
        background: white;
        padding: 5px;
        font-size: 12px;
        margin-right: 5px;
        border-radius: 10px;
      }
      .username {
        color: #7f7f7f;
      }
    }
  }
  .bottom {
    position: relative;
    padding: 20px;
    p {
      line-height: 40px;
    }
    .confirm {
      position: absolute;
      width: 200px;
      height: 200px;
      color: red;
      border-radius: 50%;
      border: 1px solid red;
      text-align: center;
      line-height: 200px;
      font-size: 25px;
      left: 20%;
      top: 20%;
      opacity: 0.5;
      transform: rotate(35deg);
      font-weight: 900;
    }

    .confirm-enter-from {
      transform: scale(1);
    }

    .confirm-enter-active {
      transition: all 0.3s;
    }

    .confirm-enter-to {
      transform: scale(1.2);
    }
  }
}
</style>
  