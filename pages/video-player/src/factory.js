import Camera from "../../../lib/shared/camera.js"
import { supportsWorksType } from "../../../lib/shared/util.js"
import VideoPlayerController from "./controller.js"
import VideoPlayerService from "./service.js"
import VideoPlayerView from "./view.js"


async function getWorker() {
  if (supportsWorksType()) {
    console.log('Suporta')
    const worker = new Worker('./src/worker.js', {type: 'module'})
    return worker
  }

  const workMocker = {
    async postMessage() {},
    onmessage(msg){ console.log(msg)}
  }

  return workMocker
}

const worker = await getWorker()
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