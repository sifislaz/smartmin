const Users =  require("../model/User");
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config.env' });

const handelRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies?.jwt) return res.status(401).json({"message":"Refresh token not found"});

    const refreshToken = cookies.jwt;
    const foundUser = await Users.findOne({'refreshToken': refreshToken}).exec();
    console.log(foundUser);

    if (!foundUser) return res.status(403).json({'message':'No user has this refresh token'}); //Forbidden 

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if(err || foundUser.username !== decoded.username){
                return res.sendStatus(403)

            }

            const accessToken = jwt.sign(
                { "username": foundUser.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30m' }
            );
            res.json({accessToken});
        }
    )
}

module.exports = { handelRefreshToken };