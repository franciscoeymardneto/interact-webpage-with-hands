import CardsController from "./../controllers/cardsController.js"
import CardsService from "./../services/cardsService.js"
import CardsView from "./../views/cardsView.js"
const cardListWorker = new Worker('./src/workers/cardListWorker.js')
const [rootPath] = window.location.href.split('/pages/')

const factory = {
  async initalize() {
    return CardsController.initialize({
      view: new CardsView(),
      service: new CardsService({ 
        dbUrl: `${rootPath}/assets/database.json` ,
        worker: cardListWorker
      }),
      
    })
  }
}

export default factory