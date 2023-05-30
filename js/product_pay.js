function verifyCreditCard(value) {
  if (/[^0-9-\s]+/.test(value)) return false;

	// The Luhn Algorithm. It's so pretty.
	let nCheck = 0, bEven = false;
	value = value.replace(/\D/g, "");

	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);

		if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

		nCheck += nDigit;
		bEven = !bEven;
	}

	return (nCheck % 10) == 0;
}

let product_type = sessionStorage.getItem('product_type')
let product_id = sessionStorage.getItem('product_id')


if (product_id == undefined || product_id == null) {
  location.href = '/index.html'
}

else {
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
      document.getElementById('product_price').innerText = precioFormato
      document.getElementById('image_view').setAttribute('src', producto.imagen)
      document.title = producto.nombre
      document.getElementById('btn_pay').onclick = function() {
        let cardNumber = document.getElementById('input_card_number').innerText
        if (verifyCreditCard(cardNumber)) {
          window.alert("Comprado")
          location.href = '/index.html'
        }
        else {
          window.alert("Ingresar un numero de tarjeta valido")
        }
      }
      sessionStorage.clear()

    })
}