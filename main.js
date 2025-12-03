const { app, BrowserWindow, Menu, session, dialog, shell, BrowserView, ipcMain } = require('electron')
const globalShortcut = require('electron').globalShortcut
const path = require("path")
const http = require('http');
const fs = require('fs');
const { exec } = require('child_process');

try {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  });
} catch (_) { }


let resourcesRoot = path.resolve(app.getAppPath());
if (app.isPackaged) {
  resourcesRoot = path.dirname(resourcesRoot);
}

// Flash Plugin Configuration
let pluginName
let pluginVersion = '32.0.0.371'

switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    break
}

const flashPath = path.join(resourcesRoot, pluginName)
console.log('Flash Path:', flashPath)
app.commandLine.appendSwitch('ppapi-flash-path', flashPath)
app.commandLine.appendSwitch('ppapi-flash-version', pluginVersion)
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')
app.commandLine.appendSwitch('no-sandbox')
console.log('Flash plugin configured')


let Ver = '1.0.6'
GetYouDao('https://note.youdao.com/yws/api/note/a762bb7be08a3a437049e4efd90c37cb?sev=j1&editorType=1&unloginId=', (error, content) => {
  if (error) {
    dialog.showMessageBox({
      type: 'error',
      title: '信息',
      message: '网络错误',
      buttons: ['确定']
    })
    setTimeout(() => {
      app.quit()
    }, 1000);
  } else {
    if (content !== Ver) {
      dialog.showMessageBox({
        type: 'info',
        title: '信息',
        message: '检测到最新版本，即将跳转到下载页面',
        buttons: ['确定']
      })
      setTimeout(() => {
        shell.openExternal('https://www.123pan.com/s/aGs4Td-T7hY3')
        app.quit()
      }, 1000);
    }
  }
}
)

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html')
  let filePath = path.join(resourcesRoot + "/api", req.url)
  if (app.isPackaged) {
    filePath = path.join(resourcesRoot + "/api.asar", req.url)
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404
      res.end('Sorry, cannot find this file')
    } else {
      res.end(data);
    }
  })
})


server.listen(3001, () => {
  console.log('Server listening on port 3001')
})

let MainWindow
let ControlPanelWindow
let GameView

function createWindow() {
  MainWindow = new BrowserWindow({
    icon: path.join(resourcesRoot, "app.icns"),
    title: "My奥奇传说-For MacOS",
    center: true,
    width: 960,
    height: 590,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    maximizable: false
  })

  // 1. Load Title Bar
  MainWindow.loadFile(path.join(__dirname, 'src/index.html'))

  // 2. Create BrowserView for Game
  GameView = new BrowserView({
    webPreferences: {
      nodeIntegration: true, // Keep legacy settings for game compatibility if needed
      plugins: true,
      contextIsolation: false
    }
  })
  MainWindow.setBrowserView(GameView)
  // GameView.webContents.openDevTools({ mode: 'detach' }) // Comment out to improve startup speed


  // Set bounds: Title bar is 32px
  function updateViewBounds() {
    const bounds = MainWindow.getBounds()
    const titleBarHeight = 32
    // Ensure width/height are positive
    const width = Math.max(0, bounds.width)
    const height = Math.max(0, bounds.height - titleBarHeight)
    GameView.setBounds({ x: 0, y: titleBarHeight, width: width, height: height })
  }

  updateViewBounds()
  MainWindow.on('resize', updateViewBounds)

  // Load Game URL
  GameView.webContents.loadURL("https://aoqi.100bt.com/play/play.html")

  // Handle Flash/Game interceptions on the GameView's session
  GameView.webContents.session.webRequest.onBeforeRequest((details, callback) => {
    if (details.url.indexOf('aoqi.100bt.com/play/configinemergency/configinemergency~') > -1) {
      callback({ cancel: false, redirectURL: 'http://localhost:3001/flash.swf' })
      return
    }
    if (details.url.indexOf('aoqi.100bt.com/play/robot/robotdataservice~') > -1) {
      callback({ cancel: false, redirectURL: 'http://localhost:3001/flash_a.swf' })
      return
    }
    if (details.url.indexOf('aoqi.100bt.com/play/battle/battle~') > -1) {
      callback({ cancel: false, redirectURL: 'http://localhost:3001/flash_b.swf' })
      // Auto set high frame rate
      const getMovie = `function getMovie(){
        if(window.oo){ return window.oo; }
        var ts=document.getElementsByTagName("object");
        if(ts){
            for(var k=0; k<ts.length; k++){
                if(ts[k]["data"]){ window.oo=ts[k]; break; }
            }
        }
        return window.oo;
      }
      getMovie().`
      GameView.webContents.executeJavaScript(getMovie + 'setFrameRate(60)')
      return
    }
    callback({ cancel: false })
  })

  // IPC Handlers
  ipcMain.handle('get-version', () => Ver)

  ipcMain.on('toggle-control-panel', () => {
    if (ControlPanelWindow && !ControlPanelWindow.isDestroyed()) {
      if (ControlPanelWindow.isVisible()) {
        ControlPanelWindow.hide()
      } else {
        ControlPanelWindow.show()
      }
    } else {
      createControlPanel()
    }
  })

  ipcMain.on('cp-minimize', () => {
    if (ControlPanelWindow && !ControlPanelWindow.isDestroyed()) {
      ControlPanelWindow.minimize()
    }
  })

  ipcMain.on('cp-close', () => {
    if (ControlPanelWindow && !ControlPanelWindow.isDestroyed()) {
      ControlPanelWindow.hide()
    }
  })

  // Handle Control Panel Actions
  ipcMain.on('control-action', (event, action, arg) => {
    if (!GameView) return;

    const getMovie = `function getMovie(){
        if(window.oo){ return window.oo; }
        var ts=document.getElementsByTagName("object");
        if(ts){
            for(var k=0; k<ts.length; k++){
                if(ts[k]["data"]){ window.oo=ts[k]; break; }
            }
        }
        return window.oo;
      }
      getMovie().`

    switch (action) {
      case 'refresh':
        GameView.webContents.reload();
        break;
      case 'mute':
        const muted = !GameView.webContents.audioMuted;
        GameView.webContents.audioMuted = muted;
        break;
      case 'quality':
        let q = 'high';
        if (arg === 'low') q = 'low';
        if (arg === 'medium') q = 'medium';
        GameView.webContents.executeJavaScript(getMovie + "setQuality('" + q + "')");
        break;
      case 'framerate':
        let f = 60;
        if (arg === 'low') f = 24;
        if (arg === 'medium') f = 45;
        GameView.webContents.executeJavaScript(getMovie + `setFrameRate(${f})`);
        break;
      case 'switch-port':
        changePort();
        break;
    }
  })

  ipcMain.handle('get-game-mode', () => H5)



  MainWindow.on('close', () => {
    if (ControlPanelWindow && !ControlPanelWindow.isDestroyed()) {
      ControlPanelWindow.close()
    }
  })
}

