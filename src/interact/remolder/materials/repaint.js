window.repaint = module.exports = function () {
  var svg1 = document.getElementById('regular')
  var svg2 = document.getElementById('spe')

  setTimeout(function () {
    if (svg1) svg1.style.display = 'none'
    if (svg2) svg2.style.display = 'none'
    setTimeout(function () {
      if (svg1) svg1.style.display = null
      if (svg2) svg2.style.display = null
    }, 20)
  }, 20)
}
