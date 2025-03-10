import { App } from 'https://unpkg.com/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';

// // Importer le module shell d'Electron
// Pour futur usage
// const { shell } = require('electron');

// // Fonction pour ouvrir une URL
const openUrl = (url) => {
  window.open(url, '_blank');
};

const app = new App();

app.onCallAnswered = (call) => {
  const url = `http://webinaires.wazo:3000/app?number=${call.number}`; // Remplacez par l'URL que vous souhaitez ouvrir
  openUrl(url);
}

await app.initialize();