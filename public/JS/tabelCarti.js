var table = document.getElementById('booksTable');
var totalElement = document.getElementById('tot');
var total = 0;

arrayBooks.forEach(function (book, index) {
    var row = table.insertRow(index + 1); // +1 pentru a ignora header-ul

    var cellNr = row.insertCell(0);
    cellNr.innerHTML = index + 1;

    var cellBook = row.insertCell(1);
    cellBook.innerHTML = "<a href='" + book.url + "'>" + book.title + "</a>";

    var cellPrice = row.insertCell(2);
    cellPrice.innerHTML = "$" + book.price.toFixed(2);

    var cellOption = row.insertCell(3);
    cellOption.innerHTML = "<input type='checkbox' name='pret' onclick='ShowHideItem(this)' value='" + book.price + "'></input>";

    total += book.price; // Actualizează totalul general
});

totalElement.textContent = total.toFixed(2); // Afișează totalul general

function ShowHideItem(checkb) {
    var checkboxes = document.querySelectorAll('input[name="pret"]:checked');
    var total = 0;

    if (checkboxes.length > 0) {
        checkboxes.forEach(function (checkbox) {
            total += parseFloat(checkbox.value);
        });
    }

    totalElement.textContent = total.toFixed(2); // Actualizează totalul general
}