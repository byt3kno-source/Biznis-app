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
  let totalProfitEvaldasCash = 0;
  let totalProfitEvaldasBank = 0;
  let totalProfitDovydasCash = 0;
  let totalProfitDovydasBank = 0;

  // Atnaujinam tiek Evaldo, tiek Dovydo prekes
  const allProducts = [...products["Evaldas"], ...products["Dovydas"]];
  allProducts.forEach(product => {
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

    // Apskaičiuojame pelnus
    if (product.name.includes("Evaldas")) {
      totalProfitEvaldasCash += product.Grynais;
      totalProfitEvaldasBank += product.Banku;
    } else {
      totalProfitDovydasCash += product.Grynais;
      totalProfitDovydasBank += product.Banku;
    }
  });

  // Bendras pelnas viršuje
  const profitCard = document.createElement('div');
  profitCard.classList.add('product-card');
  profitCard.innerHTML = `
    <h2>Bendras pelnas</h2>
    <p>Pelnas (Evaldas Grynais): ${totalProfitEvaldasCash}€</p>
    <p>Pelnas (Evaldas Banku): ${totalProfitEvaldasBank}€</p>
    <p>Pelnas (Dovydas Grynais): ${totalProfitDovydasCash}€</p>
    <p>Pelnas (Dovydas Banku): ${totalProfitDovydasBank}€</p>
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

  loadProducts();
}

function takeProduct(productId) {
  const quantity = prompt("Kiek vienetų pasiimi sau?");
  const product = products["Evaldas"].concat(products["Dovydas"]).find(p => p.id === productId);
  if (product) {
    product.Kiekis -= parseInt(quantity);
    product.Sau += parseInt(quantity);
  }

  loadProducts();
}

// Pirmas puslapio užkrovimas
loadProducts();
