<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
        default-active = "0" 
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img src="../../assets/images/logo.png" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item
          @click="jiben"
            ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
          >
          <el-menu-item
          @click="genghuan"
            ><i class="el-icon-camera"></i>更换头像</el-menu-item
          >
          <el-menu-item
          @click="chongzhi"
            ><i class="el-icon-key"></i>重置密码</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="4" @click="emit"
          ><i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <div class="user-box">
          <img
            :src="$store.state.userInfo.user_pic"
            alt=""
            v-if="$store.state.userInfo.user_pic"
          />
          <img src="../../assets/images/login_bg.jpg" alt="" v-else />
          <span
            >欢迎
            {{
              $store.state.userInfo.nickname || $store.state.userInfo.username
            }}</span
          >
        </div>

        <el-menu
        :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#ce165c"
          text-color="#fff"
          active-text-color="#ffd700"
          router
        >
          <template v-for="item in menus">
            <el-menu-item
              v-if="!item.children"
              :index="item.indexPath"
              :key="item.indexPath"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <el-submenu
              v-else
              :index="item.indexPath"
              :key="item.indexPath + 1"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="(childitem, index) in item.children"
                :key="index"
                :index="childitem.indexPath"
              >
                <i :class="childitem.icon"></i
                >{{ childitem.title }}</el-menu-item
              >
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
  
  <script>
import { userMenusAPI } from "@/api";
export default {
  name: "my-layout",
  data() {
    return {
      menus: [],
    };
  },
  methods: {
    emit() {
      this.$confirm("确定退出", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功",
          });
          this.$store.commit("updateToken", "");
          this.$store.commit("updateUserInfo", {});
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出",
          });
        });
    },
    handleOpen() {
      console.log();
    },
    handleClose() {
      console.log();
    },
    async userMenus() {
      const res = await userMenusAPI();
      this.menus = res.data.data;
    },
    jiben() {
      // console.log(this);
      this.$router.push("/user-info")
    },
    genghuan() {
      this.$router.push("/user-avatar")
    },
    chongzhi() {
      this.$router.push("/user-pwd")
    }
  },
  created() {
    this.userMenus();
  },
};
</script>
  
  <style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
</style>