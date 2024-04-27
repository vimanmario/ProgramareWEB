// WebSocket-uri pentru diferite criptomonede
const websockets = {
    eth: new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade'),
    btc: new WebSocket('wss://stream.binance.com:9443/ws/btceur@trade'),
    sol: new WebSocket('wss://stream.binance.com:9443/ws/soleur@trade'),
    bnb: new WebSocket('wss://stream.binance.com:9443/ws/bnbeur@trade'),
    doge: new WebSocket('wss://stream.binance.com:9443/ws/dogeeur@trade'),
    ada: new WebSocket('wss://stream.binance.com:9443/ws/adaeur@trade'),
    dot: new WebSocket('wss://stream.binance.com:9443/ws/doteur@trade'),
    ltc: new WebSocket('wss://stream.binance.com:9443/ws/ltceur@trade'),
    xrp: new WebSocket('wss://stream.binance.com:9443/ws/xrpeur@trade') // corectat xrp
};

// Obține elementul tbody pentru tabel
const tbody = document.getElementById('data');

// Funcție pentru a crea și a actualiza rândurile tabelului
function updateTable(coin, price) {
    // Verificăm dacă există deja un rând pentru această monedă
    let row = document.getElementById(coin);
    if (!row) {
        // Dacă nu există, creăm un rând nou
        row = document.createElement('tr');
        row.id = coin;
        tbody.appendChild(row);
        // Adăugăm celule pentru numele monedei (fără sufixul "eur") și prețul curent
        row.innerHTML = `<td>${coin.toUpperCase().replace('EUR', '')}</td><td id="${coin}-price">${price}</td>`;
    } else {
        // Dacă există, actualizăm doar prețul
        const priceCell = row.querySelector(`#${coin}-price`);
        const lastPrice = parseFloat(priceCell.innerText);
        priceCell.innerText = price;

        // Setăm culoarea corespunzătoare în funcție de modificarea prețului
        if (!lastPrice || lastPrice === parseFloat(price)) {
            priceCell.style.color = 'black'; // valoarea rămâne la fel
        } else if (parseFloat(price) > lastPrice) {
            priceCell.style.color = 'green'; // valoarea crește
        } else {
            priceCell.style.color = 'red'; // valoarea scade
        }
    }
}



// Funcție pentru gestionarea mesajelor primite de la WebSocket-uri
function handleMessage(event) {
    const data = JSON.parse(event.data);
    const coin = data.s.replace('eur', ''); // Obține codul monedei
    const price = parseFloat(data.p).toFixed(2); // Obține prețul
    updateTable(coin, price); // Actualizează tabelul
}

// Conectarea la WebSocket-uri și atașarea funcției de gestionare a mesajelor
for (const ws of Object.values(websockets)) {
    ws.onmessage = handleMessage;
}
