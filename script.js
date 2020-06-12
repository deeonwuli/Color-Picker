function my (event) {
  // to upload selected image in canvas element
  let input = event.target
  let reader = new FileReader()
  let isDragging = false
  reader.onload = function () {
    let dataURL = reader.result
    let output = document.getElementById('output')
    output.src = dataURL
    let c = document.getElementById('theCanvas')
    let context = c.getContext('2d')
    let img = new Image()
    img.src = output.src

    let startLink = document.getElementById('startLink')
    let startLink1 = document.getElementById('startLink1')
    let processLink = document.getElementById('processLink')
    let finish = document.getElementById('finish')
    startLink.addEventListener('click', event => {
      context.clearRect(0, 0, c.width, c.height)
      if (start.style.display === 'none') {
        start.style.display = 'flex'
        process.style.display = 'none'
        finish.style.display = 'none'
      }
    })
    startLink1.addEventListener('click', event => {
      context.clearRect(0, 0, c.width, c.height)
      if (start.style.display === 'none') {
        start.style.display = 'flex'
        process.style.display = 'none'
        finish.style.display = 'none'
      }
    })
    processLink.addEventListener('click', event => {
      if (process.style.display === 'none') {
        process.style.display = 'flex'
        start.style.display = 'none'
        finish.style.display = 'none'
      }
    })

    img.onload = () => {
      c.width = img.width
      c.height = img.height
      context.drawImage(img, 0, 0, c.width, c.height)

      // to get position of mouse/tap and draw a circle on tap
      let counter = 0
      let imageData = context.getImageData(0, 0, img.width, img.height)

      // mouse events
      c.addEventListener('click', event => {
        event.preventDefault()
        event.stopPropagation()
        counter += 1
        let bound = c.getBoundingClientRect()
        let scaleX = c.width / bound.width
        let scaleY = c.height / bound.height
        let x = (event.clientX - bound.left) * scaleX
        let y = (event.clientY - bound.top) * scaleY
        let picColour = context.getImageData(x, y, 1, 1).data
        let colour = '#' + ('000000' + rgbToHex(picColour[0], picColour[1], picColour[2])).slice(-6)
        if (counter % 2 !== 0) {
          context.putImageData(imageData, 0, 0)
          context.beginPath()
          context.arc(x, y, 350, 0, 2 * Math.PI)
          context.lineWidth = 100
          context.strokeStyle = colour
          context.stroke()
          context.closePath()
          context.beginPath()
          context.arc(x, y, 50, 0, 2 * Math.PI)
          context.lineWidth = 100
          context.fillStyle = colour
          context.fill()
        } else if (counter % 2 === 0) {
          context.putImageData(imageData, 0, 0)
          context.beginPath()
          context.arc(x, y, 350, 0, 2 * Math.PI)
          context.lineWidth = 100
          context.strokeStyle = colour
          context.stroke()
          context.closePath()
          context.beginPath()
          context.arc(x, y, 50, 0, 2 * Math.PI)
          context.lineWidth = 100
          context.fillStyle = colour
          context.fill()
        }
        let n_match = ntc.name(colour)
        let n_rgb = n_match[0] // This is the RGB value of the closest matching color
        let n_name = n_match[1] // This is the text string for the name of the match
        let n_exactmatch = n_match[2] // True if exact color match, False if close-match
        let name = document.getElementById('colourName').innerHTML = n_name
        let box = document.getElementById('colourBox').style.backgroundColor = n_rgb
        let hex = document.getElementById('colourHex').innerHTML = 'Hex value: ' + colour
        document.getElementById('continue').style.display = 'inline'
        let str = colour.toString()
        let res = str.slice(1)
        let resi = '0X'.concat(res)
        let rgb = document.getElementById('colourRGB').innerHTML = 'RGB value: ' + hexToRGB(resi)
        let family = document.getElementById('colourFamily').innerHTML = 'Color family: ' + colourFamily(resi)
      })

      c.addEventListener('mousemove', event => {
        event.preventDefault()
        event.stopPropagation()
        if (isDragging === true) {
          counter += 1
          let bound = c.getBoundingClientRect()
          let scaleX = c.width / bound.width
          let scaleY = c.height / bound.height
          let x = (event.clientX - bound.left) * scaleX
          let y = (event.clientY - bound.top) * scaleY
          let picColour = context.getImageData(x, y, 1, 1).data
          let colour = '#' + ('000000' + rgbToHex(picColour[0], picColour[1], picColour[2])).slice(-6)
          if (counter % 2 !== 0) {
            context.putImageData(imageData, 0, 0)
            context.beginPath()
            context.arc(x, y, 350, 0, 2 * Math.PI)
            context.lineWidth = 100
            context.strokeStyle = colour
            context.stroke()
            context.closePath()
            context.beginPath()
            context.arc(x, y, 50, 0, 2 * Math.PI)
            context.lineWidth = 100
            context.fillStyle = colour
            context.fill()
          } else if (counter % 2 === 0) {
            context.putImageData(imageData, 0, 0)
            context.beginPath()
            context.arc(x, y, 350, 0, 2 * Math.PI)
            context.lineWidth = 100
            context.strokeStyle = colour
            context.stroke()
            context.closePath()
            context.beginPath()
            context.arc(x, y, 50, 0, 2 * Math.PI)
            context.lineWidth = 100
            context.fillStyle = colour
            context.fill()
          }
          let n_match = ntc.name(colour)
          let n_rgb = n_match[0] // This is the RGB value of the closest matching color
          let n_name = n_match[1] // This is the text string for the name of the match
          let n_exactmatch = n_match[2] // True if exact color match, False if close-match
          let name = document.getElementById('colourName').innerHTML = n_name
          let box = document.getElementById('colourBox').style.backgroundColor = n_rgb
          let hex = document.getElementById('colourHex').innerHTML = 'Hex value: ' + colour
          document.getElementById('continue').style.display = 'inline'
          let str = colour.toString()
          let res = str.slice(1)
          let resi = '0X'.concat(res)
          let rgb = document.getElementById('colourRGB').innerHTML = 'RGB value: ' + hexToRGB(resi)
          let family = document.getElementById('colourFamily').innerHTML = 'Color family: ' + colourFamily(resi)
        }
      })

      c.addEventListener('mousedown', event => {
        isDragging = true
      })

      c.addEventListener('mouseup', event => {
        isDragging = false
      })

      // touch events
      c.addEventListener('touchmove', event => {
        event.preventDefault()
        event.stopPropagation()
        if (isDragging === true) {
          counter += 1
          let bound = c.getBoundingClientRect()
          let scaleX = c.width / bound.width
          let scaleY = c.height / bound.height
          let touchObject = event.changedTouches[0]
          let x = (touchObject.clientX - bound.left) * scaleX
          let y = (touchObject.clientY - bound.top) * scaleY
          let picColour = context.getImageData(x, y, 1, 1).data
          let colour = '#' + ('000000' + rgbToHex(picColour[0], picColour[1], picColour[2])).slice(-6)
          if (counter % 2 !== 0) {
            context.putImageData(imageData, 0, 0)
            context.beginPath()
            context.arc(x, y, 350, 0, 2 * Math.PI)
            context.lineWidth = 100
            context.strokeStyle = colour
            context.stroke()
            context.closePath()
            context.beginPath()
            context.arc(x, y, 50, 0, 2 * Math.PI)
            context.lineWidth = 100
            context.fillStyle = colour
            context.fill()
          } else if (counter % 2 === 0) {
            context.putImageData(imageData, 0, 0)
            context.beginPath()
            context.arc(x, y, 350, 0, 2 * Math.PI)
            context.lineWidth = 100
            context.strokeStyle = colour
            context.stroke()
            context.closePath()
            context.beginPath()
            context.arc(x, y, 50, 0, 2 * Math.PI)
            context.lineWidth = 100
            context.fillStyle = colour
            context.fill()
          }
          let n_match = ntc.name(colour)
          let n_rgb = n_match[0] // This is the RGB value of the closest matching color
          let n_name = n_match[1] // This is the text string for the name of the match
          let n_exactmatch = n_match[2] // True if exact color match, False if close-match
          let name = document.getElementById('colourName').innerHTML = n_name
          let box = document.getElementById('colourBox').style.backgroundColor = n_rgb
          let hex = document.getElementById('colourHex').innerHTML = 'Hex value: ' + colour
          document.getElementById('continue').style.display = 'inline'
          let str = colour.toString()
          let res = str.slice(1)
          let resi = '0X'.concat(res)
          let rgb = document.getElementById('colourRGB').innerHTML = 'RGB value: ' + hexToRGB(resi)
          let family = document.getElementById('colourFamily').innerHTML = 'Color family: ' + colourFamily(resi)
        }
      })

      c.addEventListener('touchstart', event => {
        isDragging = true
      })

      c.addEventListener('touchend', event => {
        isDragging = false
      })
    }
  }
  reader.readAsDataURL(input.files[0])

  // to switch tabs
  var start = document.getElementById('start')
  var process = document.getElementById('process')
  if (start.style.display === 'none') {
    start.style.display = 'flex'
    process.style.display = 'none'
  } else {
    process.style.display = 'flex'
    start.style.display = 'none'
  }
}

