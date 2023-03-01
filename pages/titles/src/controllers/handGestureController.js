export default class HandGestureController {
    #view
    #service
    #camera
    #getVideoFrame
    constructor({ view, service, camera, getVideoFrame }) {
        this.#view = view
        this.#service = service
        this.#camera = camera
        this.#getVideoFrame = getVideoFrame
    }

    static async initialize(deps) {
        const controller = new HandGestureController(deps)
        return controller.init()
    }


      async loop() {
        const video = this.#camera.video
        // const img = await this.#getVideoFrame.get(video)
        
        // await this.#service.estimateHands(img) 
        // setTimeout(() => this.loop(), 100)
      }
    

    async init() {
        await this.#service.initializeDetector()
        await this.loop()
    }
}