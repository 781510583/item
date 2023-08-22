<template>
  <h1 style="font-size: 20px; font-weight: bold;">医院</h1>
  <el-row :gutter="20">
    <el-col :span="1.1"><div class="grid-content ep-bg-purple" />等级:</el-col>
    <el-col :span="1.1"><div class="grid-content ep-bg-purple" />全部</el-col>
    <el-col :span="1.1" v-for="level in levellist" :key="level.value" @click="demo(level)"><div class="grid-content ep-bg-purple" />{{ level.name }}</el-col>

  </el-row>
</template>

<script setup lang="ts">
import {getlevelandareaAPI} from '@/api/home'
import { onMounted } from 'vue';
import { ref } from 'vue';
let levellist = ref([])
let activeFlag = ref<string>('');
onMounted(() => {
getlist()
})
const getlist = async () => {
  const res: any = await getlevelandareaAPI('HosType');
  if (res.data.code === 200) {
    levellist.value = res.data.data
  }
};
function demo(level:string) {
  activeFlag.value = level;  
  $emit('getlevel',level)
}
let $emit = defineEmits(['getlevel'])
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