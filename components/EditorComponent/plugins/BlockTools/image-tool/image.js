export default class Image {
  constructor({data, api, config, readOnly, block}){
    this.data = data
    this.warpper = undefined
  }

  /**
   * Creates a tool box icon with text for the block.
   */
  static get toolbox() {
    return {
      title: 'Image',
      icon: '<i class="fa fa-images" style="font-size: 15px;"></i>'
    };
  }

  /**
   * Make this block as read only supported
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Configurations for paste event.
   */
  static get pasteConfig() {
    return {
      tags: ['IMG'],
      files: {
        mimeTypes: ['image/*'],
        extensions: ['gif', 'jpg', 'png', 'jpeg']
      },
      patterns: {
        image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i
      }
    }
  }

  /**
   * Handles the editor paste event.
   * @param {Object} event
   */
  onPaste(event){
    switch (event.type){
      case 'tag':
        const imgTag = event.detail.data
        this._createImage(imgTag.src)
        break
      case 'file':
        /* We need to read file here as base64 string */
        const file = event.detail.file
        const reader = new FileReader()
        reader.onload = (loadEvent) => this._createImage(loadEvent.target.result)
        reader.readAsDataURL(file)
        break
      case 'pattern':
        const src = event.detail.data
        this._createImage(src)
        break
    }
  }

  /**
   * Creates the wrapper element for image.
   * @returns {Element}
   */
  render(){
    if (this.data && this.data.url) {
      const html = `<div></div>`
      this.warpper = this._generateDomElementFromHtmlString(html);
      this._createImage(this.data.url)
    }
    else {
      const html = `
      <div
        style="margin: 8px 0px;cursor:pointer;border-radius: 8px;min-height: 250px;border: 2px dashed #b7b7b7;display: flex;justify-content: center;align-items: center;color: #818181;"
      >
        Select Image
        <input
          type="file"
          style="display: none;"
          accept="image/png, image/gif, image/jpeg, image/jpg"
        />
      </div>
      `
      this.warpper = this._generateDomElementFromHtmlString(html);
      this.warpper.addEventListener('click', (event) => {
        this.warpper.querySelector(`input[type="file"]`).click()
      })
      this.warpper.querySelector(`input[type="file"]`).addEventListener('change', (event) => {
        // Image upload API
        this._getBase64Data(event.target.files[0])
      })
    }
    return this.warpper;
  }

  /**
   * Handles save fumctionality.
   * @param {Element} blockContent
   * @returns {Object}
   */
  save(blockContent){
    return {
      url: blockContent.querySelector('img') ? blockContent.querySelector('img').src : ''
    }
  }

  /**
   *
   * @param {Object} savedData
   * @returns {Boolean}
   */
  validate(savedData){
    return !savedData.url.trim() ? false : true
  }

  /**
   * Creates an image element and append it to the editor block.
   * @param {string} url
   */
  _createImage(url) {
    const image = document.createElement('img')
    const imageWrapper = document.createElement('div')
    image.style.width="100%"
    image.src = url
    imageWrapper.classList.add('editor-image-wrapper')
    imageWrapper.style="width: 100%;"
    this.warpper.innerHTML = ''
    this.warpper.style = 'margin: 8px 0px; display: flex;'
    imageWrapper.appendChild(image)
    this.warpper.appendChild(imageWrapper)
  }

  /**
   * Generates dom element form the given HTML string.
   * @param {string} html
   * @returns {Element}
   */
  _generateDomElementFromHtmlString(html) {
    return new DOMParser().parseFromString(html, "text/html").body.firstElementChild
  }

  async _getBase64Data(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this._createImage(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}
