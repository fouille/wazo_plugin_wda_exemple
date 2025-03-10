// Exemple d'URL
const url = new URL(window.location.href);

// Utilisation de URLSearchParams pour récupérer la valeur du paramètre 'number'
const params = new URLSearchParams(url.search);
const number = params.get('number');
const html = document.getElementById('valeur');

html.innerHTML = "Numéro appelant : " + number;