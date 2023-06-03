import * as view from "/js/views.js"
const CONTENEDOR_P = document.getElementById("contenedor_productos")
const CONTENEDOR_F = document.getElementById("contenedor_filtros")
const filtroColor = document.getElementById("filtro_color")
const filtroPrecio = document.getElementById("filtro_precio")
const filtroNombre = document.getElementById("filtro_nombre")
const searchTool = document.getElementById("filtro_busqueda")

function update(pageTitle = "...", products) {
  document.title = pageTitle
  document.getElementById("tipo_ropa").innerText = pageTitle
  CONTENEDOR_P.textContent = null

  products = view.shuffleArray(products)
  products.forEach(p => {
    let id = p.id
    let nombre = p.nombre
    let precio = p.precio
    let imagen = p.imagen
    let tipo = p.tipo

    CONTENEDOR_P.appendChild(
      view.createProductView(id, nombre, imagen, precio, tipo)
    )
  })
}

function applyFilter(filter, type) {
  let pageTitle
  switch (type) {
    case "camisa":
      pageTitle = "Camisas y Camisetas"
      break
    case "deportiva":
      pageTitle = "Ropa Deportiva"
      break
    case "buzo":
      pageTitle = "Buzos y Suéteres"
      break
    case "search":
      pageTitle = "Buscar Producto"
      break
  }
  update(pageTitle, filter)
}

function start(type) {
  let pageTitle
  switch (type) {
    case "camisa":
      pageTitle = "Camisas y Camisetas"
      break
    case "deportiva":
      pageTitle = "Ropa Deportiva"
      break
    case "buzo":
      pageTitle = "Buzos y Suéteres"
      break
    case "search":
      pageTitle = "Buscar Producto"
      break
    default:
      location.href = "/index.html"
      break
  }

  if (type == "search") {
    searchTool.parentElement.setAttribute("style", "display: flex;")
    filtroColor.parentElement.setAttribute("style", "display: none;")
    filtroPrecio.parentElement.setAttribute("style", "display: none;")
    filtroNombre.parentElement.setAttribute("style", "display: none;")
    type = undefined
  }
  else {
    searchTool.parentElement.setAttribute("style", "display: none;")
  }
  getProductsArray(type).then((p) => update(pageTitle, p))
}

async function getProductsArray(type) {
  let data = await fetch("/data.json").then((response) => response.json())
  return type == undefined
    ? data.filter((element) => !(element.id.startsWith('hidden:')))
    : data.filter((element) => element.tipo == type)
}

async function getFilterOf(
  type,
  name = "all",
  price = "all",
  color = "none"
) {
  let products = await getProductsArray(type)
  let filter = products

  if (name != "") {
    filter = filter.filter((element) => {
      let productName = element.nombre.toLowerCase()
      let searchedName = name.toLowerCase()
      return productName.includes(searchedName)
    })
  }
  if (price != "") {
    filter = filter.filter((element) => element.precio <= price)
    
  }
  if (color != "none") {
    filter = filter.filter((element) => {
      let searchedColor = color.toLocaleLowerCase()
      return element.color.includes(searchedColor)
    })
  }

  return filter
}

let params = new URLSearchParams(window.location.search)
let tipoRopa = params.get("type_of")

start(tipoRopa)
filtroNombre.oninput = (event) => {
  let name = event.target.value
  let price = filtroPrecio.value
  let color = filtroColor.value

  getFilterOf(tipoRopa, name, price, color).then((filter) => applyFilter(filter, tipoRopa))
}

filtroPrecio.oninput = (event) => {
  let name = filtroNombre.value
  let price = event.target.value
  let color = filtroColor.value

  getFilterOf(tipoRopa, name, price, color).then((filter) => applyFilter(filter, tipoRopa))
}

filtroColor.oninput = (event) => {
  let name = filtroNombre.value
  let price = filtroPrecio.value
  let color = event.target.value

  getFilterOf(tipoRopa, name, price, color).then((filter) => applyFilter(filter, tipoRopa))
}

searchTool.oninput = (event) => {
  getProductsArray(undefined).then((productos) => {
    let entrada = event.target.value.toLowerCase()
    let filtro

    if (entrada.includes("buzo")) {
      filtro = productos.filter((el) => el.tipo == "buzo")
    } else if (entrada.includes("deport")) {
      filtro = productos.filter((el) => el.tipo == "deportiva")
    } else if (entrada.includes("camis")) {
      filtro = productos.filter((el) => el.tipo == "camisa")
    } else {
      filtro = productos.filter((el) => {
        let id = el.id.toLowerCase()
        let nombre = el.nombre.toLowerCase()
        let info = el.info.toLowerCase()

        return (
          info.includes(entrada) ||
          nombre.includes(entrada) ||
          id.includes(entrada)
        )
      })
    }
    applyFilter(filtro, tipoRopa)
  })
}
