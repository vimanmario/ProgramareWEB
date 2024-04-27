document.addEventListener("DOMContentLoaded", function() {
    var carti = [
        "1. Cronicile din Narnia",
        "2. Moby Dick",
        "3. Harry Potter și piatra filozofală",
        "4. Anna Karenina",
        "5. Domnișoara de la țară"
    ];

    var listaCarti = document.getElementById("bookList");

    carti.forEach(function(titlu) {
        var listItem = document.createElement("li");
        listItem.textContent = titlu;
        listaCarti.appendChild(listItem);
    });

    var listaCartiAsincron = document.getElementById("asyncBookList");

    carti.forEach(function(titlu, index) {
        setTimeout(function() {
            var listItem = document.createElement("li"); 
            listItem.textContent = titlu;
            listaCartiAsincron.appendChild(listItem);
        }, 2000 * (index + 1));
    });

    var colors = ["lightblue", "lightgreen", "lightcoral", "lightyellow", "lightsalmon", "lightcyan", "lightpink"];
    var colorIndex = 0;

    setInterval(function() {
        var textSection = document.getElementById("textSection");
        textSection.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 3000);
});