export function createProductView(
  id = "",
  nombre = "Producto",
  imagen = "/img/unknown_image.png",
  precio = 999.99,
  tipo = "object"
) {
  let precioFormato = precio.toLocaleString(undefined, {
    style: "currency",
    currency: "COP",
  })
  let producto = document.createElement("div")
  let productoImagen = document.createElement("div")
  let productoInfo = document.createElement("div")
  let infoNombre = document.createElement("h1")
  let infoPrecio = document.createElement("p")
  let infoButton = document.createElement("button")
  let carroDeCompras = document.createElement("a")
  let carroDeComprasIcon = document.createElement("i")

  producto.className = "producto"
  productoImagen.className = "producto_imagen"
  productoInfo.className = "producto_info"
  productoImagen.setAttribute("style", `background-image: url(${imagen});`)
  infoNombre.innerText = nombre
  infoPrecio.innerText = precioFormato
  infoButton.innerText = "Ver Producto"
  infoButton.onclick = function () {
    sessionStorage.setItem("product_type", tipo)
    sessionStorage.setItem("product_id", id)
    location.href = "visualizar_producto.html"
  }
  carroDeCompras.className = "icon"
  carroDeComprasIcon.className = "fa-sharp fa-solid fa-cart-plus"
  carroDeCompras.setAttribute('href', '/html/shopping_cart.html')
  carroDeCompras.onclick = function() {
    let productosGuardados = []

    if (localStorage.getItem('id_productos') != null) {
      productosGuardados = JSON.parse(localStorage.getItem('id_productos'))
    } 
    productosGuardados.push(id)
    localStorage.setItem('id_productos', JSON.stringify(productosGuardados))
  }

  carroDeCompras.appendChild(carroDeComprasIcon)
  productoInfo.appendChild(infoNombre)
  productoInfo.appendChild(infoPrecio)
  productoInfo.appendChild(infoButton)
  producto.appendChild(productoImagen)
  producto.appendChild(productoInfo)
  producto.appendChild(carroDeCompras)
  return producto
}

export function shuffleArray(array) {
  const arrayLength = array.length
  let currentIndex = array.length

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * arrayLength)
    let temp

    currentIndex--
    temp = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temp
  }
  return array
}
