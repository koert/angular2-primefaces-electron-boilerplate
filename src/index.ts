'use strict';

const electron: Electron.ElectronMainAndRenderer = require('electron');
const Menu = require('electron').Menu;

const dialog: Electron.Dialog = require('electron').dialog;

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const ipcMain = electron.ipcMain;

var mainWindow : Electron.BrowserWindow = null;

const menuTemplate: any[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: 'CommandOrControl+Q',
        click(menuItem: any, browserWindow: any, event: any) { browserWindow.destroy(); }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      // {
      //   // role: 'reload'
      // },
      {
        label: 'Debug',
        accelerator: 'CommandOrControl+Shift+I',
        click(menuItem: any, browserWindow: any, event: any) { browserWindow.webContents.toggleDevTools(); }
        // role: 'toggledevtools'
      },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 1024, height: 800});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () =>  {
    mainWindow = null;
  });
});

ipcMain.on('message', (event, arg) => {
  console.log(`Received ${arg}`);
  event.sender.send('reply', "pong");
});

ipcMain.on('open-image-file', function (event) {
  dialog.showOpenDialog(
    {
      properties: ['openFile'],
      filters: [
        {name: 'Images', extensions: ['jpg', 'png', 'gif']},
      ]
    },
    function (files) {
      if (files) event.sender.send('selected-image-file', files)
    }
  )
});
