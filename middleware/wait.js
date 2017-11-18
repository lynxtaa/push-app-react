module.exports = ms => (req, res, next) => setTimeout(next, ms)
