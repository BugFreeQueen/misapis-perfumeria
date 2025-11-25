const BASE_URL = "http://localhost:3000/api/perfumes";

const btnCargar = document.getElementById("btnCargar");
const btnNuevo = document.getElementById("btnNuevo");
const modal = document.getElementById("formulario");
const cancelar = document.getElementById("cancelar");
const guardar = document.getElementById("guardar");
const tabla = document.querySelector("#tablaPerfumes tbody");

let editandoID = null;

async function cargarPerfumes() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  mostrarTabla(data);
}

btnNuevo.addEventListener("click", () => {
  editandoID = null;

  nombre.value = "";
  marca.value = "";
  tipo.value = "Feromona";
  intensidad.value = "";
  duracion.value = "";
  notas.value = "";

  modal.classList.remove("hidden");
});

cancelar.addEventListener("click", () => modal.classList.add("hidden"));

btnCargar.addEventListener("click", cargarPerfumes);

function mostrarTabla(lista) {
  tabla.innerHTML = "";
  lista.forEach(p => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${p.nombre}</td>
      <td>${p.marca}</td>
      <td>${p.tipo}</td>
      <td>${p.intensidad}</td>
      <td>${p.duracionHoras}</td>
      <td>${p.notas}</td>
      <td>
        <button onclick="editar('${p._id}')">✏️</button>
        <button onclick="eliminar('${p._id}')">🗑️</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

// Guardar o Editar
guardar.addEventListener("click", async () => {
  const perfumeData = {
    nombre: nombre.value,
    marca: marca.value,
    tipo: tipo.value,
    intensidad: Number(intensidad.value),
    duracionHoras: Number(duracion.value),
    notas: notas.value
  };

  if (editandoID === null) {
    await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(perfumeData)
    });
  } else {
    await fetch(`${BASE_URL}/${editandoID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(perfumeData)
    });
  }

  modal.classList.add("hidden");
  cargarPerfumes();
});

// Editar perfume
window.editar = async (id) => {
  editandoID = id;
  const res = await fetch(`${BASE_URL}/${id}`);
  const p = await res.json();

  nombre.value = p.nombre;
  marca.value = p.marca;
  tipo.value = p.tipo;
  intensidad.value = p.intensidad;
  duracion.value = p.duracionHoras;
  notas.value = p.notas;

  modal.classList.remove("hidden");
};

// Eliminar perfume
window.eliminar = async (id) => {
  if (confirm("¿Eliminar este perfume?")) {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    cargarPerfumes();
  }
};

cargarPerfumes();
