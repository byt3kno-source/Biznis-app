// Pavyzdinis duomenų rinkinys
const products = {
  "Evaldas": [
    { id: 1, name: "Fizzy Cherry Ice & Blueberry Cotton Candy", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 },
    { id: 2, name: "Mixed Berries & Double Apple Ice", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 },
    { id: 3, name: "Blue Razz Lemonade & Watermelon Bubblegum", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 },
    { id: 4, name: "Strawberry Watermelon Bubblegum & Mixed Fruit", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 },
    { id: 5, name: "Sour Apple Raspberry & Strawberry Big Bang", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 },
    { id: 6, name: "Peach Berry & Watermelon Mango Peach", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 },
    { id: 7, name: "Strawberry Cherry & Kiwi Passion Fruit", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 },
    { id: 8, name: "Gummy Bear & Strawberry Cola", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 },
    { id: 9, name: "Triple Melon Ice & Raspberry Watermelon", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 }
  ],
  "Dovydas": [
    { id: 10, name: "Watermelon Ice & Lemon Lime", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 },
    { id: 11, name: "Grape Ice & Strawberry Kiwi", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 },
    { id: 12, name: "Strawberry Raspberry Cherry & Love 666", Kiekis: 20, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 },
    { id: 13, name: "Cherry Cola Ice & Strawberry Raspberry Candy", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 },
    { id: 14, name: "Blueberry Ice & Black Dragon Ice", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 },
    { id: 15, name: "Strawberry Cherry & Kiwi Passion Fruit", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 },
    { id: 16, name: "Banana Pineapple Ice & Red Bull Ice", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 },
    { id: 17, name: "Red Bull Strawberry & Blackcurrant Ice", Kiekis: 10, Parduota: 0, Vokelis: 0, Banke: 0, Sau: 0 }
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
    let Vokelis = product.Vokelis || 0;
    let Banke = product.Banke || 0;
    let VokelisEvaldui = product.VokelisEvaldui || 0;

    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <h3>${product.name}</h3>
      <p>Kiekis: ${product.Kiekis}</p>
      <p>Parduota: ${product.Parduota}</p>
      <button onclick="sellProduct(${product.id}, '${product.name}')">Parduoti (Vokelis/Bankas)</button>
      <button onclick="takeProduct(${product.id})">Pasiimti sau</button>
    `;
    productList.appendChild(productCard);

    // Apskaičiuojame pelną atskirai Evaldui ir Dovydui
    if (product.id <= 9) { // Evaldo produktai
      totalProfitEvaldasVokelis += Vokelis;
      totalProfitEvaldasBanke += Banke;
      totalProfitDovydasVokelisEvaldui += VokelisEvaldui;
    } else { // Dovydo produktai
      totalProfitDovydasVokelis += Vokelis;
    }
  });

  const profitCard = document.getElementById('profit-card') || document.createElement('div');
  profitCard.id = 'profit-card';
  profitCard.classList.add('product-card');
  profitCard.innerHTML = `
    <h2>Bendras pelnas</h2>
    <p>Evaldas Vokelis: ${totalProfitEvaldasVokelis}€ už ${calculateSoldQuantity(1)}vnt.</p>
    <p>Evaldas Banke: ${totalProfitEvaldasBanke}€ už ${calculateSoldQuantity(1)}vnt.</p>
    <p>Dovydas Vokelis: ${totalProfitDovydasVokelis}€ už ${calculateSoldQuantity(10)}vnt.</p>
    <p>Dovydas Vokelis Evaldui: ${totalProfitDovydasVokelisEvaldui}€ už ${calculateSoldQuantity(10)}vnt.</p>
  `;
  
  if (!document.getElementById('profit-card')) {
    document.body.insertBefore(profitCard, productList);
  }
}

function calculateSoldQuantity(userId) {
  let soldQuantity = 0;
  let userProducts = [...products["Evaldas"], ...products["Dovydas"]];
  userProducts.forEach(product => {
    if (product.id <= userId) {
      soldQuantity += product.Parduota;
    }
  });
  return soldQuantity;
}

function sellProduct(productId, productName) {
  const quantity = prompt("Kiek vienetų parduota?");
  const price = prompt("Kokia pardavimo kaina?");
  let paymentMethod = prompt("Atsiskaitymo būdas: Vokelis, Banke, Dovydas Vokelis Evaldui (arba tiesiog įrašyk 'DE')");

  // Jei įrašoma "DE", pakeičiame į pilną frazę
  if (paymentMethod === "DE") {
    paymentMethod = "Dovydas Vokelis Evaldui";
  }

  const product = findProductById(productId);
  if (product) {
    const profit = parseInt(price) * parseInt(quantity);
    
    // Jei produktas priklauso Evaldui
    if (product.id <= 9) {
      if (paymentMethod === "Vokelis") {
        product.Vokelis += profit;
        totalProfitEvaldasVokelis += profit;
      } else if (paymentMethod === "Banke") {
        product.Banke += profit;
        totalProfitEvaldasBanke += profit;
      } else if (paymentMethod === "Dovydas Vokelis Evaldui") {
        product.VokelisEvaldui += profit;
        totalProfitDovydasVokelisEvaldui += profit;
      }
    } else { // Dovydo produktai
      product.Vokelis += profit;  
      totalProfitDovydasVokelis += profit;
    }

    product.Parduota += parseInt(quantity);
    product.Kiekis -= parseInt(quantity);
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
