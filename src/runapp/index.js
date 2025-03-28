// on importe la SDK Wazo
import { App } from '@wazo/euc-plugins-sdk';
const app = new App();
const runAppButton = document.getElementById('runApp');
const appName = document.getElementById('appName');

app.onIframeMessage = (msg) => {
    if (msg.data) {
      appName.value = msg.data;
    }
  }

const addEventsListener = () => {
    runAppButton.addEventListener('click', () => {
        const name = appName.value;
        app.sendMessageToBackground({value: 'runapp', data: name});
    });
};

(async() => {
    await app.initialize();
    addEventsListener();
    app.sendMessageToBackground({value: 'config'});
})();