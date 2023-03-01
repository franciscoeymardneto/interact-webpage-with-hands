export default class HandGestureView {
    constructor () {
        
    }

    loop (fn) {
        requestAnimationFrame(fn)
    }
}