// app.js 🌿

const apiUrl = "http://localhost:4000/plants";
const plantGrid = document.getElementById("plant-grid");
const form = document.getElementById("plant-form");
const btnShowForm = document.getElementById("btn-show-form");

// Mostrar / ocultar formulario
btnShowForm.addEventListener("click", () => {
  form.style.display = form.style.display === "none" ? "flex" : "none";
});

// Cargar todas las plantas al iniciar
async function loadPlants() {
  const response = await fetch(apiUrl);
  const plants = await response.json();
  plantGrid.innerHTML = "";

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.classList.add("plant-card");
    card.innerHTML = `
      <h3>${plant.name}</h3>
      <p><strong>Tipo:</strong> ${plant.type}</p>
      <p><strong>Tamaño:</strong> ${plant.size || "-"}</p>
      <p><strong>Luz:</strong> ${plant.light || "-"}</p>
      <p><strong>Riego:</strong> ${plant.water || "-"}</p>
      <p><em>${plant.description || ""}</em></p>
      <button onclick="deletePlant(${plant.id})">🗑 Eliminar</button>
    `;
    plantGrid.appendChild(card);
  });
}

// Agregar nueva planta
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const plant = {
    name: document.getElementById("name").value,
    type: document.getElementById("type").value,
    size: document.getElementById("size").value,
    light: document.getElementById("light").value,
    water: document.getElementById("water").value,
    description: document.getElementById("description").value,
  };

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plant),
  });

  form.reset();
  form.style.display = "none";
  loadPlants();
});

// Eliminar planta
async function deletePlant(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  loadPlants();
}

// Cargar al inicio
loadPlants();
