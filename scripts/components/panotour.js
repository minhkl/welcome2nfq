import $ from 'jquery'
import PopupBase from './popupBase.js'

const HTML = `
  <div class='panotour-popup fullscreen'>
    <iframe class='popup-content fullscreen' frameborder='0'></iframe>
    <div class='back-button'></div>
  </div>
`

export default class Panotour extends PopupBase {
  constructor() {
    super()

    this._view = $(HTML)
    // this._view.find('.back-button').on('touchend', this.hide.bind(this))

    this._iframe = this._view.find('.popup-content')

    this._backButton = this._view.find('.back-button')
    this._backButton.on('click', this.hide.bind(this))

    this.setupIframeEvent()
  }
  handleIframeTouchStart() {
    super.handleIframeTouchStart()
    this._backButton.fadeOut(100)
  }
  handleIframeTouchEnd() {
    super.handleIframeTouchEnd()
    this._backButton.fadeIn(100)
  }
}
