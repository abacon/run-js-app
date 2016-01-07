let log = function log (app) {
  app.on('request', (req, res, start) => {
    if (req.url.indexOf('__bundle/') > -1) return // don't log __bundle requests
    if (req.url === 'favicon.ico' && res.statusCode === 404) return // don't log favicon.ico 404s

    console.info({
      elapsed: Date.now() - start,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode
    })
  })

  app.on('bundle', info => {
    info.message = (info.cached ? 'Returned cached bundle for' : 'Generated bundle for ') + `${info.file}  in ${info.bundleTime}ms`
    info.type = 'bundle'
    console.info(info)
  })

  app.on('bundle:error', info => {
    info.type = 'bundle'
    console.error(info)
  })

  app.once('watch:ready', () => {
    console.info({
      message: 'Live reloading enabled.',
      type: 'watch'
    })
  })

  app.on('watch:done', info => {
    console.info({message: 'live reloading stopped', type: 'watch'})
  })

  app.on('watch:all', (event, fp) => {
    console.info({
      message: `File ${event}: ${fp}`,
      type: 'watch'
    })
  })

  app.on('watch:error', err => {
    console.error(err)
  })
}

module.exports = log
