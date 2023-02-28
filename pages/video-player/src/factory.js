import VideoPlayerController from "./controller.js"
const [rootPath] = window.location.href.split('/pages/')

const factory = {
  async initalize() {
    return VideoPlayerController.initialize({
    //   view: new CardsView(),
    //   service: new CardsService({ 
    //     dbUrl: `${rootPath}/assets/database.json` ,
    //     worker: cardListWorker
    //   }),
      
    })
  }
}

export default factory