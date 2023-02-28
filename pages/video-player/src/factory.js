import Camera from "../../../lib/shared/camera.js"
import { supportsWorksType } from "../../../lib/shared/util.js"
import VideoPlayerController from "./controller.js"
import VideoPlayerService from "./service.js"
import VideoPlayerView from "./view.js"


const camera = await Camera.init()

if (supportsWorksType()) {
  console.log('Suport')
} else {
  console.log('Nop');
}

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