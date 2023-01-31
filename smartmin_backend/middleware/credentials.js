const allowedOrigins = [
    'http://localhost:8080',
    'http://productionSite.com'
];

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)){
        res.header("Access-Control-Allow-Origin", origin); //star =allow all
    }
    next();
}

module.exports = credentials