export default class HandGestureService {
    #fingerpose
    #handPoseDetection
    #handPoseVersion
    #detector = null
    constructor({ fingerpose, handPoseDetection, handPoseVersion }) {
        this.#fingerpose = fingerpose
        this.#handPoseDetection = handPoseDetection
        this.#handPoseVersion = handPoseVersion
    }

    async initializeDetector() {
        if(this.#detector) return this.#detector;

        const model = this.#handPoseDetection.SupportedModels.MediaPipeHands;
        const detectorConfig = {
            runtime: 'mediapipe', // or 'tfjs',
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.#handPoseVersion}`,
            // full is the most hard and precisely
            modelType: 'lite',
            maxHands: 2
        }
        this.#detector = await this.#handPoseDetection.createDetector(model, detectorConfig);
    }
}