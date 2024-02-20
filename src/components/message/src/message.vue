<template>
  <Transition name="gs-message-fade" @before-leave="beforeLeave" @after-leave="emit('destroy')">
    <div v-show="visible" :id="id" :class="[n(), type && n('--' + type)]" :style="styles">
      <div v-if="!dangerouslyUseHTMLString" :class="n('content')">
        <slot>{{ props.message }}</slot>
      </div>
      <div v-else :class="n('content')" v-html="message"></div>
      <!-- 这里是icon -->
      <div v-if="showClose" :class="n('closeBtn')" @click="close">X</div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {MessageProps} from './message'
import {createNamespace} from '../../components.ts'
import {computed, onBeforeMount, onMounted, ref} from "vue";

defineOptions({
  name: 'GSMessage'
})

const {n} = createNamespace('message')
const props = defineProps(MessageProps)
const emit = defineEmits(['destroy', 'close'])

console.log("message", props.message)

const visible = ref(false)
const timerId = ref()

const styles = computed(() => ({
  top: props.offset + 'px',
  zIndex: props.zIndex
}))

const startTimer = () => {
  timerId.value = setTimeout(() => {
    visible.value = false
  }, props.duration)
}

const clearTimer = () => {
  if (timerId.value) {
    clearTimeout(timerId.value)
    timerId.value = undefined
  }
}

const close = () => visible.value = false

const beforeLeave = () => {
  emit('close')
}

onMounted(() => {
  startTimer()
  visible.value = true
})

onBeforeMount(() => {
  clearTimer()
})

defineExpose({
  visible,
  close
})

</script>

<style lang="less">
@import '../style/message.less';

</style>