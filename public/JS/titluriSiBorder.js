document.addEventListener("DOMContentLoaded", function() {
    // Definirea array-ului cu titlurile de cărți
    var carti = [
        "1. Cronicile din Narnia",
        "2. Moby Dick",
        "3. Harry Potter și piatra filozofală",
        "4. Anna Karenina",
        "5. Domnișoara de la țară"
    ];

    // Referința către elementul <ul> în care vom afișa titlurile de cărți (varianta sincronă)
    var listaCarti = document.getElementById("bookList");

    // Parcurgerea array-ului și adăugarea fiecărui titlu de carte în lista HTML (varianta sincronă)
    carti.forEach(function(titlu) {
        var listItem = document.createElement("li"); // Crearea unui element <li> pentru fiecare titlu
        listItem.textContent = titlu; // Setarea textului fiecărui element <li> cu un titlu de carte
        listaCarti.appendChild(listItem); // Adăugarea elementului <li> în lista de cărți (varianta sincronă)
    });

    // Referința către elementul <ul> în care vom afișa titlurile de cărți (varianta asincronă)
    var listaCartiAsincron = document.getElementById("asyncBookList");

    // Afisarea fiecarui titlu de carte în mod asincron cu o întârziere de 2 secunde
    carti.forEach(function(titlu, index) {
        setTimeout(function() {
            var listItem = document.createElement("li"); // Crearea unui element <li> pentru fiecare titlu
            listItem.textContent = titlu; // Setarea textului fiecărui element <li> cu un titlu de carte
            listaCartiAsincron.appendChild(listItem); // Adăugarea elementului <li> în lista de cărți (varianta asincronă)
        }, 2000 * (index + 1)); // Index + 1 pentru a asigura o întârziere de 2 secunde între fiecare afișare
    });

    // Schimbarea culorii de fundal la fiecare 3 secunde pentru secțiunea de text
    var colors = ["lightblue", "lightgreen", "lightcoral", "lightyellow", "lightsalmon", "lightcyan", "lightpink"];
    var colorIndex = 0;

    setInterval(function() {
        var textSection = document.getElementById("textSection");
        textSection.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 3000);
});