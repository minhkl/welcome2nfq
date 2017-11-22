import $ from 'jquery'
import MainPage from './pages/mainPage.js'

const DUMMY_DATA = [{
  category: 'tedtalks',
  title: 'Ted Talks',
  image: 'assets/images/thumbnails/tedtalks.jpg',
  numberOfPicture: 17
}, {

  category: 'teamBuilding',
  title: 'Team Building',
  image: 'assets/images/thumbnails/teamBuilding.jpg',
  numberOfPicture: 44
}, {

  category: 'birthday',
  title: 'Birthday',
  image: 'assets/images/thumbnails/birthday.jpg',
  numberOfPicture: 27
}, {

  category: 'rockstars',
  title: 'Rockstars',
  image: 'assets/images/thumbnails/rockstars.jpg'
},
]

const preloadImages = [{
  url: 'assets/images/static/Background_blur.jpg',
  imageObj: null
}]

$(function() {
  window.mainPage = new MainPage($('.root'), DUMMY_DATA)

  for (let i = 0; i < preloadImages.length; i++) {
    let image = preloadImages[i]
    image.imageObj = new Image()
    image.imageObj.src = image.url
  }
})



window.global = {
  showDetails: (param) => {
    window.mainPage.showDetails(param)
  },
  closeDetails: (param) => {
    window.mainPage.closeDetails(param)
  },
  closePanotour() {
    window.mainPage.closeHexagonPanotour()
    window.mainPage.closePanotour()
  }
}
