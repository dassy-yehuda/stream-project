const dev = require('./dev')
const prod = require('./prod')
const localhost = require('./localhost')

const keys = (host) => {
    return host.includes('dev') ?
        dev :
        host.includes('local') ?
            localhost :
            prod
}

module.exports = { keys };