function createControlPanel() {
  ControlPanelWindow = new BrowserWindow({
    width: 900,
    height: 640,
    title: "控制面板",
    modal: false,
    show: true,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  ControlPanelWindow.loadFile(path.join(__dirname, 'src/control-panel.html'))
  ControlPanelWindow.setMenuBarVisibility(false)
}

let audioMuted
let H5 = false
let DPI
const template = [
  {
    label: 'My',
    submenu: [
      {
        label: '关于',
        role: 'about',
      },
      {
        type: 'separator',
      },
      {
        label: '服务',
        role: 'services',
      },
      {
        type: 'separator',
      },
      {
        label: '隐藏 奥奇传说My登录器 For MacOS',
        role: 'hide',
      },
      {
        label: '隐藏其它',
        role: 'hideOthers',
      },
      {
        label: '显示全部',
        role: 'unhide',
      },
      {
        type: 'separator',
      },
      {
        label: '退出',
        role: 'quit',
      }
    ]
  },
  {
    label: '基础功能',
    submenu: [
      {
        label: '刷新',
        accelerator: 'F5',
        click: () => { MainWindow.reload() },
      },
      {
        label: '静音',
        accelerator: 'F1',
        type: 'checkbox',
        id: '静音',
        checked: audioMuted === true,
        click: () => {
          audioMuted = !audioMuted,
            MainWindow.webContents.audioMuted = audioMuted
        },
      },
      {
        label: '画质',
        submenu: [
          {
            label: '低',
            accelerator: 'Shift+Z',
            type: 'checkbox',
            id: '低画质',
            click: () => {
              currentQuality = '低'
              QuickQuality(currentQuality)
            },
          },
          {
            label: '中',
            accelerator: 'Shift+X',
            type: 'checkbox',
            id: '中画质',
            click: () => {
              currentQuality = '中'
              QuickQuality(currentQuality)
            }
          },
          {
            label: '高',
            accelerator: 'Shift+C',
            type: 'checkbox',
            id: '高画质',
            checked: true,
            click: () => {
              currentQuality = '高'
              QuickQuality(currentQuality)
            }
          }
        ]
      },
      {
        label: '帧率',
        submenu: [
          {
            label: '低',
            accelerator: 'Shift+A',
            type: 'checkbox',
            id: '低帧率',
            checked: true,
            click: () => {
              currentFrame = '低'
              QuickFrame(currentFrame)
            }
          },
          {
            label: '中',
            accelerator: 'Shift+S',
            type: 'checkbox',
            id: '中帧率',
            click: () => {
              currentFrame = '中'
              QuickFrame(currentFrame)
            }
          },
          {
            label: '高',
            accelerator: 'Shift+D',
            type: 'checkbox',
            id: '高帧率',
            click: () => {
              currentFrame = '高'
              QuickFrame(currentFrame)
            }
          }
        ]
      },
      {
        type: 'separator'
      },
      {
        label: '切换游戏端口',
        accelerator: 'F3',
        id: 'port',
        click: () => {
          changePort()
        }
      }
    ]
  },
  {
    label: '显示',
    submenu: [
      {
        label: '50%',
        type: 'checkbox',
        id: 'dpi-50',
        click: () => {
          DPI = 0.5
          windowDPI(DPI)
        }
      },
      {
        label: '100%',
        type: 'checkbox',
        id: 'dpi-100',
        checked: true,
        click: () => {
          DPI = 1
          windowDPI(DPI)
        }
      },
      {
        label: '125%',
        type: 'checkbox',
        id: 'dpi-125',
        click: () => {
          DPI = 1.25
          windowDPI(DPI)
        }
      },
      {
        label: '150%',
        type: 'checkbox',
        id: 'dpi-150',
        click: () => {
          DPI = 1.5
          windowDPI(DPI)
        }
      },
      {
        label: '200%',
        type: 'checkbox',
        id: 'dpi-200',
        click: () => {
          DPI = 2
          windowDPI(DPI)
        }
      }
    ]
  }
];


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  createWindow()
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  checkJava()
  checkPacketSniffer()

  //菜单栏快捷键处理
  globalShortcut.register('F5', () => {
    MainWindow.webContents.reload()
  })
  globalShortcut.register('F1', () => {
    audioMuted = !audioMuted
    MainWindow.webContents.audioMuted = audioMuted
    const muteItem = Menu.getApplicationMenu().getMenuItemById('静音')
    muteItem.checked = audioMuted
  })
  globalShortcut.register('Shift+Z', () => {
    currentQuality = '低'
    QuickQuality(currentQuality)
  })
  globalShortcut.register('Shift+X', () => {
    currentQuality = '中'
    QuickQuality(currentQuality)
  })
  globalShortcut.register('Shift+C', () => {
    currentQuality = '高'
    QuickQuality(currentQuality)
  })
  globalShortcut.register('Shift+A', () => {
    currentFrame = '低'
    QuickFrame(currentFrame)
  })
  globalShortcut.register('Shift+S', () => {
    currentFrame = '中'
    QuickFrame(currentFrame)
  })
  globalShortcut.register('Shift+D', () => {
    currentFrame = '高'
    QuickFrame(currentFrame)
  })
  globalShortcut.register('F3', () => {
    changePort()
  })
})


