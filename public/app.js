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

function loadProducts() {
  const evaldasColumn = document.getElementById("evaldas-column");
  const dovydasColumn = document.getElementById("dovydas-column");

  evaldasColumn.innerHTML = '';
  dovydasColumn.innerHTML = '';

  // Pirmiausia užpildome Evaldo produktus
  let evaldasProducts = [...products["Evaldas"]];
  evaldasProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <h3>${product.name}</h3>
      <p>Kiekis: ${product.Kiekis}</p>
      <p>Parduota: ${product.Parduota}</p>
      <p>Pasiimta sau: ${product.Sau} vienetų</p>
      <p>Vokelis: ${product.Vokelis}€</p>
      <p>Banke: ${product.Banke}€</p>
      <button onclick="sellProduct(${product.id}, '${product.name}')">Parduoti (Vokelis/Bankas)</button>
      <button onclick="takeProduct(${product.id})">Pasiimti sau</button>
    `;
    evaldasColumn.appendChild(productCard);
  });

  // Dabar užpildome Dovydo produktus
  let dovydasProducts = [...products["Dovydas"]];
  dovydasProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <h3>${product.name}</h3>
      <p>Kiekis: ${product.Kiekis}</p>
      <p>Parduota: ${product.Parduota}</p>
      <p>Pasiimta sau: ${product.Sau} vienetų</p>
      <p>Vokelis: ${product.Vokelis}€</p>
      <button onclick="sellProduct(${product.id}, '${product.name}')">Parduoti (Vokelis)</button>
      <button onclick="takeProduct(${product.id})">Pasiimti sau</button>
    `;
    dovydasColumn.appendChild(productCard);
  });
}

function sellProduct(productId, productName) {
  const quantity = prompt("Kiek vienetų parduota?");
  const price = prompt("Kokia pardavimo kaina?");
  let paymentMethod = prompt("Atsiskaitymo būdas: Vokelis, Banke");

  const product = findProductById(productId);
  if (product) {
    const profit = parseInt(price) * parseInt(quantity);

    // Evaldo produktai
    if (product.id <= 9) {
      if (paymentMethod === "Vokelis") {
        product.Vokelis += profit;
      } else if (paymentMethod === "Banke") {
        product.Banke += profit;
      }
    } else { // Dovydo produktai
      product.Vokelis += profit;
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
