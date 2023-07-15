import { eventBus } from '@/utils'
import router from '@/router'

document.addEventListener('plusready', () => {
  // 监听plus api 是否加载完成
  const webview = window.plus.webview.currentWebview() // 获取webview
  let flag = 0
  function backbutton() {
    // 监听返回键
    webview.canBack((e) => {
      // webview事件,如果是首页参数值为false,其他页面为true
      if (e.canBack) {
        // 不是首页执行webview返回操作
        webview.back()
        // setTimeout(() => {
        //   const currentRoute = router.options.routes.find(1
        //     (x) => x.path === window.location.hash.split('#')[1].split('?')[0]
        //   )
        //   const tabIndex = currentRoute?.meta?.tabIndex
        //   // 切换tabbar高亮？但是现在点tabbar时，会清空历史路由，所以暂时不需要了
        //   tabIndex && eventBus.emit('backbutton', tabIndex)
        // }, 0)
      } else {
        // 按一次提示再按一次退出应用 两秒内按两次退出应用
        if (flag === 1) {
          window.plus.runtime.quit()
          return
        }
        flag = 1
        plus.nativeUI.toast('再按一次退出应用')
        setTimeout(() => {
          flag = 0
        }, 2000)
      }
    })
  }
  // 可能由于@vitejs/plugin-legacy，js执行两遍。监听之前先清除
  window.plus.key.removeEventListener('backbutton', backbutton)
  window.plus.key.addEventListener('backbutton', backbutton)
})
