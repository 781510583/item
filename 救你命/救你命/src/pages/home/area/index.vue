<template>
    <el-row :gutter="20">
    <el-col :span="1.1"><div class="grid-content ep-bg-purple" />地区:</el-col>
    <el-col :span="1.1"><div class="grid-content ep-bg-purple" />全部</el-col>
    <el-col :span="1.1" v-for="area,index in arealist" :key="index"  @click="demo(area)"><div class="grid-content ep-bg-purple"/>{{area.name}}</el-col>
  </el-row>
</template>

<script setup lang="ts">
import {getlevelandareaAPI} from '@/api/home'
import { onMounted } from 'vue';
import { ref } from 'vue';
let areaflag = ref<string>('')
let arealist = ref([])
onMounted(() => {
getlist()
})
const getlist = async () => {
  const res: any = await getlevelandareaAPI('beijin');  
  if (res.data.code === 200) {
    arealist.value = res.data.data
  }
};
function demo(area:string) {
  areaflag.value = area;  
  $emit('getarea',area)
}
let $emit = defineEmits(['getarea'])
</script>
<style scoped lang="scss">
.el-col {
  border-radius: 4px;
  font-size: 14px;
  color: rgb(121, 116, 116);
  cursor: pointer;
}
.el-col div :hover{
  color: #55a6fe;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>