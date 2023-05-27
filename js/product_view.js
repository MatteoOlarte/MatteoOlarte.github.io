let product_type = sessionStorage.getItem('product_type')
let product_id = sessionStorage.getItem('product_id')

window.alert(product_id)
fetch('/data.json')
  .then((response) => response.json())
  .then((data) => {
    let camisas = data.camisas
    let camisa = camisas.filter((value) => {
      return product_id == value.id
    })[0]
    let precioFormato = camisa.precio.toLocaleString(undefined, {
      style: 'currency',
      currency: 'COP'
    })
    document.getElementById('product_name').innerText = camisa.nombre
    document.getElementById('product_id').innerText = camisa.id
    document.getElementById('product_info').innerText = camisa.info
    document.getElementById('product_price').innerText = precioFormato
    document.getElementById('image_view').setAttribute('src', camisa.imagen)
    sessionStorage.clear()
  })