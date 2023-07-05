export default class Image {
  static get toolbox() {
    return {
      title: 'Image',
      icon: '<i class="fa fa-images" style="font-size: 15px;"></i>'
    };
  }

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

  static get isReadOnlySupported() {
    return true;
  }

  constructor({data, api, config, readOnly, block}){
    this.data = data
    this.warpper = undefined
  }

  render(){
    if (this.data && this.data.url) {
      const html = `<div></div>`
      this.warpper = new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
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
      this.warpper = new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
      this.warpper.addEventListener('click', (event) => {
        this.warpper.querySelector(`input[type="file"]`).click()
      })
      this.warpper.querySelector(`input[type="file"]`).addEventListener('change', (event) => {
        this._getBase64Data(event.target.files[0])
      })
    }
    return this.warpper;
  }

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
        reader.onload = (loadEvent) => {
          this._createImage(loadEvent.target.result)
        }
        reader.readAsDataURL(file)
        break
      case 'pattern':
        const src = event.detail.data
        this._createImage(src)
        break
    }
  }

  save(blockContent){
    return {
      url: blockContent.querySelector('img') ? blockContent.querySelector('img').src : ''
    }
  }

  validate(savedData){
    if (!savedData.url.trim()){
      return false;
    }

    return true;
  }

  _createImage(url) {
    const image = document.createElement('img')
    image.style.width="100%"
    image.src = url
    this.warpper.innerHTML = ''
    this.warpper.style = 'margin: 8px 0px;'
    this.warpper.appendChild(image)
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
