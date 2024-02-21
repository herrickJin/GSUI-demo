import {withInstallFunction} from "../common.ts"
import Progress from './src/progress.vue'
export const GSProgress = withInstallFunction(Progress, '$progress')
export default GSProgress

export * from './src/progress'
