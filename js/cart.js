// cart.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId, quantity=1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) existing.qty += quantity;
    else cart.push({ id: product.id, name: product.name, price: product.price, qty: quantity });

    saveCart();
    alert(`${product.name} added to cart`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

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
}
