export default class VideoPlayerService {
    #model = null
    #faceLandmarksDetection
    constructor ({faceLandmarksDetection}){
        this.#faceLandmarksDetection = faceLandmarksDetection
    }

    async loadModel() {
        this.#model = this.#faceLandmarksDetection.load(
            this.#faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
            {maxFaces: 1}
        )
    }
}