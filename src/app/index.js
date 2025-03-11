const url = new URL(window.location.href)
// paramatres de l'url
const params = new URLSearchParams(url.search)
// l'element d'ancre 
const number = params.get('number');
// id d'affichage dans page web
const html = document.getElementById('valeur');

html.innerHTML = "Numéro appelant : " + number;