const crypto = require('crypto')

// OpenSSL 3 (Node 17+) removed the legacy md4 algorithm that webpack 4
// and its loaders hard-code; substitute sha256 only when md4 is missing
// so builds on older Node keep byte-identical hashes.
try {
  crypto.createHash('md4')
} catch {
  const createHash = crypto.createHash.bind(crypto)
  crypto.createHash = (algorithm, options) =>
    createHash(algorithm === 'md4' ? 'sha256' : algorithm, options)
}

module.exports = {
  pageExtensions: [ 'jsx' ],
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/404.html': { page: '/404' }
    }
  }
}
