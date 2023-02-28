import Camera from "../../../lib/shared/camera.js"
import { supportsWorksType } from "../../../lib/shared/util.js"
import VideoPlayerController from "./controller.js"
import VideoPlayerService from "./service.js"
import VideoPlayerView from "./view.js"


async function getWorker() {
  if (supportsWorksType()) {
    const worker = new Worker('./src/worker.js', {type: 'module'})
    return worker
  }
  console.log('Não suporta work type')

  const workMocker = {
    async postMessage() {},
    onmessage(msg){}
  }

  return workMocker
}

const worker = getWorker()
const camera = await Camera.init()
const [rootPath] = window.location.href.split('/pages/')

const factory = {
  async initalize() {
    return VideoPlayerController.initialize({
      view: new VideoPlayerView(),
      service: new VideoPlayerService({}),
      worker
      
    })
  }
}

export default factory