import $ from 'jquery'

export default class PopupBase {
  constructor() {
    this._view = null
    this._iframe = null
    this.onClickIframeCallback = null
    this._isShowing = false
  }
  setupIframeEvent() {
    this._iframe.on('load',(e) => this.bindEvents($(e.target.contentDocument)))
  }
  bindEvents(contentDocument) {
    contentDocument.on('touchstart', this.handleIframeTouchStart.bind(this))
    contentDocument.on('touchmove', this.handleIframeTouchMove.bind(this))
    contentDocument.on('touchend', this.handleIframeTouchEnd.bind(this))
  }
  unbindEvents(contentDocument) {
    contentDocument.off('touchstart')
    contentDocument.off('touchmove')
    contentDocument.off('touchend')
  }
  handleIframeTouchStart() {
    if (this.onClickIframeCallback) {
      this.onClickIframeCallback()
    }
  }
  handleIframeTouchMove() {

  }
  handleIframeTouchEnd() {

  }

  setIframSrc(src) {
    this._iframe.attr('src', src)
  }
  setIframeContent(html) {
    if (html == null) {
      $(this._iframe).removeAttr('srcdoc')
    } else {
    this._iframe[0].srcdoc = html
    }


    // const document = this._iframe[0].contentWindow.document
    // document.open()
    // document.write(html)
    // document.close()
  }
  show() {
    if (this._isShowing) {
      return;
    }
    this._isShowing = true
    this._view.detach()
    $("body").append(this._view)
    this._view.fadeIn()
  }

  hide() {
    if (this._isShowing == false) {
      return
    }
    this._isShowing = false
    this._view.fadeOut(function() {
      this._view.detach()
      this.cleanUp()
    }.bind(this))
  }
  cleanUp() {
    this.unbindEvents($(this._iframe[0].contentDocument))
    this.setIframSrc('')
    this.setIframeContent(null)
  }
}
