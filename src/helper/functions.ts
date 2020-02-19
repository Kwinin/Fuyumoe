export function isChinesePhone(account: string): boolean {
  return /^1[3578]\d{9}$/.test(account)
}

export function isEmail(account: string): boolean {
  return /^.*@.*\..*$/.test(account)
}

export function del(obj: object, keys: Array<string>) {
  return keys.map((key) => delete obj[key])
}
// 判断是否为对象
const isObject = (obj: any) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

// 获取嵌套对象属性的值 Multi-level nesting
export function multiNestingGetValue(data: any, target: string): any {
  for (const key of Object.keys(data)) {
    if (key === target) {
      return data[key]
    }
    if (isObject(data[key])) {
      const result = multiNestingGetValue(data[key], target)
      if (typeof result !== 'undefined') {
        return result
      }
    }
  }
}
