const allowedOrigins = [
    'http://localhost:8080',
    'http://localhost:1880',
    'http://productionSite.com'
];

const credentials = (req, res, next) => {

    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); 
    res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept, authorization");
    
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)){
        res.header("Access-Control-Allow-Origin", origin); //star =allow all
    }
    next();
}

module.exports = credentials