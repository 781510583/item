<template>
  <div>
    <carousel />
    <autocomplete />
    <el-row gutter="20" style="margin-top: 50px">
      <el-col :span="20">
        <level  @getlevel="getlevel"/>
        <Area @getarea="getarea"/>
        <div class="hospital">
          <yiyuan
            class="item"
            v-for="(item, index) in contenthospital"
            :key="index"
            :hospitalInfo="item"
          ></yiyuan>
        </div>
          <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalhospital"
            @current-change="currentChange"
            @size-change="sizeChange"
            style="height:150px;margin-top: -50px;"
          />
      </el-col>
      <el-col :span="4">
        <departments />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import carousel from "./carousel/index.vue";
//@ts-ignore
import autocomplete from "./autocomplete/index.vue";
//@ts-ignore
import level from "./level/index.vue";
//@ts-ignore
import Area from "./area/index.vue";
import departments from "./departments/index.vue";
//@ts-ignore
import yiyuan  from "./yiyuan/index.vue";
import { ref } from "vue";
// import {HospitalResponseData} from '@/api/home/type.ts'
import { onBeforeMount } from "vue";
import { hospitalAPI} from "@/api/home";
onBeforeMount(() => {
  hospinfo();
  // codehos()
});
let contenthospital = ref([]);
let hostype = ref<string>('')
let districtCode = ref<string>('')
let totalhospital = ref();
const hospinfo = async () => {
  const res: any = await hospitalAPI(pageNo.value, pageSize.value,hostype.value,districtCode.value);
  if (res.data.code === 200) {
    contenthospital.value = res.data.data.content;
    totalhospital.value = res.data.data.totalElements;
  }
};
// const codehos = async () => {
//   const res:any = await dictcodeAPI(dictCode.value)
//   console.log(res);
// }
function currentChange() {
  hospinfo();
  }
function sizeChange() {
  pageNo.value = 1
  hospinfo();
  }
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let background = ref<boolean>(true);
const getlevel = (level:string) => {
  const dengji:any = level.value
  hostype.value = dengji
  hospinfo();
}
const getarea = (area:string) => {
  const diqu = area.value
  districtCode.value = diqu
  hospinfo();
}

</script>

<style scoped lang="scss">
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 48%;
    margin: 10px 0px;
  }
}
</style>