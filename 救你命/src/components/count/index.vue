<template>
  <div>
    <span>获取验证码{{ t }}s</span>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
let t = ref(5);
watch(
  () => props.count,
  () => {
    const timer = setInterval(() => {
      t.value -= 1;
      if (t.value === 0) {
        clearInterval(timer)
        $emit('getcount',false)
      }
    }, 1000);
  },
  {
    immediate: true,
  }
);
let $emit =defineEmits(['getcount'])
let props = defineProps(["count"]);

</script>
<style>
</style>