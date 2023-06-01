let urlsCamisas = document.getElementsByClassName('btn_camisas')
let urlsDeportiva = document.getElementsByClassName('btn_deportiva')
let urlsBuzos = document.getElementsByClassName('btn_buzos')
let searchTool = document.getElementsByClassName('btn_search')

function appendString(type) {
  let params = new URLSearchParams()
  params.append('type_of', type)
  location.href = '/html/PaginaProductos/pagina_productos.html?' + params.toString()
}

for (url of urlsCamisas) {
  url.onclick = function() {
    appendString('camisa')
  }
}

for (url of urlsDeportiva) {
  url.onclick = function() {
    appendString('deportiva')
  }
}

for (url of urlsBuzos) {
  url.onclick = function() {
    appendString('buzo')
  }
}

for (url of searchTool) {
  url.onclick = function() {
    appendString('search')
  }
}


