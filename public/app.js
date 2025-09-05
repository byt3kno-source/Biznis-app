// Pavyzdinis duomenų rinkinys
const products = {
  "Evaldas": [
    { id: 1, name: "Fizzy Cherry Ice & Blueberry Cotton Candy", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 2, name: "Mixed Berries & Double Apple Ice", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 3, name: "Blue Razz Lemonade & Watermelon Bubblegum", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 4, name: "Strawberry Watermelon Bubblegum & Mixed Fruit", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 5, name: "Sour Apple Raspberry & Strawberry Big Bang", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 6, name: "Peach Berry & Watermelon Mango Peach", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 7, name: "Strawberry Cherry & Kiwi Passion Fruit", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 8, name: "Gummy Bear & Strawberry Cola", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 9, name: "Triple Melon Ice & Raspberry Watermelon", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 }
  ],
  "Dovydas": [
    { id: 11, name: "Watermelon Ice & Lemon Lime", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 12, name: "Grape Ice & Strawberry Kiwi", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 13, name: "Strawberry Raspberry Cherry & Love 666", Kiekis: 20, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 14, name: "Cherry Cola Ice & Strawberry Raspberry Candy", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 15, name: "Blueberry Ice & Black Dragon Ice", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 16, name: "Strawberry Cherry & Kiwi Passion Fruit", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 17, name: "Banana Pineapple Ice & Red Bull Ice", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 18, name: "Red Bull Strawberry & Blackcurrant Ice", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 }
  ]
};

// Numatytoji vartotojo reikšmė
let currentUser = "Evaldas"; // Pavyzdžiui, numatytas vartotojas - Evaldas

// Kintamieji bendram pelnui
let totalProfitEvaldasVokelis = 0;
let totalProfitEvaldasBanke = 0;
let totalProfitDovydasVokelis = 0;
let totalProfitDovydasVokelisEvaldui = 0;

function loadProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = '';

  let userProducts = [...products["Evaldas"], ...products["Dovydas"]];
  totalProfitEvaldasVokelis = 0;
  totalProfitEvaldasBanke = 0;
  totalProfitDovydasVokelis = 0;
  totalProfitDovydasVokelisEvaldui = 0;

  userProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <h3>${product.name}</h3>
      <p>Kiekis: ${product.Kiekis}</p>
      <p>Parduota: ${product.Parduota}</p>
      <p>Vokelis: ${product.Vokelis}€</p>
      <p>Banke: ${product.Banke}€</p>
      <p>Paimta sau: ${product.Sau} vienetų</p>
      <button onclick="sellProduct(${product.id}, '${product.name}')">Parduoti (Vokelis/Bankas)</button>
      <button onclick="takeProduct(${product.id})">Pasiimti sau</button>
    `;
    productList.appendChild(productCard);

    // Apskaičiuojame pelną atskirai Evaldui ir Dovydui
    if (product.id <= 9) { // Evaldo produktai
      totalProfitEvaldasVokelis += product.Vokelis;
      totalProfitEvaldasBanke += product.Banke;
    } else { // Dovydo produktai
      totalProfitDovydasVokelis += product.Vokelis;
      totalProfitDovydasVokelisEvaldui += product.VokelisEvaldui;
    }
  });

  // Bendras pelnas viršuje
  const profitCard = document.getElementById('profit-card') || document.createElement('div');
  profitCard.id = 'profit-card';
  profitCard.classList.add('product-card');
  profitCard.innerHTML = `
    <h2>Bendras pelnas</h2>
    <p>Pelnas (Evaldas Vokelis): ${totalProfitEvaldasVokelis}€</p>
    <p>Pelnas (Evaldas Banke): ${totalProfitEvaldasBanke}€</p>
    <p>Pelnas (Dovydas Vokelis): ${totalProfitDovydasVokelis}€</p>
    <p>Pelnas (Dovydas Vokelis Evaldui): ${totalProfitDovydasVokelisEvaldui}€</p>
  `;
  
  // Įdedame pelno kortelę tik vieną kartą
  if (!document.getElementById('profit-card')) {
    document.body.insertBefore(profitCard, productList);
  }
}

function sellProduct(productId, productName) {
  const quantity = prompt("Kiek vienetų parduota?");
  const price = prompt("Kokia pardavimo kaina?");
  const paymentMethod = prompt("Atsiskaitymo būdas: Vokelis arba Banke");

  const product = findProductById(productId);
  if (product) {
    const profit = parseInt(price) * parseInt(quantity);
    if (paymentMethod === "Vokelis") {
      product.Vokelis += profit;
    } else if (paymentMethod === "Banke") {
      product.Banke += profit;
    }

    product.Parduota += parseInt(quantity);
    product.Kiekis -= parseInt(quantity);

    // Pinigai pridedami tik prie atitinkamo produkto savininko
    if (product.id <= 9) { // Evaldo produktai
      totalProfitEvaldasVokelis += profit;
      totalProfitEvaldasBanke += profit;
    } else { // Dovydo produktai
      totalProfitDovydasVokelis += profit;
      totalProfitDovydasVokelisEvaldui += profit;
    }
  }

  loadProducts();
}

function takeProduct(productId) {
  const quantity = prompt("Kiek vienetų pasiimi sau?");
  const product = findProductById(productId);
  if (product) {
    product.Kiekis -= parseInt(quantity);
    product.Sau += parseInt(quantity);
  }

  loadProducts();
}

function findProductById(productId) {
  let product = null;
  product = [...products["Evaldas"], ...products["Dovydas"]].find(p => p.id === productId);
  return product;
}

// Pirmas puslapio užkrovimas
loadProducts();
