// cart.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-block" : "none";
}

function addToCart(productId, quantity=1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) existing.qty += quantity;
    else cart.push({ id: product.id, name: product.name, price: product.price, qty: quantity });

    saveCart();
    alert(`${product.name} added to cart`);
    updateCartBadge();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    updateCartBadge();
}

function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalDiv = document.getElementById("cart-total");
  cartContainer.innerHTML = "";
  totalDiv.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    updateCartBadge();
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${product.imageUrl}" alt="${item.name}" class="cart-thumb" />
      <div class="details">
        <h3>${item.name}</h3>
        <p class="cart-id">Product ID: ${item.id}</p>
        <p class="price">$${item.price.toFixed(2)}</p>
        <div class="quantity-control">
          <button onclick="updateQty(${item.id}, -1)">–</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${item.id}, 1)">+</button>
        </div>
        <p class="subtotal">Subtotal: $${(item.price * item.qty).toFixed(2)}</p>
      </div>
    `;
    div.onclick = () => {
      localStorage.setItem("selectedProduct", JSON.stringify(p));
      window.location.href = "product.html"; // 🧭 navigate to product detail page
    };
    cartContainer.appendChild(div);
  });

  totalDiv.innerHTML = `<h3>Grand Total: $${total.toFixed(2)}</h3>`;
  updateCartBadge();
}


/*
function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const div = document.createElement("div");
        div.innerHTML = `
            ${item.name} x ${item.qty} - $${item.price.toFixed(2)}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(div);
    });

    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartContainer.appendChild(totalDiv);
}

function checkoutWA(customerName, phone) {
    if (!customerName || !phone) {
        alert("Please enter your name and phone number");
        return;
    }
    let message = "Hello! I'd like to order:%0A";
    cart.forEach(item => {
        message += `${item.qty} x ${item.name} - $${item.price}%0A`;
    });
    let total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
    message += `%0ATotal: $${total}%0AName: ${customerName}%0APhone: ${phone}`;

    const shopPhone = "6581523430"; // your WhatsApp number
    const waUrl = `https://wa.me/${shopPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
    cart = [];
    saveCart();
    renderCart();
}*/

function checkoutWA(customerName, phone) {
  if (!customerName || !phone) {
    alert("Please enter your name and phone number");
    return;
  }

  let messageLines = [];
  messageLines.push("💎 *Hello! I'd like to order:*");
  messageLines.push(""); // blank line

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    messageLines.push(`• [${item.id}] ${item.name} x ${item.qty} – $${item.price.toFixed(2)}`);
  });

  messageLines.push(""); // blank line
  let total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  messageLines.push(`*Total:* $${total.toFixed(2)}`);
  messageLines.push("");
  messageLines.push(`👤 *Name:* ${customerName}`);
  messageLines.push(`📞 *Phone:* ${phone}`);

  const message = messageLines.join("\n"); // Proper line breaks for WhatsApp
  const shopPhone = "6581523430"; // your WhatsApp number

  // Encode only the whole message once
  const waUrl = `https://wa.me/${shopPhone}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");

  // Clear cart after checkout
  cart = [];
  saveCart();
  renderCart();
  updateCartBadge();
}

function updateQty(productId, change) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  saveCart();
  renderCart();
}

//On page load
document.addEventListener("DOMContentLoaded", renderCart);


