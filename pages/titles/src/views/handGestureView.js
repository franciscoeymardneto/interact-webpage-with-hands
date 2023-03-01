export default class HandGestureView {
    constructor () {
        
    }

    loop (fn) {
        requestAnimationFrame(fn)
    }

    scrollPage(top) {
        scroll({
          top,
          behavior: "smooth"
        })
      }
}