/**
 *
 * @param {*} odm Object Document Mapper
 * @param {*} opts configuration options
 */
module.exports = (odm, opts) => {
  odm.connect(opts.url, {
    useCreateIndex:        true,
    useNewUrlParser:       true,
    useFindAndModify:      true,
    reconnectInterval:     300,
    connectTimeoutMS:      30000,
    keepAlive:             true,
    keepAliveInitialDelay: 30000,
    useUnifiedTopology:    true
  }).then(() => {
    console.log(`${opts.envName} db connected`)
  }).catch((err) => {
    console.log(`Oops! ${opts.envName} db connection errored`, err)
  })

  odm.Promise = global.Promise
}