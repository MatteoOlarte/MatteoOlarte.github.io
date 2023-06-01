let params = new URLSearchParams(window.location.search)
let product_type = params.get('product_type')
let product_id = params.get('product_id')

if (product_id == undefined || product_id == null) {
  location.href = '/index.html'
}
else {
  fetch('/data.json')
    .then((response) => response.json())
    .then((data) => {
      let producto = data.filter((element) => element.id == product_id)[0]
      let precioFormato = producto.precio.toLocaleString(undefined, {
        style: 'currency',
        currency: 'COP'
      })

      document.getElementById('product_name').innerText = producto.nombre
      document.getElementById('product_info').innerText = producto.info
      document.getElementById('product_price').innerText = precioFormato
      document.getElementById('image_view').setAttribute('src', producto.imagen)
      document.getElementById('product_stock').innerText = `¡${producto.existencias} Disponibles!`
      document.title = producto.nombre

      document.getElementById('btn_pay').onclick = () => {
        let params = new URLSearchParams()
        params.append('type', 'simple_product')
        params.append('product_id', producto.id)
        location.href = '/html/PaginaPagar/pagar_producto.html?' + params.toString()
      }
    })
}