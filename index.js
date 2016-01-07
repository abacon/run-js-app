'use strict'
const menubar = require('menubar')
const ipcMain = require('electron').ipcMain
const dialog = require('electron').dialog
const RunJS = require('run-js/lib/index.js')
const defaultHandlers = require('run-js/lib/default-handlers')
const defaultTransforms = require('run-js/lib/default-transforms')

const log = require('./log.js')

let mb = menubar()

let rjsInstances = {}

mb.on('ready', function ready () {
  mb.on('after-create-window', function show () {
    // mb.window.webContents.openDevTools()
  })

  ipcMain.on('start-run-js', startRunJS)

  ipcMain.on('stop-run-js', function (event, id) {
    rjsInstances[id].instance.stop()
    rjsInstances[id].status = 'stopped'
    event.sender.send('run-js', 'stopped', id)
  })

  ipcMain.on('list-run-js-instances', listRunJsInstances)

  ipcMain.on('pick-directory', function (event) {
    dialog.showOpenDialog({properties: ['openDirectory', 'createDirectory']}, (value) => event.sender.send('directory', value[0]))
  })
})

let listRunJsInstances = function (event) {
  let instances = {}
  for (var i in rjsInstances) {
    let instance = rjsInstances[i]
    instances[i] = {dir: instance.dir, status: instance.status}
  }
  event.sender.send('run-js', 'list', instances)
}

let startRunJS = function (event, dir) {
  let rjs

  if (rjsInstances[dir]) {
    rjs = rjsInstances[dir].instance
  } else {
    rjs = new RunJS({
      dir: dir,
      handlers: defaultHandlers,
      transforms: defaultTransforms
    })
    log(rjs)
    require('../run-js/bin/setup-logger.js')(rjs)
    rjsInstances[dir] = {instance: rjs, status: 'pending', dir: dir}
  }

  rjs.start(function () {
    rjsInstances[dir].status = 'started'
  })

  event.sender.send('run-js', 'started', dir)
}
