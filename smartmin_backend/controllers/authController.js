const Users =  require("../model/User");
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config.env' });
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    
    const foundUser = await Users.findOne({'username': user}).exec();
    if (!foundUser) return res.status(401).json({'message':'User not found'}); //Unauthorized 

    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        res.json({ accessToken });
    } else {
        res.status(401).json({"message":"Username and Password don't match."});
    }
}

module.exports = { handleLogin };