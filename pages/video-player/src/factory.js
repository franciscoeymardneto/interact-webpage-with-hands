import VideoPlayerController from "./controller.js"
import VideoPlayerService from "./service.js"
import VideoPlayerView from "./view.js"

const videoPlayerWorker = new Worker('./src/worker.js')
const [rootPath] = window.location.href.split('/pages/')

const factory = {
  async initalize() {
    return VideoPlayerController.initialize({
      view: new VideoPlayerView(),
      service: new VideoPlayerService({ 
        worker: videoPlayerWorker
      }),
      
    })
  }
}

export default factory