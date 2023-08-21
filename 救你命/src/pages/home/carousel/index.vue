<template>
  <el-carousel height="350px">
      <el-carousel-item v-for="item in 3" :key="item">
         <img src="@/assets/images/web-banner-1.png" alt="">
         <img src="@/assets/images/web-banner-1.png" alt="">
         <img src="@/assets/images/web-banner-1.png" alt="">
      </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {

}
</script>

<style scoped>
img{
  width: 1200px;
  height: 350px;
}
</style>