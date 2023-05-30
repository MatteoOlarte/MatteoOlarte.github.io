const CONTENEDOR = document.getElementById("contenedor")
const limpiar = document.getElementById("clean_button")
let productosGuardados = JSON.parse(localStorage.getItem("id_productos"))

limpiar.onclick = function() {
  localStorage.clear()
  location.href = '/html/shopping_cart.html'
}

if (productosGuardados != null) {
  fetch("/data.json")
    .then((response) => response.json())
    .then((data) => {
      let catalogo = []
      let carroDeCompras = []
      let total = 0

      catalogo.push(...data.camisas)
      catalogo.push(...data.deportiva)
      catalogo.push(...data.buzos)

      for (id of productosGuardados) {
        for (producto of catalogo) {
          if (producto.id == id) {
            carroDeCompras.unshift(producto)
            total+=producto.precio
          }
        }
      }
      total = total.toLocaleString(undefined, {
        style: "currency",
        currency: "COP",
      })

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
      document.getElementById('label_total_price').innerText = `Total: ${total}`

    })
} else {
  window.alert("Agregar productos primero")
  location.href = "/index.html"
}
