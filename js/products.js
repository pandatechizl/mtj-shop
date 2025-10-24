// products.js
const products = [
  {
    id: 1,
    name: "Gold Charm Necklace",
    price: 22.9,
    description: "Chic gold necklace with leaf charm",
    imageUrl: "assets/images/gold_chain_necklace.webp",
    category: "newArrival"
  },
  {
    id: 2,
    name: "Minimalist Bracelet",
    price: 14.5,
    description: "Simple bracelet for daily wear",
    imageUrl: "assets/images/minimalist_bracelet.webp",
    category: "newArrival"
  },
  {
    id: 3,
    name: "Pearl Drop Earrings",
    price: 18.0,
    description: "Elegant pearl drop earrings",
    imageUrl: "assets/images/pearldropears.webp",
    category: "newArrival"
  },
  {
    id: 4,
    name: "Stackable Rings Set",
    price: 16.9,
    description: "Gold-plated rings set",
    imageUrl: "assets/images/stackingring.webp",
    category: "newArrival"
  }
];

// Main render function
function renderProducts(filterCategory = "all") {
  const container = document.getElementById("product-list");
  if (!container) return;

  // Filter products by category
  const filteredProducts =
    filterCategory === "all"
      ? products
      : products.filter(p => p.category === filterCategory);

  // Render product cards
  container.innerHTML = filteredProducts
    .map(
      p => `
      <div class="product">
      <img src="${p.imageUrl}" alt="${p.name}">
        <div class="info">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <p class="price">$${p.price.toFixed(2)}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    `
    )
    .join("");
}

// Auto-detect which page is being loaded
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname;

  if (page.includes("index.html")) {
    renderProducts("newArrival");
  } else if (page.includes("collections.html")) {
    renderProducts("collection");
  } else if (page.includes("shop.html")) {
    renderProducts("all");
  } else {
	renderProducts("newArrival");
  }
});
