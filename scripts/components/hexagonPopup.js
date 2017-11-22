import $ from 'jquery'
import PopupBase from './popupBase.js'

const HTML =
`
<div class='popup-container hexagon-popup-container' style='display: none'>
    <div class='overlay'>
    </div>
    <div class='popup hexagon-popup'>
      <div class='iframe-wrapper'>
        <iframe class='popup-content' frameborder='0'></iframe>
      </div>
      <img class='swipe-instruction' src='assets/images/static/Swipe.png'/>
      <div class='back-button'></div>
    </div>

</div>
`

export default class HexagonPopup extends PopupBase {
  constructor() {
    super()

    this._view = $(HTML)
    this._swipeIconTimer = null
    this._maxIdleTime = 10 * 1000 // 10 seconds
    this._backButton = this._view.find('.back-button')
    this._backButton.on('click', this.hide.bind(this))
    this._overlay = this._view.find('.overlay')
    this._iframe = this._view.find('.popup-content')
    this._swipeIcon = this._view.find('.swipe-instruction')
    this.setupIframeEvent()
  }
  setOverlayImage(imageSrc) {
    // this._overlay.css('background-image', `url(${imageSrc})`)
  }
  handleIframeTouchStart() {
    super.handleIframeTouchStart()
    this._view.find('.swipe-instruction').removeClass('fadeIn').addClass('fadeOut')
    this.resetCountdown()
  }
  cleanUp() {
    super.cleanUp()
    if (this._timer != null) {
      clearTimeout(this._timer)
      this._timer = null
    }
    this._swipeIcon.removeClass('fadeOut')
  }

  resetCountdown() {
    if (this._timer) {
      clearTimeout(this._timer)
    }
    this._timer = setTimeout(() => {
      this._swipeIcon.removeClass('fadeOut').addClass('fadeIn')
    }, this._maxIdleTime)
  }
}
