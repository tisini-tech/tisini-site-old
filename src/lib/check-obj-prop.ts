

// eslint-disable-next-line @typescript-eslint/ban-types
export function checkObjectProp<T extends Object, R>(obj: T, prop: keyof T, cb: (obj: T) => R) {
    // eslint-disable-next-line no-prototype-builtins
    return obj.hasOwnProperty(prop) && cb(obj)
}