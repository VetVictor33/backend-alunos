const cepCheck = require('cep-promise')

async function findCep(cep) {
    const result = await cepCheck(cep).catch(() => undefined)
    return result
}

module.exports = findCep