function rgbToHex (r, g, b) {
  if (r > 255 || g > 255 || b > 255) { throw 'Invalid color component' }
  return ((r << 16) | (g << 8) | b).toString(16)
}

function visibility () {
  var process = document.getElementById('process')
  var finish = document.getElementById('finish')
  if (process.style.display === 'none') {
    process.style.display = 'flex'
    finish.style.display = 'none'
  } else {
    finish.style.display = 'flex'
    process.style.display = 'none'
  }
}

function hexToRGB (hexColor) {
  let red = (hexColor >> 16) & 0xFF
  let green = (hexColor >> 8) & 0xFF
  let blue = hexColor & 0xFF
  return ('RGB ( ' + red + ', ' + green + ', ' + blue + ' )')
}

function colourFamily (hexColor) {
  let red = (hexColor >> 16) & 0xFF
  let green = (hexColor >> 8) & 0xFF
  let blue = hexColor & 0xFF
  if (red <= 40 && blue <= 40 && green <= 40) {
    return 'Black'
  } else if (red > 225 && blue > 225 && green > 225) {
    return 'White'
  } else if ((Math.abs(red - green) < 10) && (Math.abs(red - blue) < 10) && (Math.abs(green - blue) < 10) && (red > 40 < 225) && (green > 40 < 225) && (blue > 40 < 225)) {
    return 'Grey'
  } else if (red >= green && red > blue) {
    if (red / blue > 1.5 && green / blue > 1.5) {
      if (red / blue > 3 && red / green > 2) {
        return 'Orange'
      }
      return 'Yellow'
    } else if (red / green > 1.5 && blue / green > 1.5) {
      return 'Purple'
    }
    return 'Red'
  } else if (green >= red && green > blue) {
    if (red / blue > 1.5 && green / blue > 1.5) {
      if (red / blue > 3) {
        return 'Orange'
      }
      return 'Yellow'
    } else if (green / red > 1.5 && blue / red > 1.5) {
      return 'Cyan'
    }
    return 'Green'
  } else if (blue >= red && blue > green) {
    if (red / green > 1.5 && blue / green > 1.5) {
      return 'Purple'
    } else if (green / red > 1.5 && blue / red > 1.5) {
      return 'Cyan'
    }
    return 'Blue'
  }
}
