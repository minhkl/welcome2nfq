import $ from 'jquery'
import StoreThumbnail from '../components/storeThumbnail'
import HexagonPopup from '../components/hexagonPopup'
import Panotour from '../components/panotour'
import Popup from '../components/popup'
import slideShowTemplate from '../slideShowTemplate'
const HTML =
`
  <div id='mainPage'>
    <div class='main-area'>
      <div class='main-area-handle-touch'></div>

      <h1 class='title'>Welcome to <span class='brand'>.NFQ</span></h1>
      <div class='store-thumbnail-container'></div>
    </div>
  </div>
`
const MAX_IDLE_TIME = 10 * 60// 1 minutes

export default class MainPage {
  constructor(root, storeArray) {
    // Private properties
    this._hexagonPopup = null
    this._popup = null
    this._panotour = null
    this._timer = null
    this._timeRemain = -1

    const view = $(HTML)
    view.on('click', this.resetCountdown.bind(this))
    // view.find('.main-area-handle-touch').on('click', this.showPanotour.bind(this))
    const storeThumbnailContainer = view.find('.store-thumbnail-container')
    this.addStoreThumbnails(storeThumbnailContainer, storeArray)

    root.append(view)
  }
  addStoreThumbnails(container, storeArray) {
    for (let index in storeArray) {
      const store = storeArray[index]
      const thumbnail = new StoreThumbnail(container, store)
      thumbnail.setOnClickCallback(this.handleStoreThumbnailClick.bind(this))
    }
  }
  handleStoreThumbnailClick(store) {

    switch (store.category) {
      case 'rockstars': {
        this.showDetails(null, true)
        break;
      }
      case 'teamBuilding':
      case 'tedtalks':
      case 'birthday':
      default: {
        this.showDetails(store)
      }
    }
  }




  getDetailsUrl(id) {
    switch (id) {

      case '33883433':
        return '/Nach-Hersteller/bareMinerals/bareMinerals-Statement-Under-Over-Lip-Liner.html'
      case '4286920':
        return '/Nach-Hersteller/bareMinerals/bareMinerals-Mineral-Veil-Fixierpuder.html'
      case '4299393':
        return '/Nach-Hersteller/bareMinerals/bareMinerals-SPF-15-Original-Foundation.html'
      case '31215753':
        return '/Nach-Hersteller/bareMinerals/bareMinerals-bareSkin-Serum-Foundation-LSF-20.html'
      case '31885472':
        return '/Nach-Hersteller/bareMinerals/bareMinerals-Complexion-Rescue-getoentes-Feuchtigkeitscreme-Gel.html'
      case '5098570':
        return '/Nach-Hersteller/bareMinerals/bareMinerals-Marvelous-Moxie-Lippenstift.html'
      case '5098591':
        return '/Nach-Hersteller/bareMinerals/bareMinerals-Marvelous-Moxie-Lip-Gloss.html'
      case '32146197':
        return '/Nach-Hersteller/bareMinerals/bareMinerals-Pop-of-Passion-Lip-Balm.html'
      default:
        return 'cms/Lippen'
    }
  }


  showDetails(param, showTeam) {

    if (this._popup == null) {
      this._popup = new Popup()
      this._popup.onClickIframeCallback = this.resetCountdown.bind(this)
    }
    if (showTeam) {
      this._popup.setIframSrc('team.html')
    } else {
      const slideShowContent = this.getSlideShowContent(param.category, param.numberOfPicture)
      this._popup.setIframeContent(slideShowTemplate(slideShowContent))
    }

    this._popup.show()
  }
  getSlideShowContent(category, numberOfPicture) {
    let content = ""
    for (let i = 0; i < numberOfPicture; i++) {
      content += `
      <div>
          <img data-u="image" src="assets/images/${category}/p${i}.jpg"/>
          <img data-u="thumb" src="assets/images/${category}/p${i}.jpg" />
      </div>
      `
    }
    return content
  }
  closeDetails() {
    if (this._popup) {
      this._popup.hide()
    }
  }

  showHexagonPanotour(store) {
    if (this._hexagonPopup == null) {
      this._hexagonPopup = new HexagonPopup()
      this._hexagonPopup.onClickIframeCallback = this.resetCountdown.bind(this)
    }
    // this._hexagonPopup.setIframSrc(`./customStoreInside.html?screenId=${store.storeId}`)
    this._hexagonPopup.setIframSrc(`./customPanotour.html?screenId=${store.storeId}`)

    this._hexagonPopup.setOverlayImage(store.background)
    this._hexagonPopup.show()
  }
  closeHexagonPanotour() {
    if (this._hexagonPopup) {
      this._hexagonPopup.hide()
    }
  }

  showPanotour() {
    if (this._panotour == null) {
      this._panotour = new Panotour()
      this._panotour.onClickIframeCallback = this.resetCountdown.bind(this)
    }
    this._panotour.setIframSrc('./customPanotour.html')
    this._panotour.show()
  }
  closePanotour() {
    if (this._panotour) {
      this._panotour.hide()
    }
  }
  resetCountdown() {
    if (this._timer) {
      clearInterval(this._timer)
    }
    this._timeRemain = MAX_IDLE_TIME
    this._timer = setInterval(this.countdown.bind(this), 1000)
    this.countdown()
  }
  countdown() {

    this._timeRemain--
    if (this._timeRemain <= 0) {
      this.closePanotour()
      this.closeHexagonPanotour()
      this.closeDetails()
      this.stopCountdown()
    }
  }
  stopCountdown() {
    if (this._timer) {
      clearInterval(this._timer)
      this._timer = null
    }
  }
}
