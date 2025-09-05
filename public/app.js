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

// Prisijungimo pasirinkimas
let isAdmin = true;

function login() {
  const userChoice = prompt("Choose user: Evaldas, Dovydas or Admin");

  if (userChoice === "Admin") {
    currentUser = "Admin";
    isAdmin = true;
  }

  loadProducts();
}

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
      <p>Quantity: ${product.quantity}</p>
      <p>Sales: ${product.sales}</p>
      <p>Profit (Cash): ${product.profitCash}€</p>
      <p>Profit (Bank): ${product.profitBank}€</p>
      <p>Taken for Myself: ${product.takenForSelf} units</p>
      <button onclick="sellProduct(${product.id})">Sell (Cash/Bank)</button>
      <button onclick="takeProduct(${product.id})">Take for Myself</button>
    `;
    productList.appendChild(productCard);

    totalProfitCash += product.profitCash;
    totalProfitBank += product.profitBank;
  });

  // Bendras pelnas viršuje
  const profitCard = document.createElement('div');
  profitCard.classList.add('product-card');
  profitCard.innerHTML = `
    <h2>Total Profit for ${currentUser}</h2>
    <p>Total Profit (Cash): ${totalProfitCash}€</p>
    <p>Total Profit (Bank): ${totalProfitBank}€</p>
  `;
  document.body.insertBefore(profitCard, productList);
}

function sellProduct(productId) {
  const quantity = prompt("How many units sold?");
  const price = prompt("What is the sale price?");
  const paymentMethod = prompt("Payment method: Cash or Bank?");
  
  if (paymentMethod !== "Cash" && paymentMethod !== "Bank") {
    alert("Invalid payment method!");
    return;
  }

  const product = findProductById(productId);
  if (product) {
    const profit = parseInt(price) * parseInt(quantity);
    if (paymentMethod === "Cash") {
      product.profitCash += profit;
    } else {
      product.profitBank += profit;
    }
    product.sales += parseInt(quantity);
    product.quantity -= parseInt(quantity);
  }

  loadProducts();
}

function takeProduct(productId) {
  const quantity = prompt("How many units will you take for yourself?");
  const product = findProductById(productId);
  if (product) {
    product.quantity -= parseInt(quantity);
    product.takenForSelf += parseInt(quantity);
  }

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

login();
