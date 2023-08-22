<template>
  <div class="container">
    <top />
    <div class="content">
      <router-view></router-view>
    </div>
    <bottom />
    <login v-if="userStore.visiable" />
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";
let userStore = useUserStore();
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    margin-top: 70px;
    width: 1200px;
    min-height: 700px;
  }
}
</style>