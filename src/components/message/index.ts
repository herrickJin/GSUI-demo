import {withInstallFunction} from "../common.ts";
import Message from './src/method'

export * from './src/message'
export const GSMessage = withInstallFunction(Message, '$message')
export default GSMessage