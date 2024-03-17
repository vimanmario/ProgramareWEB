document.addEventListener('DOMContentLoaded', function() {
    // Funcția pentru a genera calendarul
    function generateCalendar(year) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // Zilele săptămânii

        const calendarDiv = document.getElementById('calendar');
        if (!calendarDiv) {
            console.error("Elementul cu id-ul 'calendar' nu a fost găsit.");
            return; // Ieșim din funcție dacă elementul nu este găsit
        }
        calendarDiv.innerHTML = ''; // Curățăm calendarul înainte de generare

        for (let i = 0; i < 3; i++) {
            const monthName = months[i];
            const firstDayOfMonth = new Date(year, i, 1).getDay(); // Ziua de început a lunii (0 = Duminică, 1 = Luni, etc.)
            const daysInMonth = new Date(year, i + 1, 0).getDate();

            const table = document.createElement('table');
            const headerRow = document.createElement('tr');

            // Adăugăm zilele săptămânii ca antet de tabel
            daysOfWeek.forEach(dayOfWeek => {
                const headerCell = document.createElement('th');
                headerCell.textContent = dayOfWeek;
                headerRow.appendChild(headerCell);
            });
            table.appendChild(headerRow);

            let currentRow;
            let dayCounter = 1;
            for (let j = 0; j < 6; j++) { // Generăm 6 rânduri pentru a acoperi toate posibilitățile
                currentRow = document.createElement('tr');
                table.appendChild(currentRow);

                for (let k = 0; k < 7; k++) {
                    const cell = document.createElement('td');
                    if ((j === 0 && k < firstDayOfMonth) || (dayCounter > daysInMonth)) { // Zilele din luna precedentă sau din luna următoare
                        cell.textContent = '';
                    } else { // Zilele din luna curentă
                        cell.textContent = dayCounter;
                        dayCounter++;
                    }
                    currentRow.appendChild(cell);
                }
            }

            const monthDiv = document.createElement('div');
            monthDiv.classList.add('month');
            monthDiv.innerHTML = `<h2>${monthName}</h2>`;
            monthDiv.appendChild(table);

            calendarDiv.appendChild(monthDiv);
        }
    }

    // Selecționăm formularul și inputul pentru an
    const yearForm = document.getElementById('yearForm');
    const yearInput = document.getElementById('yearInput');

    // Adăugăm un ascultător pentru evenimentul de submit al formularului
    yearForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Opriți trimiterea formularului

        const year = parseInt(yearInput.value); // Obținem valoarea introdusă pentru an
        generateCalendar(year); // Apelăm funcția pentru a genera calendarul pentru anul specificat
    });

    // Generăm calendarul pentru anul 2024 inițial
    generateCalendar(2024);
});
