let inventory = [];

document.addEventListener("DOMContentLoaded", function() {
    const storedInventory = localStorage.getItem("inventory");
    inventory = storedInventory ? JSON.parse(storedInventory) : [];

    displayInventory();
});

function displayInventory() {
    const table = document.getElementById("inventory");
    table.innerHTML = `
      <tr>
        <th>Denumire</th>
        <th>Preț</th>
        <th>Cantitate</th>
        <th>Acțiuni</th>
      </tr>
    `;

    inventory.forEach(product => {
        const row = `
        <tr>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.quantity}</td>
          <td>
            <button class="btn" onclick="updateProduct('${product.name}')">Actualizare</button>
            <button class="btn" onclick="deleteProduct('${product.name}')">Ștergere</button>
          </td>
        </tr>
      `;
        table.innerHTML += row;
    });
}

function addProduct() {
    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    if (name && !isNaN(price) && !isNaN(quantity)) {
        const existingProductIndex = inventory.findIndex(product => product.name === name && product.price === price);
        if (existingProductIndex !== -1) {
            inventory[existingProductIndex].quantity += quantity;
        } else {
            inventory.push({ name, price, quantity });
        }
        // Salvăm inventarul actualizat în localStorage
        localStorage.setItem("inventory", JSON.stringify(inventory));
        displayInventory();
    } else {
        alert("Vă rugăm să completați toate câmpurile corect!");
    }
}

function updateProduct(name) {
    const newQuantity = prompt(`Introduceți noua cantitate pentru produsul "${name}":`);
    if (newQuantity !== null) {
        const index = inventory.findIndex(product => product.name === name);
        if (index !== -1) {
            inventory[index].quantity = parseInt(newQuantity);
            // Salvăm inventarul actualizat în localStorage
            localStorage.setItem("inventory", JSON.stringify(inventory));
            displayInventory();
        } else {
            alert(`Produsul "${name}" nu există în inventar.`);
        }
    }
}

function deleteProduct(name) {
    const confirmation = confirm(`Sigur doriți să ștergeți produsul "${name}" din inventar?`);
    if (confirmation) {
        inventory = inventory.filter(product => product.name !== name);
        localStorage.setItem("inventory", JSON.stringify(inventory));
        displayInventory();
    }
}

displayInventory();
