const { app, BrowserWindow, ipcMain } = require('electron');
const extractAuthCode = require('./extractAuthCode');

let mainWindow, authWindow;

app.disableHardwareAcceleration()


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 500, 
    height: 500,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    transparent: true
    // icon: `file://${__dirname}/dist/assets/logo.png`
  })
  mainWindow.setAlwaysOnTop(true, 'floating', 1);
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);
  // mainWindow.webContents.openDevTools()
  
  mainWindow.loadURL(`file://${__dirname}/dist/spotify-floats/index.html`)

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  mainWindow.on('closed', _ => {
    mainWindow = null
  })
}

function onReady() {
  setTimeout(() => createWindow(), 1000);
}

// Create window on electron intialization
app.on('ready', onReady);

// Quit when all windows are closed.
app.on('window-all-closed', _ => {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', _ => {
  // macOS specific close process
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('request-auth', (event, authURL) => {
  mainWindow.webContents.send('pong', 'pong');
  authWindow = new BrowserWindow();
  authWindow.removeMenu();
  authWindow.loadURL(authURL);
  authWindow.on('closed', _ => {
    authWindow = null;
  });
  authWindow.webContents.on('will-redirect', function (event, URL) {
    const redirectURL = 'https://www.google.com/';
    if (URL.includes(redirectURL)) {
      let authCode = extractAuthCode(URL);
      mainWindow.webContents.send('auth-return', authCode);
      authWindow.destroy();
      authWindow = null;
    }
  });
});
