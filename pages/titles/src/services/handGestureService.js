import { gestureStrings, knownGestures } from '../util/gestures.js'
export default class HandGestureService {
    #gestureEstimator
    #handPoseDetection
    #handPoseVersion
    #detector = null
    constructor({ fingerpose, handPoseDetection, handPoseVersion }) {
        this.#gestureEstimator = new fingerpose.GestureEstimator(knownGestures)
        this.#handPoseDetection = handPoseDetection
        this.#handPoseVersion = handPoseVersion
    }

    async estimate(keypoints3D) {

        const predictions = await this.#gestureEstimator.estimate(
            this.#getHandMarksFromKeyPoints(keypoints3D),
            // porcetagem de confianca dos gestos 90%
            9
        )
        console.log({ predictions });

        return predictions.gestures
    }

    async * detectGestures(predictions) {

        for (const hand of predictions) {
            if (!hand.keypoints3D) continue;

            const gestures = await this.estimate(hand.keypoints3D)
            if (!gestures.length) continue;

            const result = gestures.reduce(
                (previous, current) => (previous.score > current.score) ? previous : current
            )

            const { x, y } = hand.keypoints.find(keypoint => keypoint.name === 'index_finger_tip')
            yield { event: result.name, x, y }

            console.log('detected', gestureStrings[result.name])
        }
    }

    #getHandMarksFromKeyPoints(keypoints3D) {
        return keypoints3D.map(keypoint =>
            [keypoint.x, keypoint.y, keypoint.z]
        )
    }

    async estimateHands(video) {
        const hands = await this.#detector.estimateHands(video, {
            flipHorizontal: true
        })

        return hands
    }
    async initializeDetector() {
        if (this.#detector) return this.#detector;

        const model = this.#handPoseDetection.SupportedModels.MediaPipeHands;
        const detectorConfig = {
            runtime: 'mediapipe', // or 'tfjs',
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.#handPoseVersion}`,
            // full is the most hard and precisely
            modelType: 'lite',
            maxHands: 2
        }
        this.#detector = await this.#handPoseDetection.createDetector(model, detectorConfig);

        return this.#detector
    }
}