function changePort() {
  H5 = !H5
  switch (H5) {
    case true:
      GameView.webContents.loadURL("https://aoqi.100bt.com/h5/index.html")
      break
    case false:
      GameView.webContents.loadURL("https://aoqi.100bt.com/play/play.html")
      break
  }
}


const getMovie = `function getMovie() {
          if (window.oo) {
            return window.oo;
          } else {
            var ts = document.getElementsByTagName("object");
            if (ts) {
              for (var k = 0; k < ts.length; k++) {
                if (ts[k]["data"]) {
                  window.oo = ts[k];
                  break;
                }
              }
            }
            return window.oo;
          }
        }
getMovie().`


function QuickQuality(param1) {
  const QualityItem1 = Menu.getApplicationMenu().getMenuItemById('低画质')
  const QualityItem2 = Menu.getApplicationMenu().getMenuItemById('中画质')
  const QualityItem3 = Menu.getApplicationMenu().getMenuItemById('高画质')

  switch (param1) {
    case '低':
      QualityItem1.checked = true
      QualityItem2.checked = false
      QualityItem3.checked = false
      GameView.webContents.executeJavaScript(getMovie + "setQuality('" + 'low' + "')")
      break
    case '中':
      QualityItem1.checked = false
      QualityItem2.checked = true
      QualityItem3.checked = false
      GameView.webContents.executeJavaScript(getMovie + "setQuality('" + 'medium' + "')")
      break
    case '高':
      QualityItem1.checked = false
      QualityItem2.checked = false
      QualityItem3.checked = true
      GameView.webContents.executeJavaScript(getMovie + "setQuality('" + 'high' + "')")
      break
  }
}

