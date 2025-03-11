// on importe la SDK Wazo
import { App } from 'https://unpkg.com/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';

// Fonction pour Ouvrir une URL
const openUrl = (url) => {
    window.open(url, '_blank');
}

const app = new App();

app.onCallAnswered = (call) => {
    console.log(call);
    
    const url = `http://webinaires.wazo:3000/app?number=${call.number}`;
    openUrl(url)
}

await app.initialize();