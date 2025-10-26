// product-detail.js

const product = JSON.parse(localStorage.getItem("selectedProduct"));
if (!product) {
  document.body.innerHTML = "<p>Product not found.</p>";
} else {
  // Display main product info
  document.getElementById("main-image").src = product.imageUrl;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-description").textContent = product.description;
  document.getElementById("product-color").textContent = product.details.color;
  document.getElementById("product-size").textContent = product.details.size;
  document.getElementById("product-weight").textContent = product.details.weight;
  document.getElementById("product-material").textContent = product.details.material;
  document.getElementById("product-stones").textContent = product.details.stones;
  document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;

  // WhatsApp checkout
  document.getElementById("wa-checkout").onclick = () => {
    const message = `Hello! I'm interested in this product:%0A${product.name}%0A$${product.price}%0AProduct ID: ${product.id}`;
    const shopPhone = "6581523430";
    const waUrl = `https://wa.me/${shopPhone}?text=${message}`;
    window.open(waUrl, "_blank");
  };

  const related = products
    .filter(p => p.details.item === product.details.item && p.id !== product.id)
    .slice(0, 3);

  const relatedContainer = document.getElementById("related-container");
  relatedContainer.innerHTML = ""; // Clear before rendering

  if (related.length === 0) {
    relatedContainer.innerHTML = "<p>No related products found.</p>";
  } else {
    related.forEach(r => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <div class="product-card-inner">
          <img src="${r.imageUrl}" alt="${r.name}">
          <div class="info">
            <h3>${r.name}</h3>
            <p class="price">$${r.price.toFixed(2)}</p>
            <button class="add-btn">Add to Cart</button>
          </div>
        </div>
      `;

      // Click anywhere on the card (except the button) → open product detail
      div.querySelector(".product-card-inner").onclick = e => {
        if (!e.target.classList.contains("add-btn")) {
          localStorage.setItem("selectedProduct", JSON.stringify(r));
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.location.reload();
        }
      };

      // Add to Cart button only → adds item, doesn't open detail
      div.querySelector(".add-btn").onclick = e => {
        e.stopPropagation(); // prevent navigation
        addToCart(r.id);
      };

      relatedContainer.appendChild(div);
    });
  }
}
