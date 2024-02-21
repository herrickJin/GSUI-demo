import {PropType} from "vue";

export const PROGRESS_TYPE_INE:string = 'line'

export type ProgressStatus = 'success' | 'warning' | 'info' | 'danger'

type ProgressType = 'line' | 'circle' | 'dashboard'

type Fn<T> = (percentage: number) => T

type ProgressColorItem = {
    color: string
    percentage: number
}

type ProgressColor = string | Fn<string> | ProgressColorItem[]

export const ProgressProps = {
    type: {
        type: String as PropType<ProgressType>,
        default: 'line'
    },
    percentage: {
        type: Number,
        default: 0
    },
    format: {
        type: Function as PropType<Fn<boolean>>
    },
    status: {
        type: String as PropType<ProgressStatus>,
        default: '',
    },
    strokeWidth: {
        type: Number,
        default: 6
    },
    textInside: {
        type: Boolean,
        default: false,
    },
    color: {
        type: [String, Array, Function] as PropType<ProgressColor>
    },
    trackColor: {
        type: [String, Array, Function] as PropType<ProgressColor>
    },
    width: {
        type: Number,
        default: 126,
    },
    strokeLinecap: {
        type: String as PropType<'round' | 'inherit' | 'butt' | 'square'>,
        default: 'round'
    },
    showText: {
        type: Boolean,
        default: true
    },
    isShowIcon: {
        type: Boolean,
        default: false
    }
}
