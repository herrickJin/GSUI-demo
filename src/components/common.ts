import type { App, Plugin, AppContext } from 'vue'
export type SFCWithInstall<T> = T & Plugin

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
    _context: AppContext | null
}

export const isNumber = (val: any): val is number => typeof val === 'number'
export const isString = (val: any): val is string => typeof val === 'string'
export const isFunction = (val: any): val is Function => typeof val === 'function'
export const isClient = typeof window !== "undefined";

export const mutable = <T extends readonly any[] | Record<string, unknown>>(
    val: T
) => val as Mutable<typeof val>
export type Mutable<T> = { -readonly [P in keyof T]: T[P] }

export const withInstallFunction = <T>(fn: T, name: string) => {
    ;(fn as SFCWithInstall<T>).install = (app: App) => {
        ;(fn as SFCInstallWithContext<T>)._context = app._context
        app.config.globalProperties[name] = fn
    }
    return fn as SFCInstallWithContext<T>
}