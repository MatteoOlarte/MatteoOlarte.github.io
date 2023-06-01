function verifyCardNumber(cardNumber = "1234567890123456") {
  let sumOddDigits = 0
  let sumEvenDigits = 0
  let card

  // Step 1: Remove any "-" or " "
  cardNumber = cardNumber.replaceAll("-", "").replaceAll(" ", "")
  card = cardNumber.split("")

  // Step 2: Add all digits in the odd places from right to left
  card.reverse()
  for (let i = 0; i < card.length; i += 2) {
    sumOddDigits += Number(card[i])
  }
  console.log(`odd = ${sumOddDigits}`)

  // Step 3:
  for (let i = 1; i < card.length; i += 2) {
    let x = Number(card[i]) * 2

    if (x > 9) {
      let a = 1
      let b = x % 10
      x = a + b
    }
    sumEvenDigits += x
  }

  return (sumOddDigits + sumEvenDigits) % 10 == 0
}

function comprado() {}

let payButton = document.getElementById("btn_pay")
let inputUserName = document.getElementById("input_user_name")
let inputUserAddress = document.getElementById("input_user_address")
let inputCardNumber = document.getElementById("input_user_card_number")
let params = new URLSearchParams(window.location.search)
let product_type = params.get("type")
let product_id = params.get("product_id")

if (product_type == "simple_product") {
  fetch("/data.json")
    .then((response) => response.json())
    .then((data) => {
      let producto = data.filter((element) => element.id == product_id)[0]
      let precioFormato = producto.precio.toLocaleString(undefined, {
        style: "currency",
        currency: "COP",
      })

      document.getElementById("product_name").innerText = producto.nombre
      document.getElementById("product_price").innerText = precioFormato
      document.getElementById("image_view").setAttribute("src", producto.imagen)
      document.title = producto.nombre
    })
} else if (product_type == "cart") {
  let cartIDs = JSON.parse(localStorage.getItem("id_productos"))
  let total = 0

  fetch("/data.json")
    .then((response) => {
      return response.json()
    })
    .then((catalogo) => {
      for (let id of cartIDs) {
        for (let product of catalogo) {
          if (id == product.id) {
            total += product.precio
          }
        }
      }
      total = total.toLocaleString(undefined, {
        style: "currency",
        currency: "COP",
      })
      document.getElementById("product_name").innerText = "Carrito de Compras"
      document.getElementById("product_price").innerText = total
      document.getElementById("image_view").setAttribute("src", "/img/shopping_cart.jpg")
      document.title = "Carrito de Compras"

    })
}

payButton.onclick = () => {
  if (inputCardNumber.value == "") {
    window.alert("llenar todos los datos")
  } else if (verifyCardNumber(inputCardNumber.value)) {
    window.alert("Comprado")
    comprado()
  } else {
    window.alert("Verificar datos de la tarjeta")
    return undefined
  }
}
