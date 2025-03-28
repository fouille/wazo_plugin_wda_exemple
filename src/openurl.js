// on importe la SDK Wazo
import { App } from 'https://unpkg.com/@wazo/euc-plugins-sdk@latest/lib/esm/app.js';

// Fonction pour Ouvrir une URL
const openUrl = (url) => {
    window.open(url, '_blank');
}

const app = new App();

const runAppStorage = (action, runapp) => {
    switch(action) {
        case "set":
        localStorage.setItem("wazo_plugin_runapp", runapp);
        break;
        case "delete":
        localStorage.removeItem("wazo_plugin_runapp");
        break;
    }
    return localStorage.getItem("wazo_plugin_runapp");
}

const handleApp = (msg) => {
    const runApp = msg.data;
    console.log(msg);
    
    switch(runApp) {
      case "original":
        runAppStorage("delete")
        break;
      default:
        runAppStorage("set", runApp);
    }
}

app.onBackgroundMessage = msg => {
    switch(msg.value) {
      case "runapp":
        handleApp(msg);
        break;
     case "config":
       const runApp = runAppStorage();
       app.sendMessageToIframe({value: 'config', data: runApp});
       break;
    } 
  }

app.onCallAnswered = (call) => {
    console.log(call);
    
    const storageApp = localStorage.getItem('wazo_plugin_runapp');
    // const url = `hammerspoon://${storageApp}?number=${call.number}`;
    
    // const url = `hammerspoon://openApp?app=${storageApp}${call.number}`;
    const url = `${storageApp}${call.number}`;
    console.log(url);
    openUrl(url)
}

(async()=>{
    await app.initialize();
    const context = app.getContext();
    const autolaunch = runAppStorage();
})();