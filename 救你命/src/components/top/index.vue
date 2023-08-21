<template>
  <div class="top">
    <div class="content">
      <!-- 左侧 -->
      <div class="left" @click="handleSelect" style="cursor: pointer">
        <img src="@/assets/images/dog.jpg" alt="" />
        <p>救你命 预约挂号统一平台</p>
      </div>
      <div class="right">
        <p class="help" style="cursor: pointer">帮助中心</p>
        <p
          class="login"
          @click="login"
          style="cursor: pointer"
          v-if="!userStore.userinfo.value"
        >
          登录/注册
        </p>
        <p class="login" style="cursor: pointer" v-else>
          {{ userStore.userinfo.value.name }}
        </p>
        <!-- 如果没有用户名字:显示登录注册 -->
        <!-- 如果有用户信息展示用户信息 -->
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
              <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
let props: any = defineProps(["hospitalInfo"]);
let $router = useRouter();
function handleSelect() {
  $router.push("/home");
}

import useUserStore from "@/store/modules/user";
let userStore: any = useUserStore();

function login() {
  userStore.visiable = true;
}
function logout() {
  if (userStore.userinfo.value) {
    localStorage.removeItem("USERINFO");
    userStore.logout();
    $router.push("/home");
  }
}
const goUser = (path: string) => {
  $router.push({ path: path });
};
</script>


<style scoped lang="scss">
.top {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 70px;

  display: flex;
  justify-content: center;
  .content {
    width: 1200px;
    height: 70px;
    background: white;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      p {
        font-size: 20px;
        color: #55a6fe;
      }
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #bbb;
      .help {
        margin-right: 10px;
      }
    }
  }
}
</style>
