export default class HandGestureController {
    #view
    #service
    #camera
    constructor({ view, service, camera }) {
        this.#view = view
        this.#service = service
        this.#camera = camera
    }

    static async initialize(deps) {
        const controller = new HandGestureController(deps)
        return controller.init()
    }


    async loop() {
        const video = this.#camera.video

        console.log(video);
        // const img = this.#view.getVideoFrame(video)
        // await this.#service.estimateHands(img) 
        //setTimeout(() => this.loop(), 100)
      }

    async init() {
        await this.#service.initializeDetector()
        await this.loop()
    }
}