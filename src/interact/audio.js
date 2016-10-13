var partAudio = new Audio('part.wav')
var colorAudio = new Audio('color.wav')

exports.part = function () {
  partAudio.play()
}

exports.color = function () {
  colorAudio.play()
}
