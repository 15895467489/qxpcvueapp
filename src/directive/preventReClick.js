export default {
    install (Vue) {
      // 防重复点击(指令实现)
      Vue.directive('preventReClick', {
        inserted (el, binding) {
          el.addEventListener('click', () => {
            if (!el.disabled) {
              el.disabled = true
              console.log(2)
              setTimeout(() => {
                el.disabled = false
              }, binding.value || 3000)
            }
          })
        }
      })
    }
  }