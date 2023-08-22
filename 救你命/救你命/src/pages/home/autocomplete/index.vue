<template>
  <div class="search">
    <el-autocomplete
      :fetch-suggestions="querySearch"
      clearable
      class="inline-input w-50"
      placeholder="请输入医院名称"
      v-model="hosname"
      @select="handleSelect"
    />
    <el-button type="primary" size="default" icon="Search">搜索 </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { basicnameAPI } from "@/api/home";
import { useRouter } from "vue-router";
let search = ref([''])
let hosname = ref<string>("");
const querySearch = async (keyword: string, cb: any) => {
  let res = await basicnameAPI(keyword);
  if (res.data.data) {
    let showdata = res.data.data.map(item => {
    return{
      value:item.hosname,
      hoscode:item.hoscode
    }    
  })
  cb(showdata)
  }
};
let $router = useRouter()
function handleSelect(e) {
  console.log(e.hoscode);
  $router.push(`/hospital/register?hoscode=${e.hoscode}`)
}
</script>

<style scoped lang="scss">
.search {
  width: 100%;
  border-radius: 5px;
  margin-top: 20px;
  display: flex;
  justify-content: center;

  ::v-deep .inline-input {
    width: 700px;
    margin-right: 20px;
  }
}
</style>