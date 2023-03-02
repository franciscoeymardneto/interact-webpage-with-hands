export default class HandGestureView {
  #handsCanvas = document.querySelector('#hands')
  #canvasContext = this.#handsCanvas.getContext('2d')

  constructor(){
    this.#handsCanvas.width = globalThis.screen.availWidth
    this.#handsCanvas.height = globalThis.screen.availHeight
  }

  clear() {
    this.#canvasContext.clearRect(0, 0, this.#handsCanvas.width, this.#handsCanvas.height)
  }

  drawResults(hands) {

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