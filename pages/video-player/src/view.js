export default class VideoPlayerView {

    #btnInit = document.querySelector('#init')
    #statusElement = document.querySelector('#status')
    #videoElement = document.querySelector('#video')
 
    loop(fn) {
        requestAnimationFrame(fn)
    }
    togglePlayVideo() {
        if (this.#videoElement.paused) {
          this.#videoElement.play()
          return
        }
        this.#videoElement.pause()
      }

    enableButton() {
        this.#btnInit.disabled = false
    }

    consfigureOnBtnClick(fn) {
        this.#btnInit.addEventListener('click', fn)
    }
    log(text) {
        this.#statusElement.innerHTML = text
    }

    setVideoSrc(url) {
        this.#videoElement.src = url
    }
}