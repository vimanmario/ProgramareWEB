// Funcție pentru a comuta clasă activă pe butoanele de navigare
function toggleActive(link) {
    var navLinks = document.getElementsByClassName("nav-link");
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
        navLinks[i].style.backgroundColor = ''; // Elimină culoarea de fundal setată anterior
        navLinks[i].style.color = ''; // Elimină culoarea textului setată anterior
    }
    link.classList.add("active");
    link.style.backgroundColor = '#fff'; // Setează culoarea de fundal a butonului la hover
    link.style.color = '#000'; // Setează culoarea textului la hover
}

// Funcție pentru a evidenția butoanele la hover
function highlightButton(link) {
    if (!link.classList.contains("active")) {
        link.style.backgroundColor = '#fff'; // Setează culoarea de fundal a butonului la hover
        link.style.color = '#000'; // Setează culoarea textului la hover
    }
}

// Funcție pentru a reseta butoanele la ieșirea cursorului deasupra lor
function resetButton(link) {
    if (!link.classList.contains("active")) {
        link.style.backgroundColor = ''; // Elimină culoarea de fundal setată anterior
        link.style.color = ''; // Elimină culoarea textului setată anterior
    }
}

// Funcție pentru a comuta clasa activă și a gestiona stilul de hover
function toggleAndHighlight(link) {
    toggleActive(link);
    resetButton(link);
}

// Funcție pentru a activa butonul "Acasă" la încărcarea paginii
window.addEventListener('load', function() {
    var homeButton = document.querySelector('.nav-link');
    toggleActive(homeButton);
});

/// Funcție pentru afișarea opțiunilor dropdown
function showOptions(containerId) {
    var dropdownOptions = document.getElementById(containerId).querySelector('.dropdown-options');
    dropdownOptions.style.display = "block";
}

// Funcție pentru ascunderea opțiunilor dropdown
function hideOptions(containerId) {
    var dropdownOptions = document.getElementById(containerId).querySelector('.dropdown-options');
    dropdownOptions.style.display = "none";
}

// Adaugă un eveniment pentru a reseta starea de hover a link-urilor la părăsirea paginii
window.addEventListener('unload', function() {
    resetHoverState();
});
