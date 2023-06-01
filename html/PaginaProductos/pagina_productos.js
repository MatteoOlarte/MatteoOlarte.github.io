import * as view from "/js/views.js"
const CONTENEDOR_P = document.getElementById("contenedor_productos")
const CONTENEDOR_F = document.getElementById("contenedor_filtros")

function update(productos, titulo) {
  document.title = titulo
  document.getElementById("tipo_ropa").innerText = titulo
  CONTENEDOR_P.textContent = null
  productos = view.shuffleArray(productos)

  productos.forEach(p => {
    let id = p.id
    let nombre = p.nombre
    let precio = p.precio
    let imagen = p.imagen
    let tipo = p.tipo

    CONTENEDOR_P.appendChild(
      view.createProductView(id, nombre, imagen, precio, tipo)
    )
  });
}

function applyFilter(tipoRopa, filtro) {
  switch (tipoRopa) {
    case "camisa":
      update(filtro, 'Camisas y Camisetas')
      break
    case "deportiva":
      update(filtro, 'Ropa Deportiva')
      break
    case "buzo":
      update(filtro, 'Buzos y Suéteres')
      break
    case "search":
      update(filtro, 'Buscar Producto')
      break
    default:
      location.href = "/index.html"
      break
  }
}

async function getProductsArray(tipo) {
  let data = await fetch("/data.json").then((response) => response.json())
  return (tipo == undefined) ? data : data.filter((element) => element.tipo == tipo)
}

let params = new URLSearchParams(window.location.search)
let tipoRopa = params.get("type_of")
let filtroColor = document.getElementById("filtro_color")
let filtroPrecio = document.getElementById("filtro_precio")
let filtroNombre = document.getElementById("filtro_nombre")
let searchTool = document.getElementById('filtro_busqueda') 

switch (tipoRopa) {
  case "camisa":
    searchTool.parentElement.setAttribute('style', "display: none;")
    getProductsArray('camisa').then((productos) => update(productos, 'Camisas y Camisetas'))
    break
  case "deportiva":
    searchTool.parentElement.setAttribute('style', "display: none;")
    getProductsArray('deportiva').then((productos) => update(productos, 'Ropa Deportiva'))
    break
  case "buzo":
    searchTool.parentElement.setAttribute('style', "display: none;")
    getProductsArray('buzo').then((productos) => update(productos, 'Buzos y Suéteres'))
    break
  case "search":
    searchTool.parentElement.setAttribute('style', "display: flex;")
    filtroColor.parentElement.setAttribute('style', "display: none;")
    filtroPrecio.parentElement.setAttribute('style', "display: none;")
    filtroNombre.parentElement.setAttribute('style', "display: none;")
    getProductsArray(undefined).then((productos) => update(productos, 'Buscar Producto'))
    break;
  default:
    location.href = "/index.html"
    break
}

filtroNombre.oninput  = (event) => {
  getProductsArray(undefined)
    .then((productos) => {
      let filtro = productos.filter((el) => el.tipo == tipoRopa).filter((el) => {
        let nombreBuscado = event.target.value.toLowerCase()
        let nombreProducto = el.nombre.toLowerCase()
        return nombreProducto.includes(nombreBuscado)
      })
      applyFilter(tipoRopa, filtro)
    })
}

filtroPrecio.oninput  = (event) => {
  getProductsArray(undefined)
    .then((productos) => {
      let precio = event.target.value
      let filtro = productos.filter((el) => el.tipo == tipoRopa).filter((el) => el.precio <= precio)
      applyFilter(tipoRopa, filtro)
    })
}

filtroColor.oninput = (event) => {
  getProductsArray(undefined)
    .then((productos) => {
      let color = event.target.value.toLowerCase()
      let filtro = productos.filter((el) => el.tipo == tipoRopa).filter((el) => el.color.includes(color))
      applyFilter(tipoRopa, filtro)
    })
}

searchTool.oninput = (event) => {
  getProductsArray(undefined)
    .then((productos) => {
      let entrada = event.target.value.toLowerCase()
      let filtro

      if (entrada.includes('buzo')) {
        filtro = productos.filter((el) => el.tipo == 'buzo')
      }
      else if (entrada.includes('deport')) {
        filtro = productos.filter((el) => el.tipo == 'deportiva')
      }
      else if (entrada.includes('camis')) {
        filtro = productos.filter((el) => el.tipo == 'camisa')
      }
      else {
        filtro = productos.filter((el) => {
          let id = el.id.toLowerCase()
          let nombre = el.nombre.toLowerCase()
          let info = el.info.toLowerCase()

          return (info.includes(entrada)) || (nombre.includes(entrada) || (id.includes(entrada)))
        })
      }
      applyFilter(tipoRopa, filtro)
    })
}