function QuickFrame(param1) {
  const FrameItem1 = Menu.getApplicationMenu().getMenuItemById('低帧率')
  const FrameItem2 = Menu.getApplicationMenu().getMenuItemById('中帧率')
  const FrameItem3 = Menu.getApplicationMenu().getMenuItemById('高帧率')

  switch (param1) {
    case '低':
      FrameItem1.checked = true
      FrameItem2.checked = false
      FrameItem3.checked = false
      GameView.webContents.executeJavaScript(getMovie + 'setFrameRate(24)')
      break
    case '中':
      FrameItem1.checked = false
      FrameItem2.checked = true
      FrameItem3.checked = false
      GameView.webContents.executeJavaScript(getMovie + 'setFrameRate(45)')
      break
    case '高':
      FrameItem1.checked = false
      FrameItem2.checked = false
      FrameItem3.checked = true
      GameView.webContents.executeJavaScript(getMovie + 'setFrameRate(60)')
      break
  }
}


function windowDPI(param1) {
  const dpiItem1 = Menu.getApplicationMenu().getMenuItemById('dpi-50')
  const dpiItem2 = Menu.getApplicationMenu().getMenuItemById('dpi-100')
  const dpiItem3 = Menu.getApplicationMenu().getMenuItemById('dpi-125')
  const dpiItem4 = Menu.getApplicationMenu().getMenuItemById('dpi-150')
  const dpiItem5 = Menu.getApplicationMenu().getMenuItemById('dpi-200')
  MainWindow.webContents.setZoomFactor(param1)
  MainWindow.setContentSize(960 * param1, 560 * param1)
  switch (param1) {
    case 0.5:
      dpiItem1.checked = true
      dpiItem2.checked = false
      dpiItem3.checked = false
      dpiItem4.checked = false
      dpiItem5.checked = false
      break
    case 1:
      dpiItem1.checked = false
      dpiItem2.checked = true
      dpiItem3.checked = false
      dpiItem4.checked = false
      dpiItem5.checked = false
      break
    case 1.25:
      dpiItem1.checked = false
      dpiItem2.checked = false
      dpiItem3.checked = true
      dpiItem4.checked = false
      dpiItem5.checked = false
      break
    case 1.5:
      dpiItem1.checked = false
      dpiItem2.checked = false
      dpiItem3.checked = false
      dpiItem4.checked = true
      dpiItem5.checked = false
      break
    case 2:
      dpiItem1.checked = false
      dpiItem2.checked = false
      dpiItem3.checked = false
      dpiItem4.checked = false
      dpiItem5.checked = true
      break
  }
}

function checkJava() {
  if (process.platform === "win32") {
    setInterval(() => {
      exec('tasklist', (error, stdout) => {
        if (stdout.toLowerCase().includes('javaw.exe')) {
          exec('taskkill /IM javaw.exe /F', (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return
            }
          });
          setTimeout(() => {
            app.quit();
          }, 2000);
        }
      });
    }, 3000);
  }
  else {
    setInterval(() => {
      exec('ps aux', (error, stdout) => {
        if (stdout.toLowerCase().includes('java')) {
          exec('pkill java', (error) => {
            if (error) {
              console.error(`exec error: ${error}`);
            }
          })
          setTimeout(() => {
            app.quit();
          }, 2000);
        }
      });
    }, 3000);
  }
}

function checkPacketSniffer() {
  const packetSniffers = process.platform === 'win32'
    ? ['wireshark.exe', 'fiddler.exe', 'charles.exe', 'postman.exe']
    : ['Wireshark', 'Fiddler', 'Charles', 'Postman', 'Proxyman', 'HTTP Toolkit'];

  setInterval(() => {
    const command = process.platform === 'win32' ? 'tasklist' : 'ps aux';
    exec(command, (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      packetSniffers.forEach(sniffer => {
        if (stdout.toLowerCase().includes(sniffer.toLowerCase())) {
          const killCommand = process.platform === 'win32' ? `taskkill / IM ${sniffer} / F` : `pkill "${sniffer}"`;
          exec(killCommand, (error) => {
            if (error) {
              console.error(`exec error: ${error}`);
            }
          });
          setTimeout(() => {
            app.quit();
          }, 2000);
        }
      });
    });
  }, 3000);
}

function GetYouDao(url, callback) {
  const https = require('https')
  let content
  https.get(url, (resp) => {
    let data
    resp.on('data', (chunk) => {
      data += chunk
    })
    resp.on('end', () => {
      const jsondata = JSON.parse(data.replace('undefined', ''))
      content = getTextBetween(jsondata.content, '<text>', '</text>')
      callback(null, content)
    })
  }).on("error", (e) => {
    content = ''
    callback(e)
  })
}

function getTextBetween(text, start, end) {
  const pattern = new RegExp(start + '(.*?)' + end, 's')
  const matches = pattern.exec(text)
  return matches ? matches[1] : ''
}
