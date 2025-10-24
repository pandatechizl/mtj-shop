// include.js
async function includeHTML() {
  const elements = document.querySelectorAll("[data-include]");
  for (const el of elements) {
    const file = el.getAttribute("data-include");
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Cannot load ${file}`);
      const html = await response.text();
      el.innerHTML = html;
    } catch (err) {
      el.innerHTML = `<p style="color:red;">Failed to load ${file}</p>`;
      console.error(err);
    }
  }
}

document.addEventListener("DOMContentLoaded", includeHTML);
