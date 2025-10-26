// cart.js

// ✅ Load existing cart data
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ✅ Save and sync cart data
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

// ✅ Render cart content
function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalDiv = document.getElementById("cart-total");
  if (!cartContainer || !totalDiv) return;

  cartContainer.innerHTML = "";
  totalDiv.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    updateCartBadge();
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="item-image">
        <img src="${item.image || "assets/images/placeholder.jpg"}" alt="${item.name}" class="cart-thumb" />
      </div>
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
    cartContainer.appendChild(div);
  });

  totalDiv.innerHTML = `<h3>Grand Total: $${total.toFixed(2)}</h3>`;
  updateCartBadge();
}

// ✅ Update quantity
function updateQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += change;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  saveCart();
  renderCart();
}

// ✅ Update cart badge (on navbar)
function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;

  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-block" : "none";

  badge.classList.add("bump");
  setTimeout(() => badge.classList.remove("bump"), 300);
}

// ✅ Add to cart (can be called from product or shop pages)
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

// ✅ Listen for cart changes across tabs/pages (LIVE SYNC)
window.addEventListener("storage", (event) => {
  if (event.key === "cart") {
    cart = JSON.parse(event.newValue || "[]");
    renderCart();
    updateCartBadge();
  }
});

// ✅ Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartBadge();
});
