import {rescue} from "./rescue";
export const swallow = <T extends abstract new (...args: any) => any>(type: InstanceType<T>) => (fail: (type: InstanceType<T>) => any) => (fn: Function) => async (...args: any) => {
    console.log(type)
    try {
        return await fn(...args)
    } catch (e) {
        rescue(e, type)
        return fail(e)
    }
}