// Funcție pentru încărcarea dinamică a barei de navigare
function loadNavbar() {
    fetch('nav-bar.html')
        .then(response => response.text())
        .then(data => {
            // Crează un element div pentru a conține bara de navigare
            const navbarContainer = document.createElement('div');
            navbarContainer.innerHTML = data;

            // Adaugă bara de navigare înainte de primul element al documentului (în acest caz, înainte de antet)
            document.body.insertBefore(navbarContainer, document.body.firstChild);
        })
        .catch(error => {
            console.error('A apărut o eroare:', error);
        });
}



// Apelarea funcției pentru încărcarea barei de navigare la încărcarea paginii
window.addEventListener('load', function() {
    loadNavbar();
});

// Funcție pentru resetarea stării de hover a link-urilor
function resetHoverState() {
    var navLinks = document.getElementsByClassName("nav-link");
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].style.backgroundColor = ''; // Elimină culoarea de fundal setată anterior
        navLinks[i].style.color = ''; // Elimină culoarea textului setată anterior
    }
}

// Adaugă un eveniment pentru manipularea istoricului de navigare
window.addEventListener('popstate', function(event) {
    // Verifică dacă este o schimbare de stare a istoricului
    if (event.state && event.state.page) {
        // Resetare starea de hover a link-urilor
        resetHoverState();
    }
});

// Adaugă un eveniment pentru a reseta starea de hover a link-urilor la plasarea cursorului mouse-ului pe bara de navigare
document.addEventListener('mouseover', function(event) {
    resetHoverState();
});