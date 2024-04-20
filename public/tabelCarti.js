document.addEventListener("DOMContentLoaded", function() {
    var arrayBooks=[
        {
            title:"Javascript: Javascript basics for Beginners",
            price:19.99,
            url:"https://www.amazon.com/Javascript-basics-Beginners-Andy-Vickler/dp/B08XNVDG1N?language=en_US",
            authors:"Andy Vickler",
            year:2021
        },

        {
            title:"JavaScript from Beginner to Professional",
            price:34.99,
            url:"https://www.amazon.com/JavaScript-Beginner-Professional-building-interactive/dp/1800562527",
            authors:"Laurence Lars Svekis, Maaike van Putten, Rob Percival"
        },

        {
            title:"JavaScript From Zero to Hero",
            authors:"Rick Sekuloski",
            price:26.24,
            url:"https://www.amazon.com/JavaScript-Zero-Hero-Complete-Programming-ebook/dp/B09R73RWH2",
            year: 2021
        },

        {
            title:"JavaScript: The Definitive Guide, 7th Edition",
            authors:"David Flanagan",
            price:32.49,
            url:"https://www.amazon.com/JavaScript-Definitive-Most-Used-Programming-Language/dp/1491952024/",
            year: 2020
        },

        {
            title:"Eloquent JavaScript, 3rd Edition",
            authors:"Marijn Haverbeke",
            price:20.94,
            url:"https://www.amazon.com/Eloquent-JavaScript-3rd-Introduction-Programming-ebook/dp/B07C96Q217/",
            year: 2021
        }
    ];

    var table = document.getElementById('booksTable');
    var totalElement = document.getElementById('tot');
    totalElement.textContent = "0.00";

    arrayBooks.forEach(function (book, index) {
        var row = table.insertRow(index + 1); // +1 pentru a ignora header-ul

        var cellNr = row.insertCell(0);
        cellNr.innerHTML = index + 1;

        var cellBook = row.insertCell(1);
        cellBook.innerHTML = "<a href='" + book.url + "'>" + book.title + "</a>";

        var cellPrice = row.insertCell(2);
        cellPrice.innerHTML = "$" + book.price.toFixed(2);

        var cellOption = row.insertCell(3);
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'pret';
        checkbox.value = book.price;
        checkbox.addEventListener('click', ShowHideItem);
        cellOption.appendChild(checkbox);
    });

    function ShowHideItem() {
        var total = 0;
        var checkboxes = document.querySelectorAll('input[name="pret"]:checked');

        if (checkboxes.length > 0) {
            checkboxes.forEach(function (checkbox) {
                total += parseFloat(checkbox.value);
            });
        }

        totalElement.textContent = total.toFixed(2);
    }
});