const container = document.getElementById("contenedor_productos");

function CreateProductView(id = '', nombre = 'Producto', imagen = ' ', precio = 999.99) {
  let precioFormato = precio.toLocaleString(undefined, {
    style: 'currency',
    currency: 'COP'
  })
  let producto = document.createElement('div')
  let productoImagen = document.createElement('div')
  let productoInfo = document.createElement('div')
  let infoNombre = document.createElement('h1')
  let infoPrecio = document.createElement('p')
  let infoButton = document.createElement('button')

  producto.className = 'producto'
  productoImagen.className = 'producto_imagen'
  productoInfo.className = 'producto_info'
  productoImagen.setAttribute('style', `background-image: url(${imagen});`)
  infoNombre.innerText = nombre
  infoPrecio.innerText = precioFormato
  infoButton.innerText = 'Ver Producto'
  infoButton.onclick = function () {
    sessionStorage.setItem('product_type', 'deportiva')
    sessionStorage.setItem('product_id', id)
    location.href = 'visualizar_producto.html'
  }

  productoInfo.appendChild(infoNombre)
  productoInfo.appendChild(infoPrecio)
  productoInfo.appendChild(infoButton)
  producto.appendChild(productoImagen)
  producto.appendChild(productoInfo)
  return producto
}

fetch('/data.json')
  .then((response) => response.json())
  .then((data) => {
    let sudaderas = data.deportiva

    container.textContent = '';
    for (sudadera of sudaderas) {
      let id = sudadera.id
      let nombre = sudadera.nombre
      let precio = sudadera.precio
      let imagen = sudadera.imagen

      container.appendChild(CreateProductView(id, nombre, imagen, precio))
    }
  })
