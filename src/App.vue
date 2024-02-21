<script setup lang="ts">
  import {GSMessage} from "./components/message"
  import GSProgress from "./components/progress/src/progress.vue";
  import {onMounted, ref} from "vue";

  const clickSuccessMessage = () => {
    GSMessage.success("你点击了一下????");
  }

  // GSMessage.warning({
  //   duration: 10000,
  //   message: "warning",
  //   showClose: true
  // })

  const percentage2 = ref(0)
  onMounted(() => {
    setInterval(() => {
      percentage2.value = (percentage2.value % 100) + 10
    }, 500)
  })
</script>

<template>
  <div class="demo-bloc">
    <div class="bloc-title">message</div>
    <button @click="clickSuccessMessage">点我！</button>
    <button @click="GSMessage.error('你点错了')">点我？？</button>
  </div>

  <div class="demo-bloc">
    <div class="bloc-title">GSProgress</div>
    <GSProgress :percentage="100" type="line" status="success" :showText="true" text-inside :stroke-width="20"/>
    <GSProgress :percentage="percentage2" type="line" status="info" color="red"/>
  </div>

</template>

<style scoped>
.demo-bloc {
  margin: 20px;
}

.bloc-title {
  margin: 5px;
}

</style>
