export default class VideoPlayerController {
  #view
  #camera
  #worker
  #blinkCounter = 0
  #getVideoFrame
  constructor({ view, camera, worker, getVideoFrame }) {
    this.#view = view
    this.#camera = camera
    this.#worker = this.#configureWorker(worker)
    this.#getVideoFrame = getVideoFrame

    this.#view.consfigureOnBtnClick(this.onBtnStart.bind(this))

  }

  static async initialize(deps) {
    const controller = new VideoPlayerController(deps)
    controller.log('Not yet detected eye blink! click in the button to start ')
    return controller.init()
  }

  #configureWorker(worker) {
    let ready = false
    worker.onmessage = ({ data }) => {
      if ('READY' === data) {
        console.log('worker is ready!')
        this.#view.enableButton()
        ready = true
        return
      }
      const blinked = data.blinked
      this.#blinkCounter += blinked
      this.#view.togglePlayVideo()
      console.log('blinked', blinked)
    }

    return {
      send(msg) {
        if (!ready) return
        worker.postMessage(msg)
      }
    }
  }
  async init() {

    console.log('init')
  }

  async #loop() {
    const video = this.#camera.video
    const img = await this.#getVideoFrame.get(video)
    
    this.#worker.send(img)
    this.log(`detecting eye blink...`)
    // this.#view.loop(this.#loop.bind(this))
    setTimeout(() => this.#loop(), 100)
  }

  log(text) {
    const times = `      - blinked times: ${this.#blinkCounter}`
    this.#view.log(`status: ${text}`.concat(this.#blinkCounter ? times : ""))
  }

  onBtnStart() {
    this.log('initializing detection...')
    this.#blinkCounter = 0
    this.#loop()
  }

}
