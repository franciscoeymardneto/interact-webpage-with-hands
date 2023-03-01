export default class GetVideoFrame {
    #videoFrameCanvas = document.createElement('canvas')
    #canvasContext = this.#videoFrameCanvas.getContext('2d', { willReadFrequently: true })
    constructor() {

    }

    async get(video) {
        const canvas = this.#videoFrameCanvas
        const [width, height] = [video.videoWidth, video.videoHeight]
        canvas.width = width
        canvas.height = height

        this.#canvasContext.drawImage(video, 0, 0, width, height)
        return this.#canvasContext.getImageData(0, 0, width, height)
    }
}