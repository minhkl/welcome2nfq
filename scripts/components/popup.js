import $ from 'jquery'
import PopupBase from './popupBase.js'

const HTML =
`
<div class='popup-container rectangle-popup-container' style='display: none'>
    <div class='overlay'></div>
    <div class='popup rectangle-popup'>
        <iframe class='popup-content' frameborder='0'></iframe>
        <div class='close-button'></div>
    </div>
</div>
`

export default class Popup extends PopupBase {
  constructor() {
    super()

    this._view = $(HTML)
    this._view.find('.close-button').on('click', this.hide.bind(this))
    this._view.find('.close-button').on('touchstart', this.hide.bind(this))

    this._iframe = this._view.find('.popup-content')
    this.setupIframeEvent()
  }
}
