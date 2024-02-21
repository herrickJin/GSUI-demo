<template>
  <div :class="[n(), n(`--${props.type}`), n(`--${props.status}`)]" :style="styles">
    <template v-if="type === PROGRESS_TYPE_INE">
      <div :class="n('bar')">
        <div :class="n('bar__outer')">
          <div :class="n('bar__inner')" :style="{ width: barWidth }">
            <div v-if="showText && textInside" :class="n('bar__innerText')">
              <slot :percentage="percentage"><span>{{ text }}</span></slot>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showText && !textInside" :class="n('text')">
        <slot :percentage="percentage">
          <!--  ICON -->
          <span v-if="iconName && isShowIcon">{{ iconName }}</span>
          <template v-else>{{ text }}</template>
        </slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {computed, CSSProperties} from "vue";
import {createNamespace} from "../../components.ts";
import {ProgressProps, ProgressStatus, PROGRESS_TYPE_INE} from "./progress.ts";
import {isFunction, isString} from "../../common.ts";

defineOptions({name: 'GSProgress'})

const props = defineProps(ProgressProps)

console.log("props =======>", props)

const __iconMap: { [key in ProgressStatus]: string } = {
  success: 'circle-check',
  warning: 'warning',
  info: 'info-filled',
  danger: 'circle-close'
}

const {n} = createNamespace('progress')

const barWidth = computed(() => props.percentage + '%')

const iconName = computed(() => {
  return __iconMap[props.status!] && __iconMap[props.status!]
})

const isShowIcon = computed(() => {
  return props.isShowIcon && props.status;
})

const text = computed(() => {
  return isFunction(props.format) ? props.format(props.percentage!) : props.percentage + '%'
})

const styles = computed(() => {
  const __color = getColor(props.color)
  console.log("color", __color)
  const __trackColor = getColor(props.trackColor, '--gs-progress-track-color')
  return {
    '--gs-progress-stroke-width': props.strokeWidth + 'px',
    ...__color,
    ...__trackColor
  }
})

function getColor(colorData: typeof props.color, colorKey?: string): CSSProperties {
  const style: CSSProperties | any = {}
  colorKey = colorKey || '--gs-progress-stroke-color'
  if (colorData) {
    if (isString(colorData)) { // 如果是字符串直接设置即可
      style[colorKey] = colorData
    }
    if (Array.isArray(colorData)) { // 如果是数组
      const colors = [...colorData]

      colors.sort((a, b) => a.percentage - b.percentage)
      const colorItem = colors.find(c => c.percentage >= props.percentage!)

      if (colorItem) style[colorKey] = colorItem.color
    } else if (isFunction(colorData)) { // 是函数
      style[colorKey] = colorData(props.percentage!)
    }

  }

  return style
}

</script>

<style scoped>
@import '../style/progress.less';

</style>