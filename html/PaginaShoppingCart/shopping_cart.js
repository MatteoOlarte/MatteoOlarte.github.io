import * as view from "/js/views.js"

const CONTENEDOR_P = document.getElementById("contenedor_productos")
const CONTENEDOR_F = document.getElementById("contenedor_filtros")
let productosGuardados = JSON.parse(localStorage.getItem("id_productos"))
let labelLength = document.getElementById("label_length")
let labelTotal = document.getElementById("label_total")
let buttonPay = document.getElementById("btn_pay")
let buttonClean = document.getElementById("btn_clean")

function update(catalogo) {
  let carritoDeCompras = []
  let precioTotal
  let cantidad
  CONTENEDOR_P.textContent = null

  for (let id of productosGuardados) {
    for (let producto of catalogo) {
      if (id == producto.id) carritoDeCompras.unshift(producto)
    }
  }
  cantidad = carritoDeCompras.length
  precioTotal = carritoDeCompras
    .map((value) => value.precio)
    .reduce((total, value) => total + value)

  precioTotal = precioTotal.toLocaleString(undefined, {
    style: "currency",
    currency: "COP",
  })

  labelLength.innerText = cantidad
  labelTotal.innerText = precioTotal

  for (let p of carritoDeCompras) {
    let id = p.id
    let nombre = p.nombre
    let precio = p.precio
    let imagen = p.imagen
    let tipo = p.tipo

    CONTENEDOR_P.appendChild(
      view.createCartProductView(id, nombre, imagen, precio, tipo, () => {
        let index = productosGuardados.indexOf(p.id)
        productosGuardados.splice(index, 1)
        localStorage.setItem("id_productos", JSON.stringify(productosGuardados))
        update(catalogo)
      })
    )
  }
  buttonPay.onclick = () => {
    let params = new URLSearchParams()
    params.append("type", "cart")
    location.href = "/html/PaginaPagar/pagar_producto.html?" + params.toString()
  }
}

if (productosGuardados != null) {
  fetch("/data.json")
    .then((response) => {
      return response.json()
    })
    .then((catalogo) => {
      update(catalogo)
      buttonClean.onclick = () => {
        localStorage.clear()
        productosGuardados = []
        update(catalogo)
      }
    })
} else {
  window.alert(
    "Agregar un producto desde la sección de compras, antes de usar el carrito"
  )
  location.href = "/index.html"
}
