const CONTENEDOR = document.getElementById("contenedor")
let productosGuardados = JSON.parse(localStorage.getItem("id_productos"))

if (productosGuardados != null) {
  fetch("/data.json")
    .then((response) => response.json())
    .then((data) => {
      let catalogo = []
      let carroDeCompras = []

      catalogo.push(...data.camisas)
      catalogo.push(...data.deportiva)
      catalogo.push(...data.buzos)

      for (id of productosGuardados) {
        for (producto of catalogo) {
          if (producto.id == id) {
            carroDeCompras.push(producto)
          }
        }
      }

      console.log(carroDeCompras)
      CONTENEDOR.innerHTML = ""
      for (producto of carroDeCompras) {
        let precioFormato = producto.precio.toLocaleString(undefined, {
          style: "currency",
          currency: "COP",
        })
        CONTENEDOR.innerHTML += `
          <div class="element">
            <h3>${producto.nombre}</h3>
            <span class="border"><h3>${precioFormato}</h3></span>
          </div>
        `
      }

    })
} else {
  window.alert("Agregar productos primero")
  location.href = "/index.html"
}
