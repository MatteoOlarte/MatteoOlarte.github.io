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
  let total = 0
  let cantidad = 0
  CONTENEDOR_P.textContent = null

  for (let id of productosGuardados) {
    for (let producto of catalogo) {
      if (id == producto.id) {
        carritoDeCompras.unshift(producto)
        total+=producto.precio
        cantidad++
      }
    }
  }
  total = total.toLocaleString(undefined, {
    style: "currency",
    currency: "COP",
  })

  labelLength.innerText = cantidad
  labelTotal.innerText = total
  for (let p of carritoDeCompras) {
    let id = p.id
    let nombre = p.nombre
    let precio = p.precio
    let imagen = p.imagen
    let tipo = p.tipo

    CONTENEDOR_P.appendChild(
      view.createCartProductView(id, nombre, imagen, precio, tipo)
    )
  }

  buttonPay.onclick = () => {
    let params = new URLSearchParams()
    params.append('type', 'cart')
    location.href = '/html/PaginaPagar/pagar_producto.html?' + params.toString()
  }     
}

if (productosGuardados != null) {
  fetch("/data.json")
    .then((response) => {
      return response.json()
    })
    .then((catalogo) => {
      update(catalogo);
      buttonClean.onclick = () => {
        localStorage.clear()
        productosGuardados = []
        update(catalogo);
      } 
    })
}
else {
  window.alert("Agregar un producto desde la sección de compras, antes de usar el carrito")
  location.href = "/index.html"
}