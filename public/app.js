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
    { id: 1, name: "Watermelon Ice & Lemon Lime", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 2, name: "Grape Ice & Strawberry Kiwi", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 3, name: "Strawberry Raspberry Cherry & Love 666", Kiekis: 20, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 4, name: "Cherry Cola Ice & Strawberry Raspberry Candy", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 5, name: "Blueberry Ice & Black Dragon Ice", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 6, name: "Strawberry Cherry & Kiwi Passion Fruit", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 7, name: "Banana Pineapple Ice & Red Bull Ice", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 },
    { id: 8, name: "Red Bull Strawberry & Blackcurrant Ice", Kiekis: 10, Parduota: 0, Grynais: 0, Banku: 0, Sau: 0 }
  ]
};

// Numatytoji vartotojo reikšmė
let currentUser = "Evaldas"; // Pavyzdžiui, numatytas vartotojas - Evaldas
let isAdmin = currentUser === "Admin";

function loadProducts() {
  if (!currentUser) return;
  const productList = document.getElementById("product-list");
  productList.innerHTML = '';

  let userProducts = [];
  if (isAdmin) {
    userProducts = [...products["Evaldas"], ...products["Dovydas"]];
  } else {
    userProducts = products[currentUser];
  }

  let totalProfitCash = 0;
  let totalProfitBank = 0;

  userProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <h3>${product.name}</h3>
      <p>Kiekis: ${product.Kiekis}</p>
      <p>Parduota: ${product.Parduota}</p>
      <p>Grynais: ${product.Grynais}€</p>
      <p>Banku: ${product.Banku}€</p>
      <p>Paimta sau: ${product.Sau} vienetų</p>
      <button onclick="sellProduct(${product.id})">Parduoti (Grynais/Banku)</button>
      <button onclick="takeProduct(${product.id})">Pasiimti sau</button>
    `;
    productList.appendChild(productCard);

    totalProfitCash += product.Grynais;
    totalProfitBank += product.Banku;
  });

  // Bendras pelnas viršuje
  const profitCard = document.createElement('div');
  profitCard.classList.add('product-card');
  profitCard.innerHTML = `
    <h2>Bendras pelnas (${currentUser})</h2>
    <p>Pelnas (Grynais): ${totalProfitCash}€</p>
    <p>Pelnas (Banku): ${totalProfitBank}€</p>
  `;
  document.body.insertBefore(profitCard, productList);
}

function sellProduct(productId) {
  const quantity = prompt("Kiek vienetų parduota?");
  const price = prompt("Kokia pardavimo kaina?");
  const paymentMethod = prompt("Atsiskaitymo būdas: Grynais arba Banku");

  const product = products["Evaldas"].concat(products["Dovydas"]).find(p => p.id === productId);
  if (product) {
    const profit = parseInt(price) * parseInt(quantity);
    if (paymentMethod === "Grynais") {
      product.Grynais += profit;
    } else {
      product.Banku += profit;
    }
    product.Parduota += parseInt(quantity);
    product.Kiekis -= parseInt(quantity);
  }

  saveToLocalStorage();
  loadProducts();
}

function takeProduct(productId) {
  const quantity = prompt("Kiek vienetų pasiimi sau?");
  const product = products["Evaldas"].concat(products["Dovydas"]).find(p => p.id === productId);
  if (product) {
    product.Kiekis -= parseInt(quantity);
    product.Sau += parseInt(quantity);
  }

  saveToLocalStorage();
  loadProducts();
}

function findProductById(productId) {
  let product = null;
  if (currentUser && !isAdmin) {
    product = products[currentUser].find(p => p.id === productId);
  } else if (isAdmin) {
    product = [...products["Evaldas"], ...products["Dovydas"]].find(p => p.id === productId);
  }
  return product;
}

// Naudojame localStorage, kad išsaugotume prekes ir pelną
function loadFromLocalStorage() {
  const savedData = localStorage.getItem("products");
  if (savedData) {
    Object.assign(products, JSON.parse(savedData));
  }
}

function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

// Pirmas puslapio užkrovimas
loadFromLocalStorage();
loadProducts();
