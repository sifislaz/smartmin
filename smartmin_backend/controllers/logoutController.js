const Users =  require("../model/User");


const handelLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt;
    const foundUser = await Users.findOne({'refreshToken': refreshToken}).exec();
    if (!foundUser){
        res.clearCookie('jwt', 
        {  
        httpOnly: true, 
        sameSite: 'None', 
        secure: true   
        });
        return res.sendStatus(204);//no content
    }
    //delete refreshToken
    try{
        foundUser.refreshToken = '';
        const result = await foundUser.save();
        res.clearCookie('jwt', 
        { 
        httpOnly: true, 
        sameSite: 'None', 
        secure: true
        });
        return res.sendStatus(204);//no content
    }catch(err){
        res.status(500).json({ 'message': err.message });
        return
    }
}

module.exports = { handelLogout };