let product_type = sessionStorage.getItem('product_type')
let product_id = sessionStorage.getItem('product_id')

fetch('/data.json')
  .then((response) => response.json())
  .then((data) => {
    let productos
    let producto

    switch (product_type) {
      case 'camisas':
        productos = data.camisas
        break;
      case 'deportiva':
        productos = data.deportiva
        break;
      case 'buzo':
        productos = data.buzos
        break;
    }

    producto = productos.filter((value) => {
      return product_id == value.id
    })[0]
    let precioFormato = producto.precio.toLocaleString(undefined, {
      style: 'currency',
      currency: 'COP'
    })

    document.getElementById('product_name').innerText = producto.nombre
    document.getElementById('product_id').innerText = producto.id
    document.getElementById('product_info').innerText = producto.info
    document.getElementById('product_price').innerText = precioFormato
    document.getElementById('image_view').setAttribute('src', producto.imagen)
    document.getElementById('product_stock').innerText = `¡${producto.existencias} Disponibles!`
    sessionStorage.clear()
  })