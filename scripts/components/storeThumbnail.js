import $ from 'jquery'

const HTML =
`
  <div class='store-thumbnail'>
    <div class='store-thumbnail-image-wrapper'>
      <img class='store-thumbnail-image'/>
    </div>
    <div class='thumbnail-caption'>
    </div>
  </div>


`
export default class StoreThumbnail {
  constructor(parent, storeInfo) {
    // properties
    this._view = null
    this._onClickCallback = null

    const view = $(HTML)
    view.find('.store-thumbnail-image').attr('src', storeInfo.image)
    view.find('.thumbnail-caption').text(storeInfo.title)
    view.on('click', this._handleClick.bind(this, storeInfo))
    parent.append(view)
    this._view = view
  }

  setOnClickCallback(callback) {
    this._onClickCallback = callback
  }

  _handleClick(storeInfo) {
    if (this._onClickCallback) {
      this._onClickCallback(storeInfo)
    }
  }
}
