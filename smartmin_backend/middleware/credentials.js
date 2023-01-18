const allowedOrigins = [
    'http://localhost:8080',
    'http://productionSite.com'
];

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        console.log("CORS set");
        res.header('Access-Control-Allow-Credentials', origin);
    }
    next();
}

module.exports = credentials