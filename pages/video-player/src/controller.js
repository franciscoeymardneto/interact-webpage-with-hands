export default class VideoPlayerController {
  #view
  #service
  #worker
  constructor({ view, service,worker }) {
    this.#view = view
    this.#service = service
    this.#worker = worker

    this.#view.consfigureOnBtnClick(this.onBtnStart.bind(this))
  }

  static async initialize(deps) {
    const controller = new VideoPlayerController(deps)
    controller.log('Not yet detected eye blink! click in the button to start ')
    return controller.init()
  }

  async init() {
    
    console.log('init')
  }

  log (text) {
    this.#view.log(`Log: ${text}`)
  }

  onBtnStart() {
    this.log('initializing something...')
  }

}
