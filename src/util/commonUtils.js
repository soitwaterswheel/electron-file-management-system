// 将NodeJS的error-first风格转为promise风格
function promisify(asyncFunc) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      args.push(function callback(err, ...values) {
        if (err) {
          return reject(err)
        }
        return resolve(...values)
      })
      asyncFunc.call(this, ...args)
    })
  }
}

export { promisify }