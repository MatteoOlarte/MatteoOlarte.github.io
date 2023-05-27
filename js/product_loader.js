const container = document.getElementById("contenedor_productos");
let products = ''


function CreateProductView(image_url = '', name = '', price = 0) {
  let product_price = (Math.random() * 10) * 10000
  let product
  
  product_price = product_price.toLocaleString(undefined, {
    style: 'currency',
    currency: 'COP'
  })
  product = `
      <div class="producto">
        <div class="producto_imagen"></div>
        <div class="producto_info">
          <h1>Nombre</h1>
          <p>$${product_price}</p>
          <a href="/html/visualizar_producto.html"><button>Ver Producto</button></a>
        </div>
      </div>
  `
  return product
}


for (let i = 0; i < 100; i++) {
  products += CreateProductView()
}
container.innerHTML = products