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

    async #estimateHands () {
        try {
          const hands = await this.#service.estimateHands(this.#camera.video)
          
          for await(gesture of this.#service.detectGestures(hands)){}
        //   console.log(hands)  
        } catch (error) {
            console.error('Yamete Kudasai ', error)
        }
    }

      async #loop() {
        await this.#service.initializeDetector()
        await this.#estimateHands()
        this.#view.loop(this.#loop.bind(this))
      }
    

    async init() {
        return this.#loop()
    }
}