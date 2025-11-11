/**
 * 调试工具函数
 * 仅在开发模式下启用
 */

const isDev = import.meta.env.DEV

/**
 * 开发环境下的日志输出
 * @param {...any} args - 要输出的参数
 */
export const devLog = (...args) => {
  if (isDev) {
    console.log('🔍 [Dev]', ...args)
  }
}

/**
 * 开发环境下的警告输出
 * @param {...any} args - 要输出的参数
 */
export const devWarn = (...args) => {
  if (isDev) {
    console.warn('⚠️ [Dev]', ...args)
  }
}

/**
 * 开发环境下的错误输出
 * @param {...any} args - 要输出的参数
 */
export const devError = (...args) => {
  if (isDev) {
    console.error('❌ [Dev]', ...args)
  }
}

/**
 * 输出表格格式的数据
 * @param {Array|Object} data - 要显示的数据
 * @param {string} label - 可选的标签
 */
export const devTable = (data, label = '') => {
  if (isDev) {
    if (label) {
      console.log(`📊 [Dev] ${label}`)
    }
    console.table(data)
  }
}

/**
 * 分组日志输出
 * @param {string} groupName - 组名
 * @param {Function} callback - 要在组内执行的函数
 */
export const devGroup = (groupName, callback) => {
  if (isDev) {
    console.group(`📁 [Dev] ${groupName}`)
    callback()
    console.groupEnd()
  }
}

/**
 * 性能计时器
 * @param {string} label - 计时器标签
 * @returns {Function} - 停止计时的函数
 */
export const devTimer = (label) => {
  if (isDev) {
    const startTime = performance.now()
    console.log(`⏱️ [Dev] ${label} - 开始`)
    
    return () => {
      const endTime = performance.now()
      const duration = (endTime - startTime).toFixed(2)
      console.log(`⏱️ [Dev] ${label} - 完成 (${duration}ms)`)
    }
  }
  return () => {} // 生产环境返回空函数
}

/**
 * 检查 LocalStorage 可用性
 * @returns {boolean}
 */
export const checkLocalStorage = () => {
  try {
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    devLog('✅ LocalStorage 可用')
    return true
  } catch (e) {
    devError('❌ LocalStorage 不可用:', e)
    return false
  }
}

/**
 * 打印当前环境信息
 */
export const printEnvInfo = () => {
  if (!isDev) return
  
  devGroup('环境信息', () => {
    console.log('模式:', import.meta.env.MODE)
    console.log('开发模式:', import.meta.env.DEV)
    console.log('生产模式:', import.meta.env.PROD)
    console.log('Base URL:', import.meta.env.BASE_URL)
    console.log('用户代理:', navigator.userAgent)
    console.log('视口大小:', `${window.innerWidth}x${window.innerHeight}`)
    console.log('LocalStorage 可用:', checkLocalStorage())
  })
}

/**
 * 监听 Vue 组件的生命周期（用于调试）
 * @param {string} componentName - 组件名称
 * @returns {Object} - 生命周期钩子对象
 */
export const debugLifecycle = (componentName) => {
  if (!isDev) {
    return {
      onMounted: () => {},
      onUpdated: () => {},
      onUnmounted: () => {}
    }
  }

  return {
    onMounted: () => {
      devLog(`🟢 ${componentName} - mounted`)
    },
    onUpdated: () => {
      devLog(`🔄 ${componentName} - updated`)
    },
    onUnmounted: () => {
      devLog(`🔴 ${componentName} - unmounted`)
    }
  }
}

/**
 * 调试响应式数据变化
 * @param {import('vue').Ref} ref - Vue ref 对象
 * @param {string} name - 数据名称
 */
export const debugRef = (ref, name) => {
  if (!isDev) return

  import('vue').then(({ watch }) => {
    watch(ref, (newVal, oldVal) => {
      devLog(`🔀 ${name} 变化:`, {
        旧值: oldVal,
        新值: newVal
      })
    })
  })
}

/**
 * 获取组件性能统计
 * @param {string} componentName - 组件名称
 * @returns {Object} - 性能统计对象
 */
export const getComponentStats = (componentName) => {
  if (!isDev) return null

  let renderCount = 0
  let totalRenderTime = 0

  return {
    startRender: () => {
      return performance.now()
    },
    endRender: (startTime) => {
      renderCount++
      const renderTime = performance.now() - startTime
      totalRenderTime += renderTime
      
      devGroup(`📈 ${componentName} 性能统计`, () => {
        console.log('渲染次数:', renderCount)
        console.log('本次渲染:', `${renderTime.toFixed(2)}ms`)
        console.log('平均渲染:', `${(totalRenderTime / renderCount).toFixed(2)}ms`)
        console.log('总渲染时间:', `${totalRenderTime.toFixed(2)}ms`)
      })
    },
    getStats: () => ({
      renderCount,
      totalRenderTime,
      avgRenderTime: totalRenderTime / renderCount
    })
  }
}

// 自动打印环境信息（仅开发模式）
if (isDev) {
  printEnvInfo()
}

export default {
  devLog,
  devWarn,
  devError,
  devTable,
  devGroup,
  devTimer,
  checkLocalStorage,
  printEnvInfo,
  debugLifecycle,
  debugRef,
  getComponentStats
}
