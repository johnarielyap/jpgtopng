const JPG_to_PNG_converter = (() => {
  function converter(imageFileBlob, options) {
    options = options || {}

    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    const imageElement = createImage()
    const downloadLink = document.createElement("a")

    function createImage(options) {
      options = options || {}
      const img = document.createElement("img")

      img.style.width = options.width ? `${options.width}px` : "auto"
      img.style.height = options.height ? `${options.height}px` : "auto"

      return img
    }

    function updateDownloadLink(jpgFileName, pngBlob) {
      const linkElement = downloadLink
      const pngFileName = jpgFileName.replace(/jpe?g/i, "png")

      linkElement.setAttribute("download", pngFileName)
      linkElement.href = URL.createObjectURL(pngBlob)

      downloadLink.click()
    }

    function process() {
      const imageUrl = URL.createObjectURL(imageFileBlob)

      imageElement.addEventListener("load", e => {
        canvas.width = e.target.width
        canvas.height = e.target.height
        context.drawImage(e.target, 0, 0, e.target.width, e.target.height)
        canvas.toBlob(
          updateDownloadLink.bind(window, imageFileBlob.name),
          "image/png"
        )
      })

      imageElement.src = imageUrl
    }

    return {
      process: process,
    }
  }

  return converter
})()

const imageFileElement = document.querySelector(".jpg-upload-input")

imageFileElement.addEventListener("change", event => {
  const jpgImageFileBlob = event.currentTarget.files[0]

  if (jpgImageFileBlob.type.match(/image\/jpe?g/i) !== null) {
    JPG_to_PNG_converter(jpgImageFileBlob).process()
  } else {
    alert(
      `INVALID FILE! USE VALID FILE ONLY TO CONVERT INTO ${jpgImageFileBlob.type}`
    )
  }
})
