// products.js
const products = [
  {
    id: 1,
    name: "Gold Charm Necklace",
    price: 2200,
    description: "Chic gold necklace with leaf charm",
    imageUrl: "assets/images/gold_chain_necklace.webp",
    category: "newArrival"
  },
  {
    id: 2,
    name: "Minimalist Bracelet",
    price: 1400,
    description: "Simple bracelet for daily wear",
    imageUrl: "assets/images/minimalist_bracelet.webp",
    category: "newArrival"
  },
  {
    id: 3,
    name: "Pearl Drop Earrings",
    price: 1800,
    description: "Elegant pearl drop earrings",
    imageUrl: "assets/images/pearldropears.webp",
    category: "newArrival"
  },
  {
    id: 4,
    name: "Stackable Rings Set",
    price: 1600,
    description: "Gold-plated rings set",
    imageUrl: "assets/images/stackingring.webp",
    category: "newArrival"
  },
  {
    id: 5,
    name: "Gold Charm Necklace",
    price: 2200,
    description: "Chic gold necklace with leaf charm",
    imageUrl: "assets/images/gold_chain_necklace.webp",
    category: "newArrival"
  },
  {
    id: 6,
    name: "Minimalist Bracelet",
    price: 1400,
    description: "Simple bracelet for daily wear",
    imageUrl: "assets/images/minimalist_bracelet.webp",
    category: "newArrival"
  },
  {
    id: 7,
    name: "Pearl Drop Earrings",
    price: 1800,
    description: "Elegant pearl drop earrings",
    imageUrl: "assets/images/pearldropears.webp",
    category: "newArrival"
  },
  {
    id: 8,
    name: "Stackable Rings Set",
    price: 1600,
    description: "Gold-plated rings set",
    imageUrl: "assets/images/stackingring.webp",
    category: "newArrival"
  },
  {
    id: 9,
    name: "Gold Charm Necklace",
    price: 2200,
    description: "Chic gold necklace with leaf charm",
    imageUrl: "assets/images/gold_chain_necklace.webp",
    category: "all"
  },
  {
    id: 10,
    name: "Minimalist Bracelet",
    price: 1400,
    description: "Simple bracelet for daily wear",
    imageUrl: "assets/images/minimalist_bracelet.webp",
    category: "all"
  },
  {
    id: 11,
    name: "Pearl Drop Earrings",
    price: 1800,
    description: "Elegant pearl drop earrings",
    imageUrl: "assets/images/pearldropears.webp",
    category: "all"
  },
  {
    id: 12,
    name: "Stackable Rings Set",
    price: 1600,
    description: "Gold-plated rings set",
    imageUrl: "assets/images/stackingring.webp",
    category: "all"
  },
  {
    id: 13,
    name: "Gold Charm Necklace",
    price: 2200,
    description: "Chic gold necklace with leaf charm",
    imageUrl: "assets/images/gold_chain_necklace.webp",
    category: "all"
  },
  {
    id: 14,
    name: "Minimalist Bracelet",
    price: 1400,
    description: "Simple bracelet for daily wear",
    imageUrl: "assets/images/minimalist_bracelet.webp",
    category: "all"
  },
  {
    id: 15,
    name: "Pearl Drop Earrings",
    price: 1800,
    description: "Elegant pearl drop earrings",
    imageUrl: "assets/images/pearldropears.webp",
    category: "all"
  },
  {
    id: 16,
    name: "Stackable Rings Set",
    price: 1600,
    description: "Gold-plated rings set",
    imageUrl: "assets/images/stackingring.webp",
    category: "all"
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

  if (page.includes("index.html") || page.includes("new-arrivals.html")) {
    renderProducts("newArrival");
  } else if (page.includes("collections.html")) {
    renderProducts("all");
  } else {
	renderProducts("newArrival");
  }
});
