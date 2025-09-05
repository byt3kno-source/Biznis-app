// Pavyzdinis duomenų rinkinys
const products = {
  "Evaldas": [
    { id: 1, name: "Fizzy Cherry Ice & Blueberry Cotton Candy", quantity: 10, sales: 0, profit: 0 },
    { id: 2, name: "Mixed Berries & Double Apple Ice", quantity: 10, sales: 0, profit: 0 },
    // Pridėkite kitus produktus čia...
  ],
  "Dovydas": [
    { id: 1, name: "Watermelon Ice & Lemon Lime", quantity: 10, sales: 0, profit: 0 },
    { id: 2, name: "Grape Ice & Strawberry Kiwi", quantity: 10, sales: 0, profit: 0 },
    // Pridėkite kitus produktus čia...
  ]
};

// Naudotojo prisijungimas su PIN kodu
const PIN_CODES = {
  Evaldas: "6719",
  Dovydas: "5535"
};

let currentUser = null;

function login() {
  const pin = prompt("Enter your PIN:");
  if (pin === PIN_CODES.Evaldas) {
    currentUser = "Evaldas";
  } else if (pin === PIN_CODES.Dovydas) {
    currentUser = "Dovydas";
  } else {
    alert("Incorrect PIN");
    return;
  }
  loadProducts();
}

function loadProducts() {
  if (!currentUser) return;
  const userProducts = products[currentUser];
  const productList = document.getElementById("product-list");
  productList.innerHTML = '';

  userProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <h3>${product.name}</h3>
      <p>Quantity: ${product.quantity}</p>
      <p>Sales: ${product.sales}</p>
      <p>Profit: ${product.profit}€</p>
      <button onclick="sellProduct(${product.id})">Sell</button>
      <button onclick="takeProduct(${product.id})">Take for Myself</button>
      <button onclick="transferProduct(${product.id})">Transfer</button>
    `;
    productList.appendChild(productCard);
  });
}

function sellProduct(productId) {
  const quantity = prompt("How many units sold?");
  const price = prompt("What is the sale price?");
  updateProduct(productId, quantity, price, 'sell');
}

function takeProduct(productId) {
  const quantity = prompt("How many units will you take for yourself?");
  updateProduct(productId, quantity, 0, 'take');
}

function transferProduct(productId) {
  const targetUser = prompt("Enter the name of the user to transfer to (Evaldas or Dovydas):");
  if (targetUser !== "Evaldas" && targetUser !== "Dovydas") {
    alert("Invalid user.");
    return;
  }
  const quantity = prompt("How many units to transfer?");
  const product = products[currentUser].find(p => p.id === productId);
  const transferProduct = { ...product, owner: targetUser };
  products[targetUser].push(transferProduct);
  updateProduct(productId, quantity, 0, 'transfer', targetUser);
}

function updateProduct(productId, quantity, price, action, targetUser = currentUser) {
  const product = products[targetUser].find(p => p.id === productId);
  if (!product) return;

  switch (action) {
    case 'sell':
      product.quantity -= quantity;
      product.sales += parseInt(quantity);
      product.profit += parseInt(price) * parseInt(quantity);
      break;
    case 'take':
      product.quantity -= quantity;
      break;
    case 'transfer':
      product.quantity -= quantity;
      break;
    default:
      return;
  }

  loadProducts();
}

login();
