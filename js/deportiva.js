import { createProductView as crear, shuffleArray } from "./view_loaders.js"
const CONTENEDOR = document.getElementById("contenedor_productos")

fetch("/data.json")
  .then((response) => response.json())
  .then((data) => {
    let productos = shuffleArray(data.deportiva)
    CONTENEDOR.textContent = ""

    productos.forEach((producto) => {
      let id = producto.id
      let nombre = producto.nombre
      let precio = producto.precio
      let imagen = producto.imagen

      CONTENEDOR.appendChild(crear(id, nombre, imagen, precio, "deportiva"))
    })
  })
