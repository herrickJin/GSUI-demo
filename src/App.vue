<script setup lang="ts">
  import {GSMessage} from "./components/message"

  const clickSuccessMessage = () => {
    GSMessage.success("你点击了一下????");
  }

  // GSMessage.warning({
  //   duration: 10000,
  //   message: "warning",
  //   showClose: true
  // })
</script>

<template>
  <button @click="clickSuccessMessage">点我！</button>
  <button @click="GSMessage.error('你点错了')">点我？？</button>
</template>

<style scoped>

